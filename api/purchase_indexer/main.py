import json
import time
from typing import List, Dict

from web3 import Web3
from web3.middleware import geth_poa_middleware
from web3._utils.events import get_event_data
from ether_luxe.models import Chain
from eth_abi.codec import ABICodec
from eth_account.account import Account, LocalAccount


class PurchaseIndexer:
    sale_contract_abi: List[Dict]
    sale_contract_oracle_abi: List[Dict]
    indexer_interval: int
    oracle_worker_privkey: str
    purchase_admin_privkey: str
    sale_contract_address: str
    oracle_contract_address: str
    oracle_worker: LocalAccount
    purchase_admin: LocalAccount

    def __init__(self, indexer_interval: int, oracle_worker_privkey: str, purchase_admin_privkey: str,
                 sale_contract_address: str,
                 oracle_contract_address: str):
        self.indexer_interval = indexer_interval
        self.sale_contract_address = sale_contract_address
        self.oracle_contract_address = oracle_contract_address
        with open('abi/SaleContract.json', 'r') as sale_contract_abi:
            self.sale_contract_abi = json.load(sale_contract_abi)
        with open('abi/SaleContractOracle.json', 'r') as sale_contract_oracle_abi:
            self.oracle_contract_abi = json.load(sale_contract_oracle_abi)
        self.oracle_worker = Account.from_key(oracle_worker_privkey)
        self.purchase_admin = Account.from_key(purchase_admin_privkey)

    def start(self):
        while True:
            self.__cycle_body()
            print(f'Sleep for {self.indexer_interval} sec')
            time.sleep(self.indexer_interval)

    def handle_event(self, w3, event, event_template):
        codec: ABICodec = w3.codec
        try:
            result = get_event_data(codec, event_template._get_event_abi(), event)
            return True, result
        except:
            return False, None

    def __cycle_body(self):
        chain = Chain.objects.first()
        w3 = Web3(Web3.HTTPProvider(chain.rpc_url))
        w3.middleware_onion.inject(geth_poa_middleware, layer=0)
        sale_contract = w3.eth.contract(address=w3.to_checksum_address(self.sale_contract_address),
                                        abi=self.sale_contract_abi)
        oracle_contract = w3.eth.contract(address=w3.to_checksum_address(self.oracle_contract_address),
                                          abi=self.oracle_contract_abi)
        start_block = chain.last_indexed_block
        last_block_in_chain = w3.eth.get_block('latest')['number']
        to_block = int(min(start_block + self.indexer_interval, last_block_in_chain))

        event_template = sale_contract.events.PurchaseRequestCreated
        print(f'Taking events from {start_block} to {to_block}')
        events = w3.eth.get_logs({'fromBlock': start_block, 'toBlock': to_block, 'address': sale_contract.address})

        for event in events:
            suc, res = self.handle_event(w3, event=event, event_template=event_template)
            if suc:
                print('Found PurchaseRequestCreated event')
                tx_hash = res.transactionHash
                buyer = res.args.buyer
                collection = res.args.collection
                kind = res.args.kind
                value = w3.eth.get_transaction(tx_hash).value
                unsigned_tx = oracle_contract.functions.addPurchaseRequest(
                    tx_hash, buyer, collection, kind, value).build_transaction(
                    {
                        'from': self.oracle_worker.address,
                        'chainId': w3.eth.chain_id,
                        'nonce': w3.eth.get_transaction_count(self.oracle_worker.address)
                    }
                )
                signed_tx = self.oracle_worker.sign_transaction(unsigned_tx)['rawTransaction']
                add_purchase_tx_hash = w3.eth.send_raw_transaction(signed_tx)
                receipt = w3.eth.wait_for_transaction_receipt(add_purchase_tx_hash)
                if receipt.status == 0:
                    print(f'Add purchase failed at {add_purchase_tx_hash}')
                else:
                    print(f'Purchase added')
                    unsigned_tx = sale_contract.functions.processNFTPurchase(tx_hash).build_transaction({
                        'from': self.purchase_admin.address,
                        'chainId': w3.eth.chain_id,
                        'nonce': w3.eth.get_transaction_count(self.purchase_admin.address)
                    })
                    signed_tx = self.purchase_admin.sign_transaction(unsigned_tx)['rawTransaction']
                    process_purchase_tx_hash = w3.eth.send_raw_transaction(signed_tx)
                    receipt = w3.eth.wait_for_transaction_receipt(process_purchase_tx_hash)
                    if receipt.status == 0:
                        print(f'Process NFT purchase failed at {process_purchase_tx_hash}')
                    else:
                        print(f'Purchase processed')
        chain.last_indexed_block = to_block
        chain.save()
