import { HardhatRuntimeEnvironment } from "hardhat/types";
import { config as envs } from "dotenv";
envs();

module.exports = async function main(hre: HardhatRuntimeEnvironment) {
    const signers = await hre.ethers.getSigners();
    const nftAdministrator = signers[1].address;
    const characters = await hre.deployments.get("EtherLuxeCollectionCharacters");
  
    console.log(`Using EtherLuxeCollectionCharacters at ${characters.address}`);

    const charactersPrice = 100000000000000;

    console.log(`nftAdministrator: ${nftAdministrator}`);

    // Add characters collection to the sale contract
      await hre.deployments.execute(
        "SaleContract",
        {
          from: nftAdministrator,
          log: true,
        },
        "addNFT",
        characters.address,
        charactersPrice,
        true
      );    
    }
    
  
  module.exports.tags = ["AddCollections"];
  module.exports.dependencies = ["SaleContract"];