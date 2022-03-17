const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CodemotionTickets", () => {
  let contract, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const CodemotionTickets = await ethers.getContractFactory("CodemotionTickets");
    contract = await CodemotionTickets.deploy();
    await contract.deployed();
  });

  it("should let an account buy a ticket", async () => {
    await expect(contract.tickets(0)).to.be.reverted;
    await contract.connect(user).buyTicket();
    expect(await contract.tickets(0)).to.equal(user.address);
  });
});