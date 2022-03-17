//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CodemotionTickets {

    uint public ticketPrice = 0.5 ether;
    mapping(address => uint) private tickets;

    function buyTicket(uint _amount) external payable {
        require(msg.value >= ticketPrice * _amount, "Not enough eth sent");
        tickets[msg.sender] += _amount;
    }

    function verifyTicket() external view returns (bool) {
        return tickets[msg.sender] > 0;
    }
}
