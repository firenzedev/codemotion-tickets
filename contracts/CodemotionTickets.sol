//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CodemotionTickets {

    mapping(address => bool) private tickets;

    function buyTicket() external {
        tickets[msg.sender] = true;
    }

    function verifyTicket() external view returns (bool) {
        return tickets[msg.sender];
    }
}
