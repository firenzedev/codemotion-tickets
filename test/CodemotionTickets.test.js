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
    expect(await contract.connect(user).verifyTicket()).to.be.false;
    await contract.connect(user).buyTicket();
    expect(await contract.connect(user).verifyTicket()).to.be.true;
  });
});