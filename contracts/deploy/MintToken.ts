import { HardhatRuntimeEnvironment } from "hardhat/types";
import { config as envs } from "dotenv";
envs();

module.exports = async function main(hre: HardhatRuntimeEnvironment) {
    const signers = await hre.ethers.getSigners();
    const minter = signers[0].address;
    const characters = await hre.deployments.get("EtherLuxeCollectionCharacters");
    const transports = await hre.deployments.get("EtherLuxeCollectionTransports");
    const weapons = await hre.deployments.get("EtherLuxeCollectionWeapons");
  
    console.log(`Using EtherLuxeCollectionCharacters at ${characters.address}`);
    console.log(`Using EtherLuxeCollectionTransports at ${transports.address}`);
    console.log(`Using EtherLuxeCollectionWeapons at ${weapons.address}`);
    console.log(`Minter: ${minter}`);

    const tokenKind = 0;
  
      await hre.deployments.execute(
        "EtherLuxeCollectionCharacters",
        {
          from: minter,
          log: true,
        },
        "mintKind",
        minter,
        tokenKind
      );
    }
  
  module.exports.tags = ["MintTokens"];