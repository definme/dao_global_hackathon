//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Collection is ERC721Enumerable, AccessControl {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // unique role related to SaleContract which can mint tokens on buying them 
    bytes32 public constant SALE_CONTRACT_ROLE = keccak256("SALE_CONTRACT_ROLE");

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControl) returns (bool) {
        return interfaceId == type(IERC721Enumerable).interfaceId && interfaceId == type(AccessControl).interfaceId;
    }

    function mint(address to, uint256 id) public onlyRole(MINTER_ROLE) {
        _mint(to, id);
    }

}