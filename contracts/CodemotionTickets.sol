//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CodemotionTickets {

    address[] public tickets;

    function buyTicket() external {
        tickets.push(msg.sender);
    }

    function verifyTicket() external view returns (bool) {
        for (uint i = 0; i < tickets.length; i++) {
            if (tickets[i] == msg.sender) {
                return true;
            }
        }

        return false;
    }
}
