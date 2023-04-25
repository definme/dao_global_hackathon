import { expect } from "chai";
import { EtherLuxeCollection, EtherLuxeCollection__factory } from "../typechain-types";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { toUtf8Bytes } from "ethers/lib/utils";

describe('EtherLuxeCollection', function () {
    let collectionFactory: EtherLuxeCollection__factory;
    let collection: EtherLuxeCollection;
    let minter: SignerWithAddress;
    let deployer: SignerWithAddress;
    let recipient: SignerWithAddress;
    let stranger: SignerWithAddress;

    const BASE_URI = 'ipfs://ipfs'
    const type0 = 0x0000;
    const type1 = 0x0001;
    const type2 = 0x0002;

    before(async function () {
        const signers = await ethers.getSigners()
        deployer = signers[0]
        recipient = signers[1]
        minter = signers[2]
        stranger = signers[3]
        collectionFactory = await ethers.getContractFactory('EtherLuxeCollection')
    })

    beforeEach(async function () {
        collection = await collectionFactory.deploy(BASE_URI, "EtherLuxeCollection", "ELC")
        await collection.deployed()

        await collection.grantRole(
            await collection.MINTER_ROLE(),
            minter.address
        )
        await collection.addKind(type0, 'Kind0')
    })

    it('has a name', async function () {
        expect(await collection.name()).to.equal('EtherLuxeCollection')
    })

    it('has a symbol', async function () {
        expect(await collection.symbol()).to.equal('ELC')
    })

    describe('check kind', async function () {


        let kindName: string = 'Kind1';
        let kindHash: string = ethers.utils.keccak256(toUtf8Bytes(kindName));
        it('minter can add kind', async function () {
            expect(await collection.getKindName(type1)).to.equal('')
            await collection.connect(minter).addKind(type1, kindName)
            expect(await collection.getKindName(type1)).to.equal(kindName)
            expect(await collection.getKindHash(type1)).to.equal(kindHash);
        })

        it('should emit event on adding kind', async function () {
            const tx = await collection.connect(minter).addKind(type1, kindName);
            const txHash = tx.hash;
            await tx.wait();
            const receipt = await minter.provider!!.getTransactionReceipt(txHash);
            const logs = receipt.logs;
            expect(logs.length).eq(1);
            const data = logs[0].data;
            expect(data.length).eq(2 + 64 + 64);
            const kindId = Number.parseInt(data.substring(2, 2 + 64), 16);
            const actualKindHash = `0x${data.substring(2 + 64, 2 + 64 + 64)}`;
            expect(kindId).eq(type1);
            expect(actualKindHash).eq(kindHash);
            const actualKindName = await collection.getKindNameByHash(actualKindHash);
            expect(actualKindName).eq(kindName);
        })

        it('kind exists', async function () {
            await expect(collection.addKind(type0, 'Kind2')).to.be.revertedWith('Kind already exists')
        })

        it('stranger cannot add kind', async function () {
            await expect(
                collection
                    .connect(stranger)
                    .addKind(type2, 'Kind2')
            ).to.be.revertedWith('need MINTER_ROLE')
        })
    })

    describe('mint', async function () {
        it('deployer can mint', async function () {
            await collection
                .connect(deployer)
                .mintKind(recipient.address, type0)

            expect(await collection.balanceOf(recipient.address)).to.equal(1)
        })

        it('minter can mint', async function () {
            await collection
                .connect(minter)
                .mintKind(recipient.address, type0)

            expect(await collection.balanceOf(recipient.address)).to.equal(1)
        })

        it('stranger cannot mint', async function () {
            await expect(
                collection
                    .connect(stranger)
                    .mintKind(recipient.address, type0)
            ).to.be.reverted

            expect(await collection.balanceOf(recipient.address)).to.equal(0)
        })

        it('mint should correctly set kindSupply', async function () {
            expect(await collection.getNFTKindSupply(type0)).to.equal(0)
            await collection
                .connect(minter)
                .mintKind(recipient.address, type0)
            expect(await collection.getNFTKindSupply(type0)).to.equal(1)
            await collection
                .connect(minter)
                .mintKind(recipient.address, type0)
            expect(await collection.getNFTKindSupply(type0)).to.equal(2)
        })
    })

    describe('check isKind function', async function () {
        it('should correctly check for type0', async function () {
            const type0TokenId = (type0 << 16) | 1
            const result = await collection.isKind(
                type0TokenId,
                type0
            )
            expect(result).to.be.true
        })

        it('should fail check for bad value', async function () {
            const badKind = 0xfff
            const tokenId = (badKind << 16) | 1
            const result = await collection.isKind(tokenId, type0)
            expect(result).to.be.false
        })
    })

    describe('check token URI functions', async function () {
        let tokenId: number;
        beforeEach(async function () {
            tokenId = (type0 << 16) | 0
        })

        it('should give token uri correctly', async function () {
            await collection
                .connect(minter)
                .mintKind(recipient.address, type0)
            const tokenURI = await collection.tokenURI(tokenId)
            expect(tokenURI).to.be.eq(BASE_URI + '/' + tokenId + '.json')
        })

        it('should fail tokenURI function if token is not minted', async function () {
            await expect(collection.tokenURI(type0)).to.be.reverted
        })

        it('should change base token uri when admin', async function () {
            await collection
                .connect(minter)
                .mintKind(recipient.address, type0)

            const tokenURIBefore = await collection.tokenURI(tokenId)
            expect(tokenURIBefore).to.be.eq(BASE_URI + '/' + tokenId + '.json')

            const changedURI = 'new.host/api'
            await collection.setBaseURI(changedURI)

            const tokenURIAfter = await collection.tokenURI(tokenId)
            expect(tokenURIAfter).to.be.eq(changedURI + '/' + tokenId + '.json')
        })

        it('should deny change token uri when stranger', async function () {
            await collection
                .connect(minter)
                .mintKind(stranger.address, type0)

            const tokenURIBefore = await collection
                .connect(stranger)
                .tokenURI(tokenId)
            expect(tokenURIBefore).to.be.eq(BASE_URI + '/' + tokenId + '.json')

            const changedURI = 'new.host/api'
            const attemptToChange = collection
                .connect(stranger)
                .setBaseURI(changedURI)
            expect(attemptToChange).to.be.revertedWith('need DEFAULT_ADMIN_ROLE')

            const tokenURIAfter = await collection
                .connect(stranger)
                .tokenURI(tokenId)
            expect(tokenURIAfter).to.be.eq(BASE_URI + '/' + tokenId + '.json')
        })
    })
})
