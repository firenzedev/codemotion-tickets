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

  it("should prevent an account buy a ticket if max supply has been reached", async () => {
    const ticketPrice = await contract.ticketPrice();
    const maxSupply = await contract.MAX_SUPPLY();
    const firstPurchaseQuantity = maxSupply.sub(2);

    await contract.connect(user).buyTicket(firstPurchaseQuantity, { value: ticketPrice.mul(firstPurchaseQuantity) });
    await contract.connect(user).buyTicket(2, { value: ticketPrice.mul(2) });
    await expect(contract.connect(user).buyTicket(1, { value: ticketPrice })).to.be.revertedWith("No more tickets available");
  });

  it("should let contract owner change the ticket price", async () => {
    const ticketPrice = await contract.ticketPrice();
    const newTicketPrice = ethers.utils.parseEther("1");
    await contract.setTicketPrice(newTicketPrice);
    expect(await contract.ticketPrice()).to.equal(newTicketPrice);
  });

  it("should prevent any user but the contract owner to change the ticket price", async () => {
    const ticketPrice = await contract.ticketPrice();
    const newTicketPrice = ethers.utils.parseEther("1");
    await expect(contract.connect(user).setTicketPrice(newTicketPrice)).to.be.revertedWith("Reserved to contract owner");
  });
});