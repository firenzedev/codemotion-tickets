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
    await contract.connect(user).buyTicket(1, { value: ticketPrice });
    expect(await contract.connect(user).verifyTicket()).to.be.true;
  });

  it("should prevent an account buy a ticket if it doesn't send enough ethers", async () => {
    const ticketPrice = await contract.ticketPrice();
    expect(await contract.connect(user).verifyTicket()).to.be.false;
    await expect(contract.connect(user).buyTicket(1, { value: ticketPrice.sub(1) })).to.be.revertedWith("Not enough eth sent");
    expect(await contract.connect(user).verifyTicket()).to.be.false;
  });

  it("should let an account buy multiple tickets if it sends enough ethers", async () => {
    const ticketPrice = await contract.ticketPrice();
    expect(await contract.connect(user).verifyTicket()).to.be.false;
    await contract.connect(user).buyTicket(10, { value: ticketPrice.mul(10) });
    expect(await contract.connect(user).verifyTicket()).to.be.true;
  });

  it("should prevent an account buy multiple tickets if it doesn't send enough ethers", async () => {
    const ticketPrice = await contract.ticketPrice();
    expect(await contract.connect(user).verifyTicket()).to.be.false;
    await expect(contract.connect(user).buyTicket(10, { value: ticketPrice.mul(9) })).to.be.revertedWith("Not enough eth sent");
    expect(await contract.connect(user).verifyTicket()).to.be.false;
  });

});