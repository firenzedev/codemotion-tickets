const { ethers } = require("hardhat");

async function main() {
    const CodemotionTickets = await ethers.getContractFactory("CodemotionTickets");
    const contract = await CodemotionTickets.deploy();
    await contract.deployed();

    console.log("CodemotionTickets contract deployed to " + contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
