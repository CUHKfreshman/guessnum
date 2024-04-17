// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./RandomMatchmaking.sol";  // 引入RandomMatchmaking合约
import "Guess Number/IERC20.sol";

contract GuessNumberGame {
    RandomMatchmaking public matchmaking;  // RandomMatchmaking合约的引用
    address public owner; // 合约的所有者地址
    uint256 public constant stakeAmount = 20; // 每个玩家的赌注数量
    uint256 public gameFee = 1;  // 游戏启动费，每局1个token

    struct Game {
        uint256 roomNumber;
        address player1;
        address player2;
        uint256 roundNumber; // 记录游戏的进行的局数， 1/2
        uint256 turnNumber; // 记录玩家猜测的论述，两位玩家轮流猜过视为一轮
        uint256 totalPool;
        uint256 platformFee;
        address winner;
        bool isGameInProgress;
        uint256 winningNumber1;
        uint256 winningNumber2;
        address starter;
    }

    mapping(uint256 => Game) public games;
    uint256 public nextGameNumber = 1;
    // 外部映射来跟踪玩家是否已经猜过
    mapping(uint256 => mapping(address => bool)) public hasGuessed;

    event GameStarted(uint256 roomNumber, address indexed player1,  address indexed player2);
    event GameEnded(uint256 gameNumber, address indexed winner, uint256 winnings);
    event GameFinished(uint256 gameNumber, uint256 roomNumber);

    constructor(address _matchmakingAddress) {
        matchmaking = RandomMatchmaking(_matchmakingAddress);  // 初始化引用
        owner = msg.sender; // 设置合约的所有者为部署者的地址（庄家）
    }

    function startGame() external {
        // 确保调用者已经加入了一个房间
        address player1 = msg.sender;
        (uint256 roomNumber, address player2, uint256 winningNumber1, uint256 winningNumber2) = matchmaking.getPlayerRoomNumber(msg.sender);
        require(roomNumber != 0, "Player is not in any room");
        // 确保房间已经有两名玩家加入
        require(player2 != address(0), "Room is not full");

        // 创建游戏
        createGame(roomNumber, player1, player2, winningNumber1, winningNumber2);
        

        // 触发游戏开始事件
        emit GameStarted(roomNumber, player1, player2);
    }

    // 创建一个新的游戏
    function createGame(uint256 roomNumber, address player1, address player2, uint256 winningNumber1, uint256 winningNumber2) public {
        uint256 totalPool = stakeAmount * 2 ;
        games[nextGameNumber] = Game({
            roomNumber: roomNumber,
            player1: player1,
            player2: player2,
            roundNumber: 1,
            turnNumber: 0,
            totalPool: totalPool,
            platformFee: gameFee,
            winner: address(0),
            isGameInProgress: true,
            winningNumber1: winningNumber1,
            winningNumber2: winningNumber2,
            starter: address(0)
        });
        nextGameNumber++;
    }
    
    function guessNumber(uint256 guess) external {
        address player1 = msg.sender;
        // 根据调起函数的玩家地址，返回游戏信息
        (uint256 gameNumber, address player2) = getPlayerGameNumber(player1);
        require(gameNumber != 0, "Player is not in any game");

            // 获取游戏信息
        Game storage game = games[gameNumber];

        // 确保游戏正在进行中
        require(game.isGameInProgress, "Game is not in progress");

        // 确保猜测者是游戏的一部分
        require(player1 == game.player1 || player1 == game.player2, "Sender is not part of the game");

        // 确保玩家还未猜过
        require(!hasGuessed[gameNumber][player1], "Player has already guessed");

        // 确保猜测在有效范围内
        require(guess >= 1 && guess <= 10, "Guess is out of range");

        if(game.roundNumber == 1 && game.turnNumber == 0 && !hasGuessed[gameNumber][player2]) {
            game.starter = player1;
        }

        if(game.roundNumber == 2 && game.turnNumber == 0 && !hasGuessed[gameNumber][player2]) {
            require(game.starter != player1, "You can't first guess twice ");
        }

        // 标记玩家已经猜过
        hasGuessed[gameNumber][msg.sender] = true;

        // 处理玩家猜测
        if (game.roundNumber == 1 && guess == game.winningNumber1) {
            // 处理正确猜测的逻辑
            game.winner = msg.sender;
            // 计算奖金和平台费用
            (uint256 winnings, uint256 platformFee) = calculateWinnings(game.totalPool);

            // 结算游戏
            matchmaking.settleGame(game.roomNumber, game.winner, winnings, owner, platformFee);

            // 游戏局数清零，轮数加一
            game.roundNumber = 2;
            game.turnNumber = 0;

            // 触发游戏结束事件
            emit GameEnded(gameNumber, msg.sender, winnings);
        } 
        else if (game.roundNumber == 2 && guess == game.winningNumber2) {
            // 处理正确猜测的逻辑
            game.winner = msg.sender;
            // 计算奖金和平台费用
            (uint256 winnings, uint256 platformFee) = calculateWinnings(gameNumber);

            // 结算游戏
            matchmaking.settleGame(game.roomNumber, game.winner, winnings, owner, platformFee);

            // 触发游戏结束事件
            emit GameEnded(gameNumber, msg.sender, winnings);

            // 游戏停止进行
            game.isGameInProgress = true;

            // 重置游戏
            uint roomNumber = game.roomNumber;
            resetGame(gameNumber);
            matchmaking.resetRoom(roomNumber);

            // 触发游戏结算事件
            emit GameFinished(gameNumber, roomNumber);

        }
        if (hasGuessed[gameNumber][player2]) {
            // 如果另一位玩家已经猜过，增加轮数
            game.turnNumber++;
            // 重置玩家的猜测状态
            hasGuessed[gameNumber][player1] = false;
            hasGuessed[gameNumber][player2] = false;
        }
        // 如果没有猜对，并且另一位玩家还没猜过，保持轮数和猜测状态不变
    }

    // 重置游戏
    function resetGame(uint256 gameNumber) public  {
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");

        // 清空游戏数据
        delete games[gameNumber];
    }

    function calculateWinnings(uint256 gameNumber) public  returns (uint256 platformFee, uint256 playerFee) {
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");

        uint256 currentFee;
        if (game.turnNumber <= 3) {
            currentFee = 1;
        } else if (game.turnNumber <= 6) {
            currentFee = 2;
        } else {
            currentFee = 3;
        }

        // 计算平台费用
        platformFee = game.platformFee + currentFee;

        // 计算玩家费用
        playerFee = stakeAmount - platformFee;

        // 更新游戏状态
        if (game.roundNumber == 1) {
            // 第一轮游戏，更新游戏的赌池和平台费
            game.totalPool -= stakeAmount;
            game.platformFee = 1;
        } else {
            // 第二轮游戏，清空赌池和平台费
            game.totalPool = 0;
            game.platformFee = 0;
        }
        return (platformFee, playerFee);
    }

    function quitGame() external {
        uint256 platformFee;
        uint256 playerFee;
        // 确定赢家和输家
        address loser = msg.sender;
        (uint gameNumber, address winner) = getPlayerGameNumber(loser);
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");

        // 确保调用者是游戏的一部分
        require(msg.sender == game.player1 || msg.sender == game.player2, "Sender is not part of the game");

        // 根据当前局数计算当前费用
        uint256 currentFee;
        if (game.turnNumber <= 3) {
            currentFee = 1;
        } else if (game.turnNumber <= 6) {
            currentFee = 2;
        } else {
            currentFee = 3;
        }

        // 计算平台费用和玩家费用
        if (game.roundNumber == 1) {
            platformFee = game.platformFee + currentFee + gameFee;
        } else if (game.roundNumber == 2) {
            platformFee = game.platformFee + currentFee;
        }
        playerFee = game.totalPool - platformFee;

        // 更新游戏状态
        game.winner = winner;
        game.isGameInProgress = false;
        uint256 roomNumber = game.roomNumber;

        // 结算游戏
        matchmaking.settleGame(gameNumber, winner, playerFee, owner, platformFee);

        // 删除游戏
        resetGame(gameNumber);

        // 删除房间
        matchmaking.resetRoom(roomNumber);
    }



    function getPlayerGameNumber(address player1) public view returns (uint256, address) {
        for (uint256 i = 1; i <= nextGameNumber; i++) {
            Game storage game = games[i];
            if (game.player1 == player1) {
                return (i, game.player2);
            } else if (game.player2 == player1) {
                return (i, game.player1);
            }
        }
        return (0, address(0)); // 如果玩家不在任何房间中，则返回 (0, address(0))
    }
}