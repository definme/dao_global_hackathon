// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol"; 

contract EtherLuxeCollection is ERC721Enumerable, AccessControl {
    using Strings for uint256;

    uint256 internal constant KIND_MASK = 0xffff0000;
    mapping(uint256 => uint256) kindSupply;
    mapping(uint256 => string) kindNames;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    string internal _baseUri;

    constructor(string memory uri, string memory name, string memory symbol) ERC721(name, symbol) {
        _baseUri = uri;
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function addKind(
        uint256 kind, 
        string memory kindName
    ) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "need MINTER_ROLE");
        require(keccak256(abi.encodePacked(kindNames[kind])) == keccak256(abi.encodePacked('')), "Kind already exists");
        kindNames[kind] = kindName;
    }
    function mintKind(
        address to,
        uint256 kind
    ) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "need MINTER_ROLE");
        require(keccak256(abi.encodePacked(kindNames[kind])) != keccak256(abi.encodePacked('')), "Kind does not exists");
        uint256 tokenId = (kind << 16) | kindSupply[kind];
        kindSupply[kind] ++;
        _safeMint(to, tokenId);
    }

    function getKindName(uint256 kind) public view returns (string memory) {
        return kindNames[kind];
    }

    function getKindNameById(uint256 id) public view returns (string memory) {
        require(keccak256(abi.encodePacked(kindNames[getKind(id)])) != keccak256(abi.encodePacked('')), "Kind does not exists");
        return kindNames[getKind(id)];
    }

    function getKind(uint256 id) public pure returns (uint256) {
        return (KIND_MASK & id) >> 16;
    }

    function isKind(uint256 id, uint256 kind) public pure returns (bool) {
        return getKind(id) == kind;
    }

    function getNFTKindSupply(uint256 kind) public view returns (uint256) {
        return kindSupply[kind];
    }

    function setBaseURI(string memory newUri) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "need DEFAULT_ADMIN_ROLE");
        _baseUri = newUri;
    }

     function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, "/", tokenId.toString(), ".json")) : "";
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
    ) EtherLuxeCollection (uri, name, symbol) {}
}

contract EtherLuxeCollectionTransports is EtherLuxeCollection {
    constructor(
        string memory uri, 
        string memory name, 
        string memory symbol
    ) EtherLuxeCollection (uri, name, symbol) {}
}

contract EtherLuxeCollectionWeapons is EtherLuxeCollection {
    constructor(
        string memory uri, 
        string memory name, 
        string memory symbol
    ) EtherLuxeCollection (uri, name, symbol) {}
}