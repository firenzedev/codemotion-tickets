//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CodemotionTickets {

    address[] public tickets;

    function buyTicket() external {
        tickets.push(msg.sender);
    }
}
