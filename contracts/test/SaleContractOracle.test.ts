import { ethers } from "hardhat";
import { SaleContractOracle, SaleContractOracle__factory } from "../typechain-types";
import { Signer } from "ethers";
import { expect } from "chai";



describe("SaleContractOracle", () => {
    let factory: SaleContractOracle__factory;
    let contract: SaleContractOracle

    let oracleWorker: Signer;
    let stranger: Signer;

    before(async() => {
        const signers = await ethers.getSigners();
        oracleWorker = signers[1];
        stranger = signers[2];
        factory = await ethers.getContractFactory("SaleContractOracle");
        contract = await factory.deploy(await oracleWorker.getAddress());
    });

    const buyer = "0xb5a1838c772fa63f3f20e0a4ac339f2d34f94353";
    const collection = "0x041474fc92d3e287f7c191a3de77187ae01548fa";
    const tokenId = 1;
    const providedNativeAmount = 1000000;
    describe("Adding to oracle storage", () => {
        const dummyTxhash = "0xb0c213701cb759423dc03f68f93248d345247c5e29a95dad7fe153b86caae8f5";
        it("should revert add from non worker", async () => {
            const attempt = contract.connect(stranger).addPurchaseRequest(dummyTxhash, buyer, collection, tokenId, providedNativeAmount);
            await expect(attempt).to.be.reverted;
        });

        it("should add from oracle worker", async () => {
            await contract.connect(oracleWorker).addPurchaseRequest(dummyTxhash, buyer, collection, tokenId, providedNativeAmount);
        });

        it("should revert adding already added", async () => {
            const attempt = contract.connect(oracleWorker).addPurchaseRequest(dummyTxhash, buyer, collection, tokenId, providedNativeAmount);
            await expect(attempt).to.be.revertedWith("ALREADY_OPERATED");
        });
    });
});
