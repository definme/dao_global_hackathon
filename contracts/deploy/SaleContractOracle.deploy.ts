import { HardhatRuntimeEnvironment } from "hardhat/types";
import {config as envs} from "dotenv";
envs();

module.exports = async function main(hre: HardhatRuntimeEnvironment) {
    console.log(process.env.MNEMONIC);
    const signers = await hre.ethers.getSigners();
    const deployer = signers[0].address;
    const oracleWorker = signers[6].address;
    console.log(`Deployer: ${deployer}`);
    console.log(`oracleWorker: ${oracleWorker}`);
    const deploy = await hre.deployments.deploy("SaleContractOracle", {
        from: deployer,
        args: [
            oracleWorker
        ]
    });
    console.log(`Deployed at ${deploy.address}`);
}

module.exports.tags = ["SaleContractOracle"];
