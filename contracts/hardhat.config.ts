import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import {config as envs} from "dotenv";
envs();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
        url: process.env.MUMBAI_URL as string,
        accounts: {
            mnemonic: process.env.MNEMONIC as string
        }
    }
  }
};

export default config;
