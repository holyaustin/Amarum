require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
   
    testnet: {
      url: `https://filecoin-calibration.chainstacklabs.com/rpc/v1`, 
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
    },

  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
        details: { yul: false },
      },
    }
  }
};
