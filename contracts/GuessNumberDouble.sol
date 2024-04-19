// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "./RandomMatchmaking.sol";  // 引入RandomMatchmaking合约
import "./IERC20.sol";

// ERC20:
// 1. view balance
// 2.mint(amount)
// Single Player
// 1. check game status =>return (boolean, int)(游戏是否完结，奖池剩余金额)view function,
// 2. send guess(number)
// 送guess去游戏
// 3. is in game
// 看是否在单人游戏中view function
// 4. join game
// 加入单人游戏
// 5. remaining time
// 这局游戏还剩多少时间
// Multi Player
// 1. check game status =>return (boolean, boolean, int, int)view function，三个返回值(是否是我的回合，游戏是否结束，奖池剩余金额，第几回合)
// 2. is in game
// 3. join game
// 4. remaining time
// 5. send guess


// multiple inheritance
contract GuessNumberGame {
    RandomMatchmaking public matchmaking;  // RandomMatchmaking合约的引用
    address public owner; // 合约的所有者地址
    uint256 public constant stakeAmount = 20; // 每个玩家的赌注数量, 也是每局游戏的赌注
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
        uint256 startTime;
    }

    mapping(uint256 => Game) public games;
    uint256 public nextGameNumber = 1;
    // 外部映射来跟踪玩家是否已经猜过
    mapping(uint256 => mapping(address => bool)) public hasGuessed;
    // 两局游戏，回合数从0开始，第一局回合数是偶数，是player1的回合，奇数是player2的回合，player1先手，第二局回合数是奇数，是player2的回合，偶数是player1的回合，player2先手

    event GameStarted(uint256 indexed roomNumber, address indexed player1,  address indexed player2);
    event OneGameEnded(uint256 indexed gameNumber, address indexed winner, uint256 winnings); // 一局游戏结束的事件
    event GameFinished(uint256 indexed gameNumber, uint256 roomNumber); // 一次游戏，两局都结束的事件
    event NumberGuessed(uint256 indexed gameID, address indexed player, uint256 number); // 玩家猜测数字的事件

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
        // 检查是否已经在游戏中
        (uint gameNumber, ) = getPlayerGameNumber(player1);
        require(gameNumber == 0, "Player is already in a game");

        // 创建游戏
        createGame(roomNumber, player1, player2, winningNumber1, winningNumber2);
        

        // 触发游戏开始事件
        emit GameStarted(roomNumber, player1, player2);
    }

    // 创建一个新的游戏
    function createGame(uint256 roomNumber, address player1, address player2, uint256 winningNumber1, uint256 winningNumber2) public {
        uint256 totalPool = stakeAmount;
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
            starter: address(0),
            startTime: block.timestamp
        });
        nextGameNumber++;
    }

    // check game status, call by player
    function checkGameStatus() public view returns (bool, bool, uint256, uint256) {
        address player1 = msg.sender;
        (uint256 gameNumber, ) = getPlayerGameNumber(player1);
        require(gameNumber != 0, "Player is not in any game");

        Game storage game = games[gameNumber];

        bool isMyTurn = (game.turnNumber % 2 == 0 && player1 == game.player1) || (game.turnNumber % 2 == 1 && player1 == game.player2);
        bool isGameEnded = !game.isGameInProgress;
        uint256 remainingPool = game.totalPool;
        uint256 roundNumber = game.roundNumber;
        return (isMyTurn, isGameEnded, remainingPool, roundNumber);
    }
    
    function guessNumber(uint256 guess) external {
        address player1 = msg.sender;
        // 根据调起函数的玩家地址，返回游戏信息
        (uint256 gameNumber, ) = getPlayerGameNumber(player1);
        require(gameNumber != 0, "Player is not in any game");

        // 获取游戏信息
        Game storage game = games[gameNumber];

        // 获取游戏状态
        (bool isMyTurn, bool isGameOver, , uint256 roundNumber) = checkGameStatus();

        // 确保游戏正在进行中
        require(!isGameOver, "Game is not in progress");

        // 确保猜测者是当前回合的玩家
        require(isMyTurn, "It's not your turn");


        // 确保猜测在有效范围内
        require(guess >= 0 && guess <= 9, "Guess is out of range");

        // 标记玩家已经猜过
        hasGuessed[gameNumber][msg.sender] = true;

        // 触发玩家猜测数字的事件
        emit NumberGuessed(gameNumber, player1, guess);

        // 处理玩家猜测
        if ((roundNumber == 1 && guess == game.winningNumber1) || (roundNumber == 2 && guess == game.winningNumber2)) {
            // 处理正确猜测的逻辑
            game.winner = player1;
            // 计算奖金和平台费用
            (uint256 winnings, uint256 platformFee) = calculateWinnings(gameNumber);
            game.platformFee = platformFee;
            game.totalPool = winnings;

            // 结算游戏
            matchmaking.settleGame(game.roomNumber, game.winner, winnings, owner, platformFee);
    
            // 如果是第一局，增加轮数并重置玩家的猜测状态
            if (roundNumber == 1) {
                game.roundNumber++;
                game.turnNumber = 0;

                game.platformFee = gameFee;
                game.totalPool = stakeAmount;
                
                emit OneGameEnded(gameNumber, msg.sender, winnings);
            } else {
                // 如果是第二局，结束游戏
                game.isGameInProgress = false;
                // 重置游戏
                uint roomNumber = game.roomNumber;
                // resetGame(gameNumber);
                // matchmaking.resetRoom(roomNumber);
                
                emit OneGameEnded(gameNumber, msg.sender, winnings);
                emit GameFinished(gameNumber, roomNumber);
            }

        } else {
            // 如果没有猜中，增加轮数
            game.turnNumber++;

            // 计算平台费用
            (uint256 winnings, uint256 platformFee) = calculateWinnings(gameNumber);
            game.platformFee = platformFee;
            game.totalPool = winnings;
        }
    }

    // 重置游戏
    function resetGame(uint256 gameNumber) public  {
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");

        // 清空游戏数据
        delete games[gameNumber];
    }

    function calculateWinnings(uint256 gameNumber) public view returns (uint256 platformFee, uint256 playerFee) {
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");

        uint256 currentFee;
        if (game.turnNumber <= 5) {
            currentFee = 1;
        } else if (game.turnNumber <= 11) {
            currentFee = 2;
        } else {
            currentFee = 3;
        }

        // 计算平台费用
        platformFee = gameFee + currentFee;

        // 计算玩家费用
        playerFee = stakeAmount - platformFee;

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

        // 计算平台费用和玩家费用
        if (game.roundNumber == 1) {
            platformFee = game.platformFee + gameFee;
            playerFee = game.totalPool + stakeAmount - gameFee;
        } else if (game.roundNumber == 2) {
            platformFee = game.platformFee;
            playerFee = game.totalPool;
        }
        // 结算游戏
        matchmaking.settleGame(gameNumber, winner, playerFee, owner, platformFee);

        // 更新游戏状态
        game.winner = winner;
        game.isGameInProgress = false;
        uint256 roomNumber = game.roomNumber;

        // 删除游戏
        // resetGame(gameNumber);
        // 删除房间
        // matchmaking.resetRoom(roomNumber);
        emit OneGameEnded(gameNumber, winner, playerFee);
        emit GameFinished(gameNumber, roomNumber);
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

    function isGameTimeout(uint256 gameID) public view returns (bool) {
        Game storage game = games[gameID];

        // 如果当前时间超过游戏开始时间加上十分钟，那么游戏就超时了
        return block.timestamp > game.startTime + 10 minutes;
    }


    function remainingTime(uint256 gameID) public view returns (uint256) {
        Game storage game = games[gameID];

        // 计算游戏剩余的时间
        uint256 endTime = game.startTime + 10 minutes;
        if (block.timestamp >= endTime) {
            // 如果当前时间已经超过游戏的结束时间，那么剩余时间就是0
            return 0;
        } else {
            // 否则，剩余时间就是结束时间减去当前时间
            return endTime - block.timestamp; // seconds
        }
    }
}