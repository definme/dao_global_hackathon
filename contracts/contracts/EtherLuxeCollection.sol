// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract EtherLuxeCollection is ERC721Enumerable, AccessControl {
    using Strings for uint256;

    uint256 internal constant KIND_MASK = 0xffff0000;
    mapping(uint256 => uint256) kindSupplies;
    mapping(uint256 => bytes32) kindHashes;
    mapping(bytes32 => string) kindNames;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    string internal _baseUri;

    event KindAdded(uint256 kind, bytes32 nameHash);

    constructor(
        string memory uri,
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {
        _baseUri = uri;
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function addKind(uint256 kind, string memory kindName) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "need MINTER_ROLE");
        require(kindHashes[kind] == bytes32(0), "Kind already exists");
        bytes32 kindHash = keccak256(abi.encodePacked(kindName));
        kindHashes[kind] = kindHash;
        kindNames[kindHash] = kindName;
        emit KindAdded(kind, kindHash);
    }

    function mintKind(address to, uint256 kind) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "need MINTER_ROLE");
        bytes32 kindHash = kindHashes[kind];
        require(kindHash != bytes32(0), "Kind does not exists");
        uint256 tokenId = (kind << 16) | kindSupplies[kind];
        kindSupplies[kind]++;
        _safeMint(to, tokenId);
    }

    function getKindName(uint256 kind) public view returns (string memory) {
        bytes32 kindHash = kindHashes[kind];
        return kindNames[kindHash];
    }

    function getKindNameById(uint256 id) public view returns (string memory) {
        uint256 kind = getKind(id);
        bytes32 kindHash = kindHashes[kind];
        require(kindHash != bytes32(0), "Kind does not exists");
        return kindNames[kindHash];
    }

    function getKind(uint256 id) public pure returns (uint256) {
        return (KIND_MASK & id) >> 16;
    }

    function getKindHash(uint256 kind) public view returns(bytes32) {
        return kindHashes[kind];
    }

    function getKindNameByHash(bytes32 kindHash) public view returns(string memory) {
        return kindNames[kindHash];
    }

    function isKind(uint256 id, uint256 kind) public pure returns (bool) {
        return getKind(id) == kind;
    }

    function getNFTKindSupply(uint256 kind) public view returns (uint256) {
        return kindSupplies[kind];
    }

    function setBaseURI(string memory newUri) external {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "need DEFAULT_ADMIN_ROLE"
        );
        _baseUri = newUri;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(
                    abi.encodePacked(baseURI, "/", tokenId.toString(), ".json")
                )
                : "";
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseUri;
    }
}

contract EtherLuxeCollectionCharacters is EtherLuxeCollection {
    constructor(
        string memory uri,
        string memory name,
        string memory symbol
    ) EtherLuxeCollection(uri, name, symbol) {}
}

contract EtherLuxeCollectionTransports is EtherLuxeCollection {
    constructor(
        string memory uri,
        string memory name,
        string memory symbol
    ) EtherLuxeCollection(uri, name, symbol) {}
}

contract EtherLuxeCollectionWeapons is EtherLuxeCollection {
    constructor(
        string memory uri,
        string memory name,
        string memory symbol
    ) EtherLuxeCollection(uri, name, symbol) {}
}
