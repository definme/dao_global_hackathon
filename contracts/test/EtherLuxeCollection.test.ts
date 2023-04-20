import { BigNumber, Contract, ContractFactory, Signer } from "ethers";
import { expect, use } from "chai";
import { EtherLuxeCollection, EtherLuxeCollection__factory} from "../typechain-types";
import { ethers } from "hardhat";

describe('EtherLuxeCollection', function () {
  let collectionFactory: EtherLuxeCollection__factory;
  let collection: EtherLuxeCollection;

  const BASE_URI = 'ipfs://ipfs'
  const type0 = 0x0000
  const type1 = 0x0001;
  const type2 = 0x0002;

  before(async function () {
    this.signers = await ethers.getSigners()
    this.deployer = this.signers[0]
    this.recipient = this.signers[1]
    this.minter = this.signers[2]
    this.stranger = this.signers[3]
    this.CollectionFactory = await ethers.getContractFactory(
      'EtherLuxeCollection'
    )
  })

  beforeEach(async function () {
    this.collection = await this.CollectionFactory.deploy(BASE_URI, "EtherLuxeCollection", "ELC")
    await this.collection.deployed()

    await this.collection.grantRole(
      await this.collection.MINTER_ROLE(),
      this.minter.address
    )
    await this.collection.addKind(type0, 'Kind0')
  })

  it('has a name', async function () {
    expect(await this.collection.name()).to.equal('EtherLuxeCollection')
  })

  it('has a symbol', async function () {
    expect(await this.collection.symbol()).to.equal('ELC')
  })

  describe('check kind', async function () {

    it('minter can add kind', async function () {
      expect(await this.collection.getKindName(type1)).to.equal('')
      await this.collection.connect(this.minter).addKind(type1, 'Kind1')
      expect(await this.collection.getKindName(type1)).to.equal('Kind1')
    })

    it('kind exists', async function () {
      await expect(this.collection.addKind(type0, 'Kind2')).to.be.revertedWith('Kind already exists')
    })

    it('stranger cannot add kind', async function () {
      await expect(
        this.collection
          .connect(this.stranger)
          .addKind(type2, 'Kind2')
      ).to.be.revertedWith('need MINTER_ROLE')
    })
  })

  describe('mint', async function () {
    it('deployer can mint', async function () {
      await this.collection
        .connect(this.deployer)
        .mintKind(this.recipient.address, type0)

      expect(await this.collection.balanceOf(this.recipient.address)).to.equal(
        1
      )
    })

    it('minter can mint', async function () {
      await this.collection
        .connect(this.minter)
        .mintKind(this.recipient.address, type0)

      expect(await this.collection.balanceOf(this.recipient.address)).to.equal(
        1
      )
    })

    it('stranger cannot mint', async function () {
      await expect(
        this.collection
          .connect(this.stranger)
          .mintKind(this.recipient.address, type0)
      ).to.be.reverted

      expect(await this.collection.balanceOf(this.recipient.address)).to.equal(
        0
      )
    })

    it('mint should correctly set kindSupply', async function () {
      expect(await this.collection.getNFTKindSupply(type0)).to.equal(0)
      await this.collection
        .connect(this.minter)
        .mintKind(this.recipient.address, type0)
      expect(await this.collection.getNFTKindSupply(type0)).to.equal(1)
      await this.collection
        .connect(this.minter)
        .mintKind(this.recipient.address, type0)
      expect(await this.collection.getNFTKindSupply(type0)).to.equal(2)
    })
  })

  describe('check isKind function', async function () {
    it('should correctly check for type0', async function () {
      const type0TokenId = (type0 << 16) | 1
      const result = await this.collection.isKind(
        type0TokenId,
        type0
      )
      expect(result).to.be.true
    })

    it('should fail check for bad value', async function () {
      const badKind = 0xfff
      const tokenId = (badKind << 16) | 1
      const result = await this.collection.isKind(tokenId, type0)
      expect(result).to.be.false
    })
  })

  describe('check token URI functions', async function () {
    beforeEach(async function () {
      this.tokenId = (type0 << 16) | 0
    })

    it('should give token uri correctly', async function () {
      await this.collection
        .connect(this.minter)
        .mintKind(this.recipient.address, type0)
      const tokenURI = await this.collection.tokenURI(this.tokenId)
      expect(tokenURI).to.be.eq(BASE_URI + '/' + this.tokenId + '.json')
    })

    it('should fail tokenURI function if token is not minted', async function () {
      await expect(this.collection.tokenURI(type0)).to.be.reverted
    })

    it('should change base token uri when admin', async function () {
      await this.collection
        .connect(this.minter)
        .mintKind(this.recipient.address, type0)

      const tokenURIBefore = await this.collection.tokenURI(this.tokenId)
      expect(tokenURIBefore).to.be.eq(BASE_URI + '/' + this.tokenId + '.json')

      const changedURI = 'new.host/api'
      await this.collection.setBaseURI(changedURI)

      const tokenURIAfter = await this.collection.tokenURI(this.tokenId)
      expect(tokenURIAfter).to.be.eq(changedURI + '/' + this.tokenId + '.json')
    })

    it('should deny change token uri when stranger', async function () {
      await this.collection
        .connect(this.minter)
        .mintKind(this.stranger.address, type0)

      const tokenURIBefore = await this.collection
        .connect(this.stranger)
        .tokenURI(this.tokenId)
      expect(tokenURIBefore).to.be.eq(BASE_URI + '/' + this.tokenId + '.json')

      const changedURI = 'new.host/api'
      const attemptToChange = this.collection
        .connect(this.stranger)
        .setBaseURI(changedURI)
      expect(attemptToChange).to.be.revertedWith('need DEFAULT_ADMIN_ROLE')

      const tokenURIAfter = await this.collection
        .connect(this.stranger)
        .tokenURI(this.tokenId)
      expect(tokenURIAfter).to.be.eq(BASE_URI + '/' + this.tokenId + '.json')
    })
  })
})
