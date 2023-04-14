import { HardhatRuntimeEnvironment } from "hardhat/types";


module.exports = async (hre: HardhatRuntimeEnvironment) => {
    const signers = await hre.ethers.getSigners();
    const deployer = signers[0];
    console.log(`Deployer: ${deployer.address}`);
    const deployment = await hre.deployments.deploy("GovernanceToken", {
        from: deployer.address,
        args: []
    });
    console.log(`Deployed at ${deployment.address}`);    
};

module.exports.tags = ["GovernanceToken__mock"];
