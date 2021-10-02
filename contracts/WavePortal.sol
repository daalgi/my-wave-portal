//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 private seed;

    uint256 totalWaves;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    constructor() payable {
        console.log("Constructed!");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log('%s has waved!', msg.sender);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);

        // Generate a random number between 0 and 100
        uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random number genrated: %s", randomNumber);
        seed = randomNumber;

        // 50% chance of winning the price of 0.0001 ETH to wavers
        if (randomNumber < 50) {
            console.log("%s won!", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more ether than the contract has."
            );
            (bool success,) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw ether from contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have a total of %d waves!", totalWaves);
        return totalWaves;
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getWavesPerAddress(address _address) public view returns (Wave[] memory) {
        // Count the num of waves made by `_address`
        uint256 count;
        for (uint256 i = 0; i < totalWaves; i++) {
            if (waves[i].waver == _address) {
                count++;
            }
        }
        // Create an array of `Wave` of length `count`
        Wave[] memory awaves = new Wave[](count);
        // Loop over `ẁaves` to populate the new array
        uint256 j;
        for (uint256 i = 0; i < totalWaves; i++) {
            if (waves[i].waver == _address) {
                awaves[j] = waves[i];
                j++;
            }
        }
        return awaves;
    }
}
