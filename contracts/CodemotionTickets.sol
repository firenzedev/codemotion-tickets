//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract CodemotionTickets is Ownable {

    uint public constant MAX_SUPPLY = 500;

    uint public ticketPrice = 0.5 ether;
    uint private currentSupply = 0;

    mapping(address => uint) private tickets;

    function buyTicket(uint _amount) external payable {
        require(msg.value >= ticketPrice * _amount, "Not enough eth sent");
        require(currentSupply + _amount <= MAX_SUPPLY, "No more tickets available");

        tickets[msg.sender] += _amount;
        currentSupply += _amount;
    }

    function verifyTicket() external view returns (bool) {
        return tickets[msg.sender] > 0;
    }

    function setTicketPrice(uint _price) external onlyOwner {
        ticketPrice = _price;
    }

    function withdraw(address _to) external onlyOwner {
        payable(_to).transfer(address(this).balance);
    }
}
