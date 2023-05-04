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
    const charactrersKind = "SQUAD LEADER"
    const transportsKind = "RESTORED MOTORCYCLE"
    const weaponsKind = "ASSAULT PISTOL"

    await hre.deployments.execute(
      "EtherLuxeCollectionCharacters",
      {
        from: minter,
        log: true,
      },
      "addKind",
      tokenKind,
      charactrersKind
    );
    await hre.deployments.execute(
      "EtherLuxeCollectionTransports",
      {
        from: minter,
        log: true,
      },
      "addKind",
      tokenKind,
      transportsKind
    );
    await hre.deployments.execute(
      "EtherLuxeCollectionWeapons",
      {
        from: minter,
        log: true,
      },
      "addKind",
      tokenKind,
      weaponsKind
    );

}
module.exports.tags = ["AddBaseKind"];
