// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SaleContractOracle is AccessControl {
    bytes32 public constant ORACLE_WORKER_ROLE =
        keccak256("ORACLE_WORKER_ROLE");

    struct PurchaseRequest {
        address buyer;
        address collection;
        uint256 kind;
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
        uint256 kind,
        uint256 providedNativeAmount
    ) public onlyRole(ORACLE_WORKER_ROLE) {
        require(purchaseRequests[txHash].buyer == address(0), "ALREADY_OPERATED");
        require(purchaseRequests[txHash].collection == address(0), "ALREADY_OPERATED");
        require(purchaseRequests[txHash].kind == 0, "ALREADY_OPERATED");
        require(purchaseRequests[txHash].providedNativeAmount == 0, "ALREADY_OPERATED");
        purchaseRequests[txHash] = PurchaseRequest(buyer, collection, kind, providedNativeAmount);
    }

    function getPurchaseRequest(
        bytes32 txHash
    ) public view returns (address buyer, address collection, uint256 kind, uint256 providedNativeAmount) {
        buyer = purchaseRequests[txHash].buyer;
        collection = purchaseRequests[txHash].collection;
        kind = purchaseRequests[txHash].kind;
        providedNativeAmount = purchaseRequests[txHash].providedNativeAmount;
    }
}
