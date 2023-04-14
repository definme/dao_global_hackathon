import { HardhatRuntimeEnvironment } from "hardhat/types";
import { config as envs } from "dotenv";
envs();

module.exports = async function main(hre: HardhatRuntimeEnvironment) {
    const signers = await hre.ethers.getSigners();
    const deployer = signers[0].address;
    console.log(`Deployer: ${deployer}`);

    const deployment = await hre.deployments.deploy("EtherLuxeCollection", {
        from: deployer,
        args: [
          'https://api-ether-luxe.definme.com/metadata/weapons', 'EtherLuxeCollectionWeapons', 'ELCW'
        ]
    });
    console.log(`Deployed at ${deployment.address}`);
}
module.exports.tags = ["EtherLuxeCollectionWeapons"];
