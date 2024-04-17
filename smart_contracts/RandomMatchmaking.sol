// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@klaytn/contracts/KIP/token/KIP7/IKIP7.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract RandomMatchmaking {
    IKIP7 public token;
    uint256 public constant stakeAmount = 20; // stake amount per player
    uint256 public constant tokenAmount = 10; // 
    uint256 public constant roomTimeout = 10 seconds; // max waiting time before timeout
    uint256 public constant maxNumber = 10; // number range is from 1 to 10

    struct Room {
        address player1;
        address player2;
        uint256 lastActionTime;
        bool isFull;
        uint256 winningNumber1;
        uint256 winningNumber2;
        uint256 seed1;
        uint256 seed2;
    }

    mapping(uint256 => Room) public rooms;
    uint256 public nextRoomNumber = 1;

    event RoomCreated(uint256 roomNumber, address createdBy);
    event RoomJoined(uint256 roomNumber, address joinedBy);
    event GameStarted(uint256 roomNumber, address player1, address player2);

    constructor(address _token) {
        token = IKIP7(_token);
    }

    /*
    Check if a room has 2 players (full)
    */
    function isRoomActive(uint256 roomNumber) public view returns (bool) {
        return rooms[roomNumber].isFull;
    }

    /*
    Called by player to join the game
    */
    function joinGame(uint256 seed) public {
        require(token.transferFrom(msg.sender, address(this), stakeAmount * tokenAmount), "Failed to transfer tokens");

        uint256 roomNumber = findAvailableRoom();

        Room storage room = rooms[roomNumber];
        if (room.player1 == address(0)) {
            room.player1 = msg.sender;
            room.seed1 = seed;
            room.lastActionTime = block.timestamp;
            emit RoomCreated(roomNumber, msg.sender);
        } else {
            room.player2 = msg.sender;
            room.isFull = true;
            room.seed2 = seed;
            room.lastActionTime = block.timestamp;
            emit RoomJoined(roomNumber, msg.sender);
            emit GameStarted(roomNumber, room.player1, room.player2);

            // generate winning numbers based on the seeds provided by players
            (room.winningNumber1, room.winningNumber2) = generateWinningNumbers(room.seed1, room.seed2);
        }
    }

    /*
    Find a free room for a player
    If no rooms available, create a new one
    */
    function findAvailableRoom() private returns (uint256) {
        for(uint256 i = 1; i < nextRoomNumber; i++) {
            if (!rooms[i].isFull) {
                return i;
            }
        }

        // no avail room found, create a new room
        uint256 newRoomNumber = nextRoomNumber;
        rooms[newRoomNumber] = Room({player1: address(0), player2: address(0), lastActionTime: block.timestamp, isFull: false, winningNumber1: 0, winningNumber2: 0, seed1: 0, seed2: 0});
        nextRoomNumber++;
        return newRoomNumber;
    }

    /*
    Remove a timed-out room from the mapping
    */
    function deleteRoomIfTimeout(uint256 roomNumber) external {
        Room storage room = rooms[roomNumber];
        require(!room.isFull, "Room is full");

        uint256 lastActionTime = room.lastActionTime;
        require(block.timestamp > lastActionTime + roomTimeout, "Timeout not reached");

        resetRoom(roomNumber);
    }

    /*
    Generate winning numbers based on the seeds provided by players
    */
    function generateWinningNumbers(uint256 seed1, uint256 seed2) private pure returns (uint256, uint256) {
        uint256 number1 = uint256(keccak256(abi.encodePacked(seed1, seed2)));
        uint256 number2 = uint256(keccak256(abi.encodePacked(seed2, seed1)));
        return (number1 % maxNumber + 1, number2 % maxNumber + 1);
    }

    /* 
    Settlement at the end of a game
    */
    function settleGame(uint256 roomNumber, address winner, uint256 prize, address owner, uint256 platformFee) public {
        Room storage room = rooms[roomNumber];
        require(room.isFull, "Room not full");

        // transfer tokens to winner(s)
        require(token.transfer(winner, prize), "Failed to transfer winnings to winner");

        // transfer platform profits to contract owner
        require(token.transfer(owner, platformFee), "Failed to transfer platform fee to platform fee receiver");
    }

    /* 
    Reset a room
    */
    function resetRoom(uint256 roomNumber) public {
        Room storage room = rooms[roomNumber];
        room.player1 = address(0);
        room.player2 = address(0);
        room.isFull = false;
        room.lastActionTime = block.timestamp;
        room.winningNumber1 = 0;
        room.winningNumber2 = 0;
        room.seed1 = 0;
        room.seed2 = 0;
    }

    /* 
    Returns the room number of a player
    Returns 0 if the player has not been assigned a room
    */
    function getPlayerRoomNumber(address player1) public view returns (uint256, address player2) {
        for (uint256 i = 1; i < nextRoomNumber; i++) {
            Room storage room = rooms[i];
            if (room.player1 == player1) {
                return (i, room.player2);
            } else if (room.player2 == player1) {
                return (i, room.player1);
            }
        }
        return (0, address(0));
    }

}
