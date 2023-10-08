//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract greetings{
    string greeting;

    function setGreeting(string memory _greeting) public{
        greeting = _greeting;
    } 
    function fetchGreeting() public view returns(string memory){
        return greeting;
    }
}