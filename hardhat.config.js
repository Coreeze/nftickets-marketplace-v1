/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { API_URL, PRIVATE_KEY, POLYGON_API_KEY } = process.env;
// console.log(process.env);

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: POLYGON_API_KEY,
  },
};

// module.exports = {
//   solidity: "0.8.1",
//   defaultNetwork: "ropsten",
//   networks: {
//     hardhat: {},
//     ropsten: {
//       url: API_URL,
//       accounts: [`0x${PRIVATE_KEY}`],
//     },
//   },
//   etherscan: {
//     // Your API key for Etherscan
//     // Obtain one at https://etherscan.io/
//     apiKey: ETHERSCAN_API_KEY,
//   },
// };
