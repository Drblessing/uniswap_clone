// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
// import 'hardhat/console.sol';

contract Uniswap {
    event Transfer(
        address sense,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword,
        string message2
    );

    function publishTransaction(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword,
        string memory message2
    ) public {
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword, message2);
    }
}
