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

  it("should let an account buy a ticket if it sends enough ethers", async () => {
    const ticketPrice = await contract.ticketPrice();
    expect(await contract.connect(user).verifyTicket()).to.be.false;
    await contract.connect(user).buyTicket({ value: ticketPrice });
    expect(await contract.connect(user).verifyTicket()).to.be.true;
  });

  it("should prevent an account buy a ticket if it doesn't send enough ethers", async () => {
    const ticketPrice = await contract.ticketPrice();
    expect(await contract.connect(user).verifyTicket()).to.be.false;
    await expect(contract.connect(user).buyTicket({ value: ticketPrice.sub(1) })).to.be.revertedWith("Not enough eth sent");
    expect(await contract.connect(user).verifyTicket()).to.be.false;
  });
});