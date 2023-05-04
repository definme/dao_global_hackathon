import { HardhatRuntimeEnvironment } from "hardhat/types";
import { config as envs } from "dotenv";
envs();

module.exports = async function main(hre: HardhatRuntimeEnvironment) {
    const signers = await hre.ethers.getSigners();

    const deployer = signers[0].address;
    const nftAdministrator = signers[1].address;
    const priceModerator = signers[2].address;
    const purchaseAdministrator = signers[3].address;
    const invariantAdministrator = signers[4].address;
    const governanceTokensInvariant = hre.ethers.utils.parseEther("3775");
    console.log(`Deployer: ${deployer}`);
    console.log(`nftAdministrator: ${nftAdministrator}`);
    console.log(`priceModerator: ${priceModerator}`);
    console.log(`purchaseAdministrator: ${purchaseAdministrator}`);
    console.log(`invariantAdministrator: ${invariantAdministrator}`);
    const governanceTokenAddress = process.env.GOVERNANCE_TOKEN_ADDRESS
    if (governanceTokenAddress === undefined) {
        console.error("Please provide GOVERNANCE_TOKEN_ADDRESS as env in .env file");
        process.exit(1);
    }
    const oracle = await hre.deployments.get("SaleContractOracle");
    const deployment = await hre.deployments.deploy("SaleContract", {
        from: deployer,
        args: [
            governanceTokenAddress,
            oracle.address,
            governanceTokensInvariant,
            nftAdministrator,
            priceModerator,
            purchaseAdministrator,
            invariantAdministrator
        ]
    });
    console.log(`Deployed at ${deployment.address}`);
}
module.exports.tags = ["SaleContract"];
