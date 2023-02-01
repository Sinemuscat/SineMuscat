require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

const { ALCHEMY_URL, METAMASK_KEY } = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: ALCHEMY_URL,
      accounts: [`0x${METAMASK_KEY}`]
    }
  }
};

