// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract RandomMatchmaking {
    IERC20 public token;
    uint256 public constant stakeAmount = 20; // 每个玩家的赌注数量
    uint256 public constant tokenAmount = 10**16; // 代币的0.01单位，按代币的decimals来
    uint256 public constant roomTimeout = 10 seconds; // 房间超时时间
    uint256 public constant maxNumber = 10; // 最大猜测数字范围

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
        token = IERC20(_token);
    }

    // 检查房间是否活跃（即已满员）
    function isRoomActive(uint256 roomNumber) public view returns (bool) {
        return rooms[roomNumber].isFull;
    }

    // 玩家请求加入游戏
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

            // 使用玩家提供的种子生成隐藏数字
            (room.winningNumber1, room.winningNumber2) = generateWinningNumbers(room.seed1, room.seed2);
        }
    }

    // 寻找可用房间，如果没有则创建新房间
    function findAvailableRoom() private returns (uint256) {
        for(uint256 i = 1; i < nextRoomNumber; i++) {
            if (!rooms[i].isFull) {
                return i;
            }
        }

        // 没有空闲房间，创建一个新的房间
        uint256 newRoomNumber = nextRoomNumber;
        rooms[newRoomNumber] = Room({player1: address(0), player2: address(0), lastActionTime: block.timestamp, isFull: false, winningNumber1: 0, winningNumber2: 0, seed1: 0, seed2: 0});
        nextRoomNumber++;
        return newRoomNumber;
    }
    // 删除等待时间超时的房间
    function deleteRoomIfTimeout(uint256 roomNumber) external {
        Room storage room = rooms[roomNumber];
        require(!room.isFull, "Room is full");

        uint256 lastActionTime = room.lastActionTime;
        require(block.timestamp > lastActionTime + roomTimeout, "Timeout not reached");

        resetRoom(roomNumber);
    }

    // 使用种子生成两个隐藏数字
    function generateWinningNumbers(uint256 seed1, uint256 seed2) private pure returns (uint256, uint256) {
        uint256 number1 = uint256(keccak256(abi.encodePacked(seed1, seed2)));
        uint256 number2 = uint256(keccak256(abi.encodePacked(seed2, seed1)));
        return (number1 % maxNumber + 1, number2 % maxNumber + 1); // 生成 1 到 maxNumber 之间的数字
    }

    // 游戏结算
    function settleGame(uint256 roomNumber, address winner, uint256 prize, address owner, uint256 platformFee) public {
        Room storage room = rooms[roomNumber];
        require(room.isFull, "Room not full");

        // 转移奖金给赢家
        require(token.transfer(winner, prize), "Failed to transfer winnings to winner");

        // 转移平台费用给庄家
        require(token.transfer(owner, platformFee), "Failed to transfer platform fee to platform fee receiver");
    }

    // 重置房间
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


    function getPlayerRoomNumber(address player1) public view returns (uint256, address player2) {
        for (uint256 i = 1; i < nextRoomNumber; i++) {
            Room storage room = rooms[i];
            if (room.player1 == player1) {
                return (i, room.player2);
            } else if (room.player2 == player1) {
                return (i, room.player1);
            }
        }
        return (0, address(0)); // 如果玩家不在任何房间中，则返回 0
    }

}
