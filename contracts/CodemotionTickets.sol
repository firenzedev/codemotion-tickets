//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CodemotionTickets {

    uint public ticketPrice = 0.5 ether;
    mapping(address => bool) private tickets;

    function buyTicket() external payable {
        require(msg.value >= ticketPrice, "Not enough eth sent");
        tickets[msg.sender] = true;
    }

    function verifyTicket() external view returns (bool) {
        return tickets[msg.sender];
    }
}
