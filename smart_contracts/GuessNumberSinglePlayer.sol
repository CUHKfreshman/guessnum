// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

// import "./RandomMatchmaking.sol";  // 引入RandomMatchmaking合约
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


// multiple inheritance
contract GuessNumberSinglePlayer {
    IERC20 public token;
    address public owner; // 合约的所有者地址
    uint256 public constant stakeAmount = 10; // 每个玩家的赌注数量, 也是每局游戏的赌注
    // uint256 public gameFee = 1;  // 游戏启动费，每局1个token
    uint256 public constant gameFee = 2;  // 猜错一次，游戏费用增加2个token
    uint256 public constant tokenAmount = 10; // 代币的单位，按代币的decimals来


    struct Game {
        address player1;
        uint256 turnNumber; // 记录玩家猜测的论述，两位玩家轮流猜过视为一轮
        uint256 totalPool;
        uint256 platformFee;
        bool isGameInProgress;
        uint256 winningNumber1;
        uint256 startTime;
    }

    mapping(uint256 => Game) public games;
    uint256 public nextGameNumber = 1;
    
    
    event GameStarted(uint256 indexed gameNumber, address indexed player1);
    event OneGameEnded(uint256 indexed gameNumber, address indexed winner, uint256 winnings); // 一局游戏结束的事件
    event NumberGuessed(uint256 indexed gameID, address indexed player, uint256 number); // 玩家猜测数字的事件

    constructor(address _token) {
        token = IERC20(_token);
        owner = msg.sender; // 设置合约的所有者为部署者的地址（庄家）
    }

    function startGame(uint256 seed) external {
        address player1 = msg.sender;
        // 检查是否已经在游戏中
        (uint gameNumber) = getPlayerGameNumber(player1);
        require(gameNumber == 0, "Player is already in a game");
        // 检查是否有足够的代币
        require(token.transferFrom(msg.sender, address(this), stakeAmount * tokenAmount), "Failed to transfer tokens");
        require(token.transferFrom(owner, address(this), stakeAmount * tokenAmount), "Failed to transfer tokens");

        // 生成随机数
        uint256 winningNumber1 = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, seed))) % 10;

        // 创建游戏
        createGame(player1, winningNumber1);

        // 触发游戏开始事件
        emit GameStarted(gameNumber, player1);
    }

    // 创建一个新的游戏
    function createGame(address player1, uint256 winningNumber1) public {
        uint256 totalPool = stakeAmount * 2;
        games[nextGameNumber] = Game({
            player1: player1,
            totalPool: totalPool,
            platformFee: gameFee,
            isGameInProgress: true,
            winningNumber1: winningNumber1,
            turnNumber: 0,
            startTime: block.timestamp
        });
        nextGameNumber++;
    }

    // check game status, call by player
    function checkGameStatus() public view returns (bool, uint256) {
        address player1 = msg.sender;
        uint256 gameNumber = getPlayerGameNumber(player1);
        require(gameNumber != 0, "Player is not in any game");

        Game storage game = games[gameNumber];

        // bool isMyTurn = (game.turnNumber % 2 == 0 && player1 == game.player1) || (game.turnNumber % 2 == 1 && player1 == game.player2);
        bool isGameEnded = !game.isGameInProgress;
        uint256 remainingPool = game.totalPool;
        // uint256 roundNumber = game.turnNumber / 2 + 1; // 两个玩家轮流猜过视为一轮
        return (isGameEnded, remainingPool);
    }
    
    function guessNumber(uint256 guess) external {
        address player1 = msg.sender;
        // 根据调起函数的玩家地址，返回游戏信息
        uint256 gameNumber = getPlayerGameNumber(player1);
        require(gameNumber != 0, "Player is not in any game");

        // 获取游戏信息
        Game storage game = games[gameNumber];

        // 获取游戏状态
        (bool isGameOver, ) = checkGameStatus();

        // 确保游戏正在进行中
        require(!isGameOver, "Game is not in progress");

        // 确保猜测在有效范围内
        require(guess >= 1 && guess <= 10, "Guess is out of range");

        // 触发玩家猜测数字的事件
        emit NumberGuessed(gameNumber, player1, guess);

        // 处理玩家猜测
        if (guess == game.winningNumber1) {
            // 计算奖金和平台费用
            (uint256 winnings, uint256 platformFee) = calculateWinnings(gameNumber);
            game.platformFee = platformFee;
            game.totalPool = winnings;

            // 结算游戏
            settleGame(gameNumber, game.player1, winnings, platformFee);
    
            // 结束游戏
            game.isGameInProgress = false;
            resetGame(gameNumber);
            emit OneGameEnded(gameNumber, msg.sender, winnings);
        }
        else {
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

        uint256 currentFee = gameFee * game.turnNumber;

        // 计算平台费用
        platformFee = currentFee;

        // 计算玩家费用
        playerFee = stakeAmount * 2 - platformFee;

        return (platformFee, playerFee);
    }

    function quitGame() external {
        uint256 platformFee;
        uint256 playerFee;
        // 确定赢家和输家
        address loser = msg.sender;
        (uint gameNumber) = getPlayerGameNumber(loser);
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");

        // 计算平台费用和玩家费用
        platformFee = stakeAmount * 2;
        playerFee = 0;

        // 结算游戏
        settleGame(gameNumber, loser, playerFee, platformFee);

        // 更新游戏状态
        game.isGameInProgress = false;
        // 删除游戏
        resetGame(gameNumber);
    }


    function getPlayerGameNumber(address player1) public view returns (uint256) {
        for (uint256 i = 1; i <= nextGameNumber; i++) {
            Game storage game = games[i];
            if (game.player1 == player1) {
                return (i);
            } 
        }
        return (0); // 如果玩家不在任何游戏中，则返回 (0)
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

    // 游戏结算
    function settleGame(uint256 gameNumber, address winner, uint256 prize, uint256 platformFee) public {
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game not in progress");

        // 转移奖金给赢家
        require(token.transfer(winner, prize), "Failed to transfer winnings to winner");

        // 转移平台费用给庄家
        require(token.transfer(owner, platformFee), "Failed to transfer platform fee to platform fee receiver");
    }
}