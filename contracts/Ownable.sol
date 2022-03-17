//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {

    address private owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Reserved to contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }
}
