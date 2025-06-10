// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract JournalHash {
    mapping(address => bytes32[]) private userJournalHashes;
    event JournalHashAdded(address indexed user, bytes32 hash);

    function addJournalHash(bytes32 hash) external {
        userJournalHashes[msg.sender].push(hash);
        emit JournalHashAdded(msg.sender, hash);
    }

    function getJournalHashes(address user) external view returns (bytes32[] memory) {
        return userJournalHashes[user];
    }

    function getJournalHashCount(address user) external view returns (uint256) {
        return userJournalHashes[user].length;
    }
}