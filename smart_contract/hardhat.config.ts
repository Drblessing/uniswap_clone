import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config'


const privateKey: string = process.env.PRIVATE_KEY ?? "default"

const config: HardhatUserConfig = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey]
    }
  },
  solidity: "0.8.9",
}

export default config;
