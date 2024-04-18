'use client';
const fetchGuessResult_template = async () => {
  try {
    const response = await fetch('/api/getNum');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching guess result:', error);
    throw error;
  }
};
export const fetchGuessResult = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a random guess result
      const result = Math.random() < 0.5;
      resolve(result);
    }, 1000); // Delay of 1000ms
  }) as Promise<boolean>;
};
const fakeApi = {
  // ERC20 Token Mocks
  erc20: {
    balance: 1000,
    view_balance() {
      console.log(`Viewing balance: ${this.balance}`);
      return Promise.resolve(this.balance);
    },
    mint(amount: number) {
      this.balance += amount;
      console.log(`Minted ${amount} tokens`);
      return Promise.resolve(this.balance);
    }
  },

  // Single Player Game Mocks
  SinglePlayerGame: {
    guessedNumbers: <number[]>[],
    inGame: false,
    gameEnded: false,
    prizePool: 100,
    remainingTime: 300, // in seconds
    check_game_status() {
      return Promise.resolve({guessedNumbers:this.guessedNumbers, gameEnded:this.gameEnded,prizePool:this.prizePool});
    },
    send_guess(number: number) {
      // Simple logic to simulate sending a guess
      this.guessedNumbers.push(number);
      return Promise.resolve(`Guess ${number} received`);
    },
    is_in_game() {
      return Promise.resolve(this.inGame);
    },
    join_game() {
      this.inGame = true;
      return Promise.resolve("Joined single player game");
    },
    remaining_time() {
      return Promise.resolve(this.remainingTime);
    }
  },

  // Multi Player Game Mocks
  MultiPlayerGame: {
    inGame: false,
    myTurn: true,
    gameEnded: false,
    prizePool: 200,
    round: 1,
    guessedNumbers: <number[]>[],
    remainingTime: 500, // in seconds
    check_game_status() {
      return Promise.resolve({guessedNumbers:this.guessedNumbers, gameEnded:this.gameEnded,prizePool:this.prizePool,round:this.round,myTurn:this.myTurn});
    },
    is_in_game() {
      return Promise.resolve(this.inGame);
    },
    join_game() {
      this.inGame = true;
      this.guessedNumbers = [];
      return Promise.resolve("Joined multi player game");
    },
    remaining_time() {
      return Promise.resolve(this.remainingTime);
    },
    send_guess(number: number) {
      this.guessedNumbers.push(number);
      this.myTurn = !this.myTurn; // Toggle turn
      return Promise.resolve(`Guess ${number} received`);
    }
  }
};

export default fakeApi;