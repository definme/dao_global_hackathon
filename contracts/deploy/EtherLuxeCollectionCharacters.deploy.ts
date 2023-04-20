import { HardhatRuntimeEnvironment } from "hardhat/types";
import { config as envs } from "dotenv";
envs();

module.exports = async function main(hre: HardhatRuntimeEnvironment) {
    const signers = await hre.ethers.getSigners();
    const deployer = signers[0].address;
    const collectionName = "Characters";
    const collectionContractName = "EtherLuxeCollection" + collectionName;
    console.log(`Deployer: ${deployer}`);
    console.log(`Contract: ${collectionContractName}`);

    const deployment = await hre.deployments.deploy(collectionContractName, {
        from: deployer,
        args: [
          'https://api-ether-luxe.definme.com/metadata/characters', 'EtherLuxeCollectionCharacters', 'ELCC'
        ]
    });
    console.log(`Deployed at ${deployment.address}`);

    const MINTER_ROLE = await hre.deployments.read(collectionContractName, "MINTER_ROLE");
    const saleContract = await  hre.deployments.get("SaleContract")
    await hre.deployments.execute(collectionContractName, 
      {from: deployer, log: true,}, 
      "grantRole", MINTER_ROLE, saleContract.address
      );
}

module.exports.tags = ["EtherLuxeCollectionCharacters"];
module.exports.dependencies = ["SaleContract"];
