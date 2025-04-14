require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [process.env.MAINNET_PRIVATE_KEY]
    },
    bscmain: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [process.env.MAINNET_PRIVATE_KEY]
    }
  },
};
