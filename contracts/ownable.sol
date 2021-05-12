// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.4;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owners can call this function");
        _;
    }
}
