import json
import time
from typing import List, Dict

import requests
from web3 import Web3
from web3.middleware import geth_poa_middleware
from web3._utils.events import get_event_data
from ether_luxe.models import Chain, Collection, Token
from eth_abi.codec import ABICodec

KIND_MASK = 0xffff0000


class CollectionsIndexer:
    collection_contract_abi: List[Dict]
    indexer_interval: int

    def __init__(self, indexer_interval: int):
        self.indexer_interval = indexer_interval
        with open('abi/EtherLuxeCollection.json', 'r') as collection_contract_abi:
            self.collection_contract_abi = json.load(collection_contract_abi)

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
        start_block = chain.last_indexed_block_collection
        last_block_in_chain = w3.eth.get_block('latest')['number']
        to_block = int(min(start_block + 1000, last_block_in_chain))
        for collection in Collection.objects.all():
            collection_contract = w3.eth.contract(address=w3.to_checksum_address(collection.contract_address),
                                                  abi=self.collection_contract_abi)
            event_template = collection_contract.events.Transfer
            print(f'Taking transfer events from {start_block} to {to_block}')
            events = w3.eth.get_logs(
                {'fromBlock': start_block, 'toBlock': to_block, 'address': collection.contract_address})

            for event in events:
                suc, res = self.handle_event(w3, event=event, event_template=event_template)
                if suc:
                    print(f'Found Transfer event')
                    address_to = res.args['to']
                    token_id = int(res.args['tokenId'])
                    kind = (KIND_MASK & int(token_id)) >> 16

                    # fetch metadata
                    metadata_uri = ''
                    try:
                        metadata_uri = str(collection_contract.functions.tokenURI(token_id).call())
                    except Exception as e:
                        print(f'Can not fetch metadata uri ({e})')
                    metadata_uri = metadata_uri.replace("{id}", hex(token_id)[2:].zfill(64))
                    metadata = requests.get(metadata_uri).json()
                    name = metadata['name']
                    image_uri = metadata['image']
                    description = metadata['description']
                    exists_token = Token.objects.filter(collection=collection, contract_token_id=token_id)
                    if exists_token:
                        new_token = exists_token.first()
                        new_token.owner = address_to
                    else:
                        new_token = Token.objects.create(
                            collection=collection, kind=kind, name=name, description=description, image_uri=image_uri,
                            contract_token_id=token_id, owner=address_to
                        )
                    new_token.save()
                    print(f'Saved token with id {token_id} from {collection.name} collection')
                    print(f'Owner {address_to}')

        chain.last_indexed_block_collection = to_block
        chain.save()
