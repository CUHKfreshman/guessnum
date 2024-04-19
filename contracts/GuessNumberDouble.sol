// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "./RandomMatchmaking.sol";  // 引入 RandomMatchmaking 合约
import "./IERC20.sol";


// multiple inheritance
contract GuessNumberGame {
    RandomMatchmaking public matchmaking;
    address public owner;
    // tokens needed for a player to join the game (10 x 2 rounds)
    // 每个玩家的赌注数量, 也是每局游戏的赌注
    uint256 public constant stakeAmount = 20;
    // initial fee for each round 
    // 游戏启动费，每局1个token
    uint256 public gameFee = 1;


    struct Game {
        // when 2 players are paired for a game, conceptually they are in one room
        uint256 roomNumber;
        address player1;
        address player2;
        // each game has 2 rounds: round 1 (player1 guesses first) and round 2 (player2 gesses first)
        // 记录游戏的进行的局数， 1/2
        uint256 roundNumber;
        // keep track of # of turns in one round
        // 记录玩家猜测的轮数
        uint256 turnNumber;
        uint256 totalPool;
        uint256 platformFee;
        address winner;
        bool isGameInProgress;
        uint256 winningNumber1;
        uint256 winningNumber2;
        uint256 startTime;
        // the last guess made by player
        // 最近猜测的数字
        uint256 mostRecentGuessedNumber; 
        // whether round 1 ended (game status checker for frontend)
        // 第一局游戏是否结束
        bool isRoundend; 
    }

    mapping(uint256 => Game) public games;
    uint256 public nextGameNumber = 1;

    event GameStarted(uint256 indexed roomNumber, address indexed player1,  address indexed player2);
    event OneGameEnded(uint256 indexed gameNumber, address indexed winner, uint256 winnings); // event when a round (1 or 2) ends 一局游戏结束的事件
    event GameFinished(uint256 indexed gameNumber, uint256 roomNumber); // event when game ends (after 2 rounds end) 一次游戏，两局都结束的事件
    event NumberGuessed(uint256 indexed gameID, address indexed player, uint256 number);

    constructor(address _matchmakingAddress) {
        matchmaking = RandomMatchmaking(_matchmakingAddress);
        owner = msg.sender; // set contract owner 设置合约的所有者为部署者的地址（庄家）
    }

    function startGame() external {
        address player1 = msg.sender;
        (uint256 roomNumber, address player2, uint256 winningNumber1, uint256 winningNumber2) = matchmaking.getPlayerRoomNumber(msg.sender);
        // requires the msg sender has joined a room (i.e. the room number != 0)
        // 确保调用者已经加入了一个房间
        require(roomNumber != 0, "Player is not in any room");

        // requires there are 2 players in the room
        // 确保房间已经有两名玩家加入
        require(player2 != address(0), "Room is not full");
        
        (uint gameNumber, ) = getPlayerGameNumber(player1);
        if (gameNumber != 0){
            Game storage game = games[gameNumber];
            // requires player not in another started game
            // 检查是否已经在游戏中
            require(!game.isGameInProgress, "Player is already in a game");
        }

        // create a new game when all checks pass
        createGame(roomNumber, player1, player2, winningNumber1, winningNumber2);
        
        emit GameStarted(roomNumber, player1, player2);
    }

    function createGame(uint256 roomNumber, address player1, address player2, uint256 winningNumber1, uint256 winningNumber2) private {
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
            startTime: block.timestamp,
            mostRecentGuessedNumber: 10,
            isRoundend: false
        });
        nextGameNumber++;
    }

    // function to check game status after player making a guess
    function checkGameStatus() public view returns (bool, bool, uint256, uint256, uint256, bool){
        address player1 = msg.sender;
        (uint256 gameNumber, ) = getPlayerGameNumber(player1);
        require(gameNumber != 0, "Player is not in any game");

        Game storage game = games[gameNumber];

        bool isMyTurn;
        if (game.roundNumber == 1) {
            // player 1 guesses first in round 1
            // 在第一局游戏中，player1 是先手
            isMyTurn = (game.turnNumber % 2 == 0 && player1 == game.player1) || (game.turnNumber % 2 == 1 && player1 == game.player2);
        } else {
            // player 2 guesses first in round 2
            // 在第二局游戏中，player2 是先手
            isMyTurn = (game.turnNumber % 2 == 0 && player1 == game.player2) || (game.turnNumber % 2 == 1 && player1 == game.player1);
        }
        
        bool isGameEnded = !game.isGameInProgress;
        uint256 remainingPool = game.totalPool;
        uint256 roundNumber = game.roundNumber;
        uint256 mostRecentGuessedNumber = game.mostRecentGuessedNumber;
        bool isRoundend = game.isRoundend;
        return (isMyTurn, isGameEnded, remainingPool, roundNumber, mostRecentGuessedNumber, isRoundend);
    }
    
    function guessNumber(uint256 guess) external {
        address player1 = msg.sender;
        // get game ID based on player addr
        // 根据调起函数的玩家地址，返回游戏信息
        (uint256 gameNumber, ) = getPlayerGameNumber(player1);
        require(gameNumber != 0, "Player is not in any game");

        // get game info based on ID
        // 获取游戏信息
        Game storage game = games[gameNumber];

        // get game status
        // 获取游戏状态
        (bool isMyTurn, bool isGameOver, uint256 remianingPool, uint256 roundNumber, uint256 mostRecentGuessedNumber, bool isRound1end) = checkGameStatus();

        // requires game in progress
        // 确保游戏正在进行中
        require(!isGameOver, "Game is not in progress");

        // ensures that player1/2 can't make a guess in player2/1's turn
        // 确保猜测者是当前回合的玩家
        require(isMyTurn, "It's not your turn");

        // ensure the guess is in range 0 - 9
        // 确保猜测在有效范围内
        require(guess >= 0 && guess <= 9, "Guess is out of range");

        // discard flag ("Round 1 ended") when round 2 starts
        // 如果第二局游戏开始，第一局游戏结束，改变isRoundend状态
        if (roundNumber == 2 && isRound1end == true) {
            game.isRoundend = false;
        }

        // update the most recent guessed number
        // 更新最近猜测的数字
        game.mostRecentGuessedNumber = guess;

        // mark the current player as "guessed"
        // 标记玩家已经猜过
        // hasGuessed[gameNumber][msg.sender] = true;

        // 触发玩家猜测数字的事件
        emit NumberGuessed(gameNumber, player1, guess);

        // check player's guess
        // 处理玩家猜测
        if ((roundNumber == 1 && guess == game.winningNumber1) || (roundNumber == 2 && guess == game.winningNumber2)) {
            // logic when the guess is right
            // 处理正确猜测的逻辑
            game.winner = player1;
            // calculate final platform fees and prizes for winner
            // 计算奖金和平台费用
            (uint256 winnings, uint256 platformFee) = calculateWinnings(gameNumber);
            game.platformFee = platformFee;
            game.totalPool = winnings;

            // tranfer tokens to contract owner and winner at round end or game end
            // 结算游戏
            matchmaking.settleGame(game.roomNumber, game.winner, winnings, owner, platformFee);
    
            // round 1 ends, increase roundNumber and reset related fields
            // 如果是第一局，增加轮数并重置玩家的猜测状态
            if (game.roundNumber == 1) {
                game.roundNumber++;
                game.turnNumber = 0;
                game.isRoundend = true; // Round 1 ends 第一局结束

                game.platformFee = gameFee;
                game.totalPool = stakeAmount;
                
                emit OneGameEnded(gameNumber, msg.sender, winnings);
            } else {
                // round 2 ends
                game.isRoundend = true; // 第二局结束
                // game ends after 2 rounds end
                // 如果是第二局，结束游戏
                game.isGameInProgress = false;
                uint roomNumber = game.roomNumber;
                // reset the room when game ends
                matchmaking.resetRoom(roomNumber);
                
                emit OneGameEnded(gameNumber, msg.sender, winnings);
                emit GameFinished(gameNumber, roomNumber);
            }

        } else {
            // logic when the guess is right
            // 如果没有猜中，增加轮数
            game.turnNumber++;
            // calculate current turn's platform fees and prizes for winner
            // 计算平台费用
            (uint256 winnings, uint256 platformFee) = calculateWinnings(gameNumber);
            game.platformFee = platformFee;
            game.totalPool = winnings;
        }
    }

    // 重置游戏
    // function resetGame(uint256 gameNumber) public  {
    //     Game storage game = games[gameNumber];
    //     require(game.isGameInProgress, "Game is not in progress");

    //     // 清空游戏数据
        
    // }

    function calculateWinnings(uint256 gameNumber) public view returns (uint256 platformFee, uint256 playerFee) {
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");

        uint256 currentFee;
        if (game.turnNumber <= 2) {
            currentFee = 1;
        } else if (game.turnNumber <= 6) {
            currentFee = 2;
        } else {
            currentFee = 3;
        }

        // platform fee = initial game fee (fixed) + round-based charge
        // 计算平台费用
        platformFee = gameFee + currentFee;
        // tokens left are prizes to winner
        // 计算玩家费用
        playerFee = stakeAmount - platformFee;

        return (platformFee, playerFee);
    }

    function quitGame() external {
        uint256 platformFee;
        uint256 playerFee;
        // when a player quits halfway, it loses
        // 确定赢家和输家
        address loser = msg.sender;
        (uint gameNumber, address winner) = getPlayerGameNumber(loser);
        Game storage game = games[gameNumber];
        require(game.isGameInProgress, "Game is not in progress");

        // calculate final platform fees and prizes for winner
        // 计算平台费用和玩家费用
        if (game.roundNumber == 1) {
            platformFee = game.platformFee + gameFee;
            playerFee = game.totalPool + stakeAmount - gameFee;
        } else if (game.roundNumber == 2) {
            platformFee = game.platformFee;
            playerFee = game.totalPool;
        }
        // tranfer tokens to contract owner and winner at round end or game end
        // 结算游戏
        matchmaking.settleGame(gameNumber, winner, playerFee, owner, platformFee);

        // update game info
        // 更新游戏状态
        game.winner = winner;
        game.isGameInProgress = false;
        uint256 roomNumber = game.roomNumber;

        // 删除游戏
        // resetGame(gameNumber);

        // reset the room
        matchmaking.resetRoom(roomNumber);
        emit OneGameEnded(gameNumber, winner, playerFee);
        emit GameFinished(gameNumber, roomNumber);
    }


    function getPlayerGameNumber(address player1) public view returns (uint256, address) {
        for (uint256 i = nextGameNumber; i >= 1; i--) {
            Game storage game = games[i];
            if (game.player1 == player1) {
                return (i, game.player2);
            } else if (game.player2 == player1){
                return (i, game.player1);
            }
        }
        return (0, address(0)); // 如果玩家不在任何房间中，则返回 (0, address(0))
    }

    function isGameTimeout(uint256 gameID) public view returns (bool) {
        Game storage game = games[gameID];

        // game will time out in 10 minutes if not finished
        // 如果当前时间超过游戏开始时间加上十分钟，那么游戏就超时了
        return block.timestamp > game.startTime + 10 minutes;
    }


    // calculate time left of an on-going game
    // 计算游戏剩余的时间
    function remainingTime(uint256 gameID) public view returns (uint256) {
        Game storage game = games[gameID];

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
}