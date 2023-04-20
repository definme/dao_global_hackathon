import { HardhatRuntimeEnvironment } from "hardhat/types";
import { config as envs } from "dotenv";
envs();

module.exports = async function main(hre: HardhatRuntimeEnvironment) {
    const signers = await hre.ethers.getSigners();
    const nftAdministrator = signers[1].address;
    const characters = await hre.deployments.get("EtherLuxeCollectionCharacters");
    const transports = await hre.deployments.get("EtherLuxeCollectionTransports");
    const weapons = await hre.deployments.get("EtherLuxeCollectionWeapons");
  
    console.log(`Using EtherLuxeCollectionCharacters at ${characters.address}`);
    console.log(`Using EtherLuxeCollectionTransports at ${transports.address}`);
    console.log(`Using EtherLuxeCollectionWeapons at ${weapons.address}`);

    const charactersPrice = 100000000000000;
    const transportsPrice = 10000000000000;
    const weaponsPrice = 5000000000000;

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
        charactersPrice
      );
    // Add transports collection to the sale contract
    await hre.deployments.execute(
      "SaleContract",
      {
        from: nftAdministrator,
        log: true,
      },
      "addNFT",
      transports.address,
      transportsPrice
    );
    // Add weapons collection to the sale contract
    await hre.deployments.execute(
      "SaleContract",
      {
        from: nftAdministrator,
        log: true,
      },
      "addNFT",
      weapons.address,
      weaponsPrice
    );          
    }
    
  
  module.exports.tags = ["AddCollections"];
  module.exports.dependencies = ["SaleContract"];