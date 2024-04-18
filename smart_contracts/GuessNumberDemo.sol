// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./IERC20.sol";

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

contract GuessTheNumber {
    IERC20 public token;
    uint256 public deductionPerFail;
    uint256 public stakeAmount; // Single Stake Amount
    uint256 public hiddenNumber;
    address public owner;
    uint256 public platformFees; // Platform Fees that banker wins
    bool public gameActive;
    address public currentPlayer; // Current Player
    uint256 public totalStake; // player's and banker's total stake
    uint256 public totalDeductions; // total deductions for wrong guesses

    // mapping (address => bool) private players; for multiple players

    event GameStarted(uint256 hiddenNumber);
    event Guessed(address guesser, uint256 guess, bool correct);
    event WithdrawnPlatformFees(address owner, uint256 amount);
    event RewardClaimed(address claimer, uint256 amount);
    event PlayerExited(address player);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyCurrentPlayer() {
        require(msg.sender == currentPlayer, "Only the current player can call this function.");
        _;
    }

    constructor(address tokenAddress, uint256 _deductionPerFail, uint256 _stakeAmount) {
        token = IERC20(tokenAddress);
        deductionPerFail = _deductionPerFail;
        stakeAmount = _stakeAmount;
        owner = msg.sender;
    }

    function startGame() external onlyOwner {
        require(!gameActive, "Game is already active.");
        hiddenNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.basefee))) % 10;
        gameActive = true;
        // currentPlayer = address(0);
        platformFees = 0;
        totalStake = 2 * stakeAmount; // total stake amount is the sum of stakes of player and banker
        totalDeductions = 0;
        require(token.transferFrom(owner, address(this), stakeAmount), "Transfer failed from owner"); // transform stake form banker's account
        emit GameStarted(hiddenNumber);
    }

    function joinGame() external {
        require(gameActive, "Game is not active.");
        require(currentPlayer == address(0), "There is already a player in game."); // only one player can attend this game one time
        require(token.transferFrom(msg.sender, address(this), stakeAmount), "Player stake transfer failed");
        currentPlayer = msg.sender;
    }

    function guess(uint256 _guess) external {
        require(gameActive, "Game is not active.");
        require(msg.sender != owner, "Owner cannot guess.");
        require(msg.sender == currentPlayer, "Only Player can guess");
        require(totalStake - totalDeductions >= deductionPerFail, "Insufficient stake to continue.");

        if (_guess == hiddenNumber) {
            currentPlayer = msg.sender;
            gameActive = false;
            uint256 reward = totalStake - totalDeductions; // 扣除累积扣除后的剩余总赌注
            require(token.transfer(currentPlayer, reward), "Reward transfer failed");
            emit RewardClaimed(currentPlayer, reward);
        } else {
            totalDeductions += deductionPerFail;
            platformFees += deductionPerFail;
            emit Guessed(msg.sender, _guess, false);
            if (totalStake - totalDeductions < deductionPerFail) {
                gameActive = false; // 扣除后剩余赌注不足以支付下一次扣除，结束游戏
            }
        }
    }

    function exitGame() external onlyCurrentPlayer {
        require(gameActive, "Game is not active.");
        
        platformFees = totalStake; // if player exit before game ends, all stake is belong to owner
        gameActive = false;
        emit PlayerExited(currentPlayer);
        currentPlayer = address(0); // 重置玩家状态
    }

    function withdrawPlatformFees() external onlyOwner {
        require(platformFees > 0, "No fees to withdraw");
        require(token.transfer(owner, platformFees), "Transfer failed");
        emit WithdrawnPlatformFees(owner, platformFees);
        platformFees = 0; // Reset the platform fees
    }
}
