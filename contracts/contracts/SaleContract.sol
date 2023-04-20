// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./EtherLuxeCollection.sol";
import "./SaleContractOracle.sol";

contract SaleContract is AccessControl {
    bytes32 public constant NFT_ADMINISTATOR_ROLE =
        keccak256("NFT_ADMINISTATOR_ROLE");
    bytes32 public constant PRICE_MODERATOR_ROLE =
        keccak256("PRICE_MODERATOR_ROLE");
    bytes32 public constant PURCHASE_ADMINISTRATOR_ROLE =
        keccak256("PURCHASE_ADMINISTRATOR_ROLE");
    bytes32 public constant INVARIANT_ADMINISTRATOR_ROLE = 
        keccak256("INVARIANT_ADMINISTRATOR_ROLE");

    mapping(EtherLuxeCollection => uint256) public collectionPrice;

    uint256 public governanceTokensInvariant;

    IERC20 public governanceToken;
    SaleContractOracle public oracle;

    event PurchaseRequestCreated(
        address buyer,
        address collection,
        uint256 kind
    );

    event PurchaseRequestCompleted(
        bytes32 creationTxHash,
        address buyer,
        address collection,
        uint256 kind,
        uint256 governanceTokenAmount,
        uint256 providedNativeAmount
    );

    constructor(
        IERC20 governanceTokenAddress,
        SaleContractOracle oracleAddress,
        uint256 governanceTokensInvariantValue,
        address nftAdministrator,
        address priceModerator,
        address purchaseAdministrator,
        address invariantAdministrator
    ) {
        governanceToken = governanceTokenAddress;
        governanceTokensInvariant = governanceTokensInvariantValue;
        oracle = oracleAddress;
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(NFT_ADMINISTATOR_ROLE, nftAdministrator);
        _grantRole(PRICE_MODERATOR_ROLE, priceModerator);
        _grantRole(PURCHASE_ADMINISTRATOR_ROLE, purchaseAdministrator);
        _grantRole(INVARIANT_ADMINISTRATOR_ROLE, invariantAdministrator);
    }

    function addNFT(
        EtherLuxeCollection collection,
        uint256 initialPrice
    ) public onlyRole(NFT_ADMINISTATOR_ROLE) {
        require(collectionPrice[collection] == 0, "ALREADY_ADDED");
        collectionPrice[collection] = initialPrice;
    }

    function requestNFTPurchase(EtherLuxeCollection collection, uint256 kind) public payable {
        uint256 price = getPrice(collection);
        require(msg.value == price, "BAD_NATIVE_AMOUNT");
        address buyer = _msgSender();
        emit PurchaseRequestCreated(buyer, address(collection), kind);
    }

    function processNFTPurchase(
        bytes32 creationTxHash
    ) public onlyRole(PURCHASE_ADMINISTRATOR_ROLE) {
        (
            address buyer,
            address collection,
            uint256 kind,
            uint256 providedNativeAmount
        ) = oracle.getPurchaseRequest(creationTxHash);
        require(buyer != address(0), "BAD_BUYER");
        require(collection != address(0), "BAD_COLLECTION");

        EtherLuxeCollection collectionInstance = EtherLuxeCollection(collection);
        uint256 price = getPrice(collectionInstance);
        require(providedNativeAmount == price, "BAD_NATIVE_AMOUNT");

        uint256 governanceTokenAmount = getGovernanceTokensAmount();
        if (
            governanceToken.balanceOf(address(this)) >= governanceTokenAmount &&
            governanceTokenAmount != 0
        ) {
            governanceToken.transfer(buyer, governanceTokenAmount);
        } else {
            // event with 0 governance token amount means
            // no governance tokens are available
            governanceTokenAmount = 0;
        }
        collectionInstance.mintKind(buyer, kind);
        emit PurchaseRequestCompleted(
            creationTxHash,
            buyer,
            collection,
            kind,
            governanceTokenAmount,
            providedNativeAmount
        );
    }

    function setGovernanceTokensInvariant(uint256 value) public onlyRole(INVARIANT_ADMINISTRATOR_ROLE) {
        governanceTokensInvariant = value;
    }

    function setPrice(EtherLuxeCollection collection, uint256 price) public onlyRole(PRICE_MODERATOR_ROLE) {
        collectionPrice[collection] = price;
    }

    function setGovernanceToken(ERC20 token) public onlyRole(DEFAULT_ADMIN_ROLE) {
        governanceToken = token;
    }

    function getPrice(EtherLuxeCollection collection) public view returns (uint256) {
        uint256 price = collectionPrice[collection];
        require(price > 0, "BAD_COLLECTION");
        return price;
    }

    function getGovernanceTokensAmount() public view returns (uint256) {
        uint256 divisor = governanceToken.totalSupply();
        if (divisor == 0) {
            divisor = 1;
        }
        return governanceTokensInvariant / divisor * 1 ether;
    }

    function withdraw() public onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(_msgSender()).transfer(address(this).balance);
    }
}
