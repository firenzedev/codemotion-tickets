require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

const { task } = require("hardhat/config");
const { PRIVATE_KEY, ROPSTEN_API_URL } = process.env;

task("buyTicket", "buy a Codemotion ticket")
  .addParam("contractAddress", "address of the contract")
  .setAction(async (args, hre) => {
    const contract = await hre.ethers.getContractAt("CodemotionTickets", args.contractAddress);

    const txn = await contract.buyTicket(1, { value: hre.ethers.utils.parseEther("0.5") });
    const txnResponse = await txn.wait();

    console.log("Ticket purchased in transaction " + txnResponse.transactionHash + " (block " + txnResponse.blockNumber + ")");

    const verified = await contract.verifyTicket();
    if (verified) {
      console.log("Awesome! You can access Codemotion conference!");
    } else {
      console.log("Sorry, you can't access Codemotion conference! Please purchase a ticket!");
    }
  });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    ropsten: {
      url: ROPSTEN_API_URL,
      accounts: [ PRIVATE_KEY ],
    },
  },
  solidity: "0.8.4",
};
