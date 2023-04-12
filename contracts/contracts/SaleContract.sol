//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Collection.sol";
import "./SaleContractOracle.sol";

contract SaleContract is AccessControl {
    bytes32 public constant NFT_ADMINISTATOR_ROLE =
        keccak256("NFT_ADMINISTATOR_ROLE");
    bytes32 public constant PRICE_MODERATOR_ROLE =
        keccak256("PRICE_MODERATOR_ROLE");
    bytes32 public constant PURCHASE_ADMINISTRATOR_ROLE =
        keccak256("PURCHASE_ADMINISTRATOR_ROLE");

    mapping(Collection => uint256) public collectionPrice;

    uint256 public priceInvariant;

    IERC20 governanceToken;
    SaleContractOracle oracle;

    event PurchaseRequestCreated(
        address buyer,
        address collection,
        uint256 tokenId
    );

    event PurchaseRequestCompleted(
        bytes32 creationTxHash,
        address buyer,
        address collection,
        uint256 tokenId,
        uint256 governanceTokenAmount,
        uint256 providedNativeAmount
    );

    event PurchaseRequestFailed(
        bytes32 creationTxHash,
        address buyer,
        uint256 providedNativeAmount
    );

    constructor(
        IERC20 _governanceToken,
        SaleContractOracle _oracle,
        uint256 _priceInvariant
    ) {
        governanceToken = _governanceToken;
        priceInvariant = _priceInvariant;
        oracle = _oracle;
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(NFT_ADMINISTATOR_ROLE, _msgSender());
        _grantRole(PRICE_MODERATOR_ROLE, _msgSender());
    }

    function addNFT(
        Collection collection,
        uint256 initialPrice
    ) public onlyRole(NFT_ADMINISTATOR_ROLE) {
        require(collectionPrice[collection] == 0, "ALREADY_ADDED");
        collectionPrice[collection] = initialPrice;
    }

    function requestNFTPurchase(Collection collection) public payable {
        uint256 price = getPrice(collection);
        require(msg.value == price, "BAD_NATIVE_AMOUNT");
        uint256 id = collection.totalSupply() + 1;
        address buyer = _msgSender();
        emit PurchaseRequestCreated(buyer, address(collection), id);
    }

    function processNFTPurchase(
        bytes32 creationTxHash
    ) public onlyRole(PURCHASE_ADMINISTRATOR_ROLE) {
        (
            address buyer,
            address collection,
            uint256 tokenId,
            uint256 providedNativeAmount
        ) = oracle.getPurchaseRequest(creationTxHash);
        uint256 governanceTokenAmount = getGovernanceTokensAmount();
        if (governanceToken.balanceOf(address(this)) >= governanceTokenAmount) {
            governanceToken.transferFrom(
                address(this),
                buyer,
                governanceTokenAmount
            );
            Collection(collection).mint(_msgSender(), tokenId);
            emit PurchaseRequestCompleted(
                creationTxHash,
                buyer,
                collection,
                tokenId,
                governanceTokenAmount,
                providedNativeAmount
            );
        } else {
            emit PurchaseRequestFailed(
                creationTxHash,
                buyer,
                providedNativeAmount
            );
        }
    }

    function getPrice(Collection collection) public view returns (uint256) {
        uint256 price = collectionPrice[collection];
        require(price > 0, "BAD_COLLECTION_ID");
        return price;
    }

    function getGovernanceTokensAmount() public view returns (uint256) {
        uint256 divisor = governanceToken.totalSupply();
        if (divisor == 0) {
            divisor = 1;
        }
        return priceInvariant / divisor;
    }

    function withdraw() public onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(_msgSender()).transfer(address(this).balance);
    }
}
