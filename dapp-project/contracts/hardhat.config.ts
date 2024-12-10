import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import "solidity-coverage";

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      // Hardhat network configuration
    },
    // Add other network configurations as needed
  },
  etherscan: {
    // Etherscan API key configuration
  },
  gasReporter: {
    // Gas reporting configuration
  },
};