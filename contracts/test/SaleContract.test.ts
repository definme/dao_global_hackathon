import { BigNumber, Contract, ContractFactory, Signer } from "ethers";
import { expect, use } from "chai";
import {
    SaleContract,
    SaleContract__factory,
    GovernanceToken,
    GovernanceToken__factory,
    EtherLuxeCollection,
    EtherLuxeCollection__factory,
    SaleContractOracle,
    SaleContractOracle__factory
} from "../typechain-types";
import { ethers } from "hardhat";

describe("SaleContract", () => {
    let factory: SaleContract__factory;
    let contract: SaleContract;

    // actually governance token will be issued via DAO
    // initialization so this token here is for mock only
    let governanceTokenFactory: GovernanceToken__factory;
    let governanceToken: GovernanceToken;

    let collectionFactory: EtherLuxeCollection__factory;
    let collection: EtherLuxeCollection;

    let oracle: SaleContractOracle;
    let oracleFactory: SaleContractOracle__factory;

    let user: Signer;
    let nftAdministrator: Signer;
    let priceModerator: Signer;
    let purchaseAdministrator: Signer;
    let oracleWorker: Signer;
    let invariantAdministrator: Signer;

    const BASE_URI = 'ipfs://ipfs'
    const type0 = 0x0000
    const initialGovernanceTokenAmount = ethers.utils.parseEther("10000");
    const governanceInvariant = ethers.utils.parseEther("250000");

    before(async () => {
        governanceTokenFactory = await ethers.getContractFactory("GovernanceToken") as GovernanceToken__factory;
        governanceToken = await governanceTokenFactory.deploy();

        collectionFactory = await ethers.getContractFactory("EtherLuxeCollection") as EtherLuxeCollection__factory;
        collection = await collectionFactory.deploy(BASE_URI, "EtherLuxeCollectionTest", "ELCT");
        await collection.addKind(type0, 'Kind0')

        const signers = await ethers.getSigners()
        user = signers[1];
        nftAdministrator = signers[2];
        priceModerator = signers[3];
        purchaseAdministrator = signers[4];
        oracleWorker = signers[5];
        invariantAdministrator = signers[6];


        oracleFactory = await ethers.getContractFactory("SaleContractOracle") as SaleContractOracle__factory;
        oracle = await oracleFactory.deploy(await oracleWorker.getAddress());

        factory = await ethers.getContractFactory("SaleContract") as SaleContract__factory;
        contract = await factory.deploy(governanceToken.address,
            oracle.address,
            governanceInvariant,
            await nftAdministrator.getAddress(),
            await priceModerator.getAddress(),
            await purchaseAdministrator.getAddress(),
            await invariantAdministrator.getAddress()
        );

        await governanceToken.mint(contract.address, initialGovernanceTokenAmount);
        await collection.grantRole((await collection.MINTER_ROLE()), contract.address);
    });

    const initialPrice = ethers.utils.parseUnits("1000", "gwei");
    describe("Add NFT process", () => {
        it("should perform NFT adding process from nft administrator", async () => {
            await contract.connect(nftAdministrator).addNFT(collection.address, initialPrice);
        });

        it("should revert NFT adding process from stranger", async () => {
            const attempt = contract.connect(user).addNFT(collection.address, initialPrice);
            await expect(attempt).to.be.reverted;
        });

        it("should revert NFT adding of already added NFT", async () => {
            const attempt = contract.connect(nftAdministrator).addNFT(collection.address, initialPrice);
            await expect(attempt).to.be.revertedWith("ALREADY_ADDED");
        });
    });

    describe("Buy NFT process", () => {

        it("should revert buying non-added NFT", async () => {
            // some dummy address which is not NFT collection
            const dummyAddress = "0xf5c80c305803280b587f8cabbccdc4d9bf522abd";
            const attempt = contract.connect(user).requestNFTPurchase(dummyAddress, type0);
            await expect(attempt).to.be.revertedWith("BAD_COLLECTION");
        }); 

        let creationTxHash: string
        let providedNativeAmount: BigNumber
        let nftId: BigNumber
        it("should perform NFT purchase when providing needed native amount", async () => {
            providedNativeAmount = await contract.getPrice(collection.address);
            const tx = await contract.connect(user).requestNFTPurchase(collection.address, type0, {
                value: providedNativeAmount
            });
            creationTxHash = tx.hash;
            const receipt = await contract.provider.getTransactionReceipt(creationTxHash);
            const data = receipt.logs[0].data.substring(2);
            const itemsLength = data.length / 64;
            let eventData: Array<string> = [];
            for (let index = 0; index < itemsLength; index++) {
                const item = data.substring(64 * index, 64 * (index + 1));
                eventData.push(item);
            }
        });

        it("should add purchase request to oracle", async () => {
            await oracle.connect(oracleWorker).addPurchaseRequest(
                creationTxHash,
                await user.getAddress(),
                collection.address,
                type0,
                providedNativeAmount
            );
        });

        it("should complete purchase request with off-chain worker", async () => {
            await contract.connect(purchaseAdministrator).processNFTPurchase(creationTxHash);
        });

        it("should give accrued governance tokens", async () => {
            const expectedGovernanceTokenBalance = governanceInvariant.div(initialGovernanceTokenAmount) ;
            const balance = await governanceToken.balanceOf(await user.getAddress());
            expect(balance).eq(ethers.utils.parseEther(expectedGovernanceTokenBalance.toString()));
        });

        it("should mint needed NFT to user", async () => {
            const owner = await user.getAddress()
            expect(await collection.balanceOf(owner)).to.equal(1);
        });

    });

    describe("Change Collection's price process", () => {
        it("should revert if not price moderator", async () => {
            const attempt = contract.connect(user).setPrice(collection.address, 100);
            await expect(attempt).to.be.reverted;
        });

        it("should set price whe price moderator attempts", async () => {
            await contract.connect(priceModerator).setPrice(collection.address, 1000);
        });
    });

    describe("Change invariant for governance tokens amount", async () => {
        it("should revert if not invariant administrator", async () => {
            const attempt = contract.connect(user).setGovernanceTokensInvariant(10);
            await expect(attempt).to.be.reverted;
        });

        it("should set new governance tokens invariant when invariant administrator attempts", async () => {
            await contract.connect(invariantAdministrator).setGovernanceTokensInvariant(100);
        });
    });

    describe("Change governance token", () => {
        it("should revert if not default admin", async () => {
            const dummyAddress = "0xf5c80c305803280b587f8cabbccdc4d9bf522abd";
            const attempt = contract.connect(user).setGovernanceToken(dummyAddress);
            await expect(attempt).to.be.reverted;
        });

        it("should set new governance token when default admin", async () => {
            await contract.setGovernanceToken(governanceToken.address);
        });
    });

});
