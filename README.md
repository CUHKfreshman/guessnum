# Guessnum

__Guessnum__ is a decentralized application (dApp) for a number guessing game, developed as a part of the FT5004 course at the National University of Singapore (NUS). The project utilizes Next.js and Solidity, with a frontend styled using TailwindCSS and Shadcn. Web3 functionalities are implemented using RainbowKit, wagmi, and viem. It runs on Klaytn Baobab Testnet only.

## Table of Contents

- [Guessnum](#guessnum)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Installation and Setup](#installation-and-setup)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
    - [Running the Development Server](#running-the-development-server)
  - [Main Functions](#main-functions)
  - [Disclaimer](#disclaimer)

## Project Overview

The dApp demonstrates the use of blockchain in gaming, specifically for a number guessing game mechanics. It is designed for educational purposes to showcase the application of blockchain technology.

## Installation and Setup

### Prerequisites

Ensure Node.js and npm are installed.

### Installation Steps

1. Clone the repository and navigate into the directory:
   ```bash
   git clone https://github.com/CUHKfreshman/guessnum.git
   cd guessnum
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Launch the development server:
```bash
npm run dev
```
Access the dApp via `http://localhost:3000`.

## Main Functions

- `joinGame()` allows users to join an existing game.
- `startGame()` initiates the game after required checks and generates a winning number.
- `createGame(uint roomNumber, address player1, address player2, uint winningNumber1, uint winningNumber2)` sets up a new game instance.
- `checkGameStatus()` provides information on the current round, turn, game end status,and numbers attempted.
- `guessNumber(uint guess)` allows players to submit their guesses.
- `resetGame(uint gameNumber)` resets a specific game.
- `calculateWinnings(uint256 gameNumber)` determines the fees and prizes based on player's guess in each stage of a game.
- `quitGame()` allows players to exit the game.
- `settleGame()` transfers tokens from the contract to the respective players and host.
- `findAvailableRoom()` search for an available room, or create a new room if no room is available.
- `isGameTimeout(uint256 gameID)` to ensure games do not exceed the set time limit of 10 minutes per game (2 rounds).
- `remainingTime(uint256 gameID)` to check the time left in the current game.

## Disclaimer

This project is intended solely for educational use within FT5004 at National University of Singapore.