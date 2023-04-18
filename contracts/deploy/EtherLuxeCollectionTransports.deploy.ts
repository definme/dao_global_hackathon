import { HardhatRuntimeEnvironment } from "hardhat/types";
import { config as envs } from "dotenv";
envs();

module.exports = async function main(hre: HardhatRuntimeEnvironment) {
    const signers = await hre.ethers.getSigners();
    const deployer = signers[0].address;
    const collectionName = "Transports";
    const collectionContractName = "EtherLuxeCollection" + collectionName;
    console.log(`Deployer: ${deployer}`);
    console.log(`Contract: ${collectionContractName}`);

    const deployment = await hre.deployments.deploy(collectionContractName, {
        from: deployer,
        args: [
          'https://api-ether-luxe.definme.com/metadata/transports', 'EtherLuxeCollectionTransports', 'ELCT'
        ]
    });
    console.log(`Deployed at ${deployment.address}`);
}
module.exports.tags = ["EtherLuxeCollectionTransports"];
