// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "./IERC20.sol";

contract GuessNumberSinglePlayer {
    IERC20 public token;
    address public owner; 
    uint256 public constant stakeAmount = 10; // player stake 10 tokens, game contract stake 10 tokens
    uint256 public constant gameFee = 2;  // this is the charge for each wrong guess (per-round fee)
    uint256 public constant tokenAmount = 1; // deprecated, set to 1 so no impact


    struct Game {
        address player1;
        uint256 turnNumber;
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
    event NumberGuessed(uint256 indexed gameNumber, address indexed player, uint256 number, bool isGameEnded); // 玩家猜测数字的事件

    constructor(address _token) {
        token = IERC20(_token);
        owner = msg.sender; // set contract owner 设置合约的所有者为部署者的地址（庄家）
    }

    function startGame(uint256 seed) external {
        address player1 = msg.sender;
        (uint gameNumber) = getPlayerGameNumber(player1);
        // requires the msg sender has joined a room (i.e. the room number != 0)
        // 检查是否已经在游戏中
        require(gameNumber == 0, "Player is already in a game");
        // requires the player has sufficient token balance
        // 检查是否有足够的代币
        require(token.transferFrom(msg.sender, address(this), stakeAmount * tokenAmount), "Failed to transfer tokens");
        require(token.transferFrom(owner, address(this), stakeAmount * tokenAmount), "Failed to transfer tokens");

        // generate a random number from 0 to 9
        // 生成随机数
        bytes32 hash = keccak256(abi.encodePacked(block.timestamp, msg.sender, seed));
        uint256 winningNumber1 = uint256(hash) % 10;

        // create a game
        // 创建游戏
        createGame(player1, winningNumber1);
        emit GameStarted(gameNumber, player1);
    }

    // create a new game
    // 创建一个新的游戏
    function createGame(address player1, uint256 winningNumber1) private {
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

    // function to check game status after making a guess
    function checkGameStatus() public view returns (bool, uint256) {
        address player1 = msg.sender;
        uint256 gameNumber = getPlayerGameNumber(player1);
        bool isGameEnded = false;
        uint256 remainingPool = 0;
        if(gameNumber == 0){
            isGameEnded = true;
        }
        else{
            Game storage game = games[gameNumber];
            remainingPool = game.totalPool;
            isGameEnded = !game.isGameInProgress;
        }

        return (isGameEnded, remainingPool);
    }
    
    function guessNumber(uint256 guess) external returns (bool) {
        address player1 = msg.sender;
        // get game ID based on player addr
        // 根据调起函数的玩家地址，返回游戏信息
        uint256 gameNumber = getPlayerGameNumber(player1);
        require(gameNumber != 0, "Player is not in any game");

        // get game info based on ID
        // 获取游戏信息
        Game storage game = games[gameNumber];

        // get game status
        // 获取游戏状态
        (bool isGameOver, ) = checkGameStatus();

        // requires game in progress
        // 确保游戏正在进行中
        require(!isGameOver, "Game is not in progress");

        // ensure the guess is in range 0 - 9
        // 确保猜测在有效范围内
        require(guess >= 0 && guess <= 9, "Guess is out of range");
        bool isGameEnded = false;

        // check player's guess
        // 处理玩家猜测
        if (guess == game.winningNumber1) {
            // logic when the guess is right
            // calculate final platform fees and tokens left for player
            // 计算奖金和平台费用
            (uint256 winnings, uint256 platformFee) = calculateWinnings(gameNumber);
            game.platformFee = platformFee;
            game.totalPool = winnings;

            // tranfer tokens to contract owner and player
            // 结算游戏
            settleGame(gameNumber, game.player1, winnings, platformFee);
            
            // game ends
            // 结束游戏
            game.isGameInProgress = false;
            //resetGame(gameNumber);
            emit OneGameEnded(gameNumber, msg.sender, winnings);
            isGameEnded = true;
        }
        else {
            // logic when the guess is right
            // increase turn count
            // 如果没有猜中，增加轮数
            game.turnNumber++;

            // calculate current turn's platform fees and tokens left for player
            // 计算平台费用
            (uint256 platformFee, uint256 winnings) = calculateWinnings(gameNumber);
            game.platformFee = platformFee;
            game.totalPool = winnings;
        }

        emit NumberGuessed(gameNumber, player1, guess, isGameEnded);
        return isGameEnded;
    }

    // reset game and delete it from mapping
    // 重置游戏
    function resetGame(uint256 gameNumber) internal {
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");
        delete games[gameNumber];
    }

    function calculateWinnings(uint256 gameNumber) public view returns (uint256 platformFee, uint256 playerFee) {
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");

        uint256 currentFee = gameFee * game.turnNumber;

        // platform fee = per-round fee * round count 
        // 计算平台费用
        platformFee = currentFee;

        // tokens left for player
        // 计算玩家费用
        playerFee = stakeAmount * 2 - platformFee;

        return (platformFee, playerFee);
    }

    function quitGame() external {
        uint256 platformFee;
        uint256 playerFee;
        // player will lose all tokens when he/she quits the game halfway
        address loser = msg.sender;
        (uint gameNumber) = getPlayerGameNumber(loser);
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");

        // calculate final platform fees and tokens left for player
        // 计算平台费用和玩家费用
        platformFee = stakeAmount * 2;
        playerFee = 0;

        // tranfer tokens to contract owner and player
        // 结算游戏
        settleGame(gameNumber, loser, playerFee, platformFee);

        // update game info
        // 更新游戏状态
        game.isGameInProgress = false;
        // 删除游戏
        //resetGame(gameNumber);
    }


    function getPlayerGameNumber(address player1) public view returns (uint256) {
        for (uint256 i = nextGameNumber; i > 0; i--) {
            Game storage game = games[i];
            if (game.player1 == player1 && game.isGameInProgress) {
                return (i);
            } 
        }
        // returns (0) if player not in any game
        // 如果玩家不在任何游戏中，则返回 (0)
        return (0); 
    }

    function isGameTimeout(uint256 gameNumber) public view returns (bool) {
        Game storage game = games[gameNumber];

        // // game will time out in 10 minutes if not finished
        // 如果当前时间超过游戏开始时间加上十分钟，那么游戏就超时了
        return block.timestamp > game.startTime + 10 minutes;
    }


    function remainingTime(uint256 gameNumber) public view returns (uint256) {
        Game storage game = games[gameNumber];

        // calculate time left of an on-going game
        // 计算游戏剩余的时间
        uint256 endTime = game.startTime + 10 minutes;
        if (block.timestamp >= endTime) {
            // 0 if game already timed out
            // 如果当前时间已经超过游戏的结束时间，那么剩余时间就是0
            return 0;
        } else {
            // otherwise time left = end time - current time
            // 否则，剩余时间就是结束时间减去当前时间
            return endTime - block.timestamp; // seconds
        }
    }

    // transfer tokens back to game contract owner and player when game ends
    // 游戏结算
    function settleGame(uint256 gameNumber, address winner, uint256 prize, uint256 platformFee) internal {
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game not in progress");

        require(token.transfer(winner, prize), "Failed to transfer winnings to winner");

        require(token.transfer(owner, platformFee), "Failed to transfer platform fee to platform fee receiver");
    }
}