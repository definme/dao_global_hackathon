//SPDX-License-Identifier: UNLISENCED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SaleContractOracle is AccessControl {
    bytes32 public constant ORACLE_WORKER_ROLE =
        keccak256("ORACLE_WORKER_ROLE");

    struct PurchaseRequest {
        address buyer;
        address collection;
        uint256 tokenId;
        uint256 providedNativeAmount;
    }

    mapping(bytes32 => PurchaseRequest) purchaseRequests;

    constructor(address oracleWorker) {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(ORACLE_WORKER_ROLE, oracleWorker);
    }

    function addPurchaseRequest(
        bytes32 txHash,
        address buyer,
        address collection,
        uint256 tokenId,
        uint256 providedNativeAmount
    ) public onlyRole(ORACLE_WORKER_ROLE) {
        purchaseRequests[txHash] = PurchaseRequest(buyer, collection, tokenId, providedNativeAmount);
    }

    function getPurchaseRequest(
        bytes32 txHash
    ) public view returns (address buyer, address collection, uint256 tokenId, uint256 providedNativeAmount) {
        buyer = purchaseRequests[txHash].buyer;
        collection = purchaseRequests[txHash].collection;
        tokenId = purchaseRequests[txHash].tokenId;
        providedNativeAmount = purchaseRequests[txHash].providedNativeAmount;
    }
}
