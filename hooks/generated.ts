import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GNC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gncAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_decimals', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AccountFrozen',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AccountUnfrozen',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'freezeAccount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'unfreezeAccount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'isAccountFrozen',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

export const gncAddress = '0x34A64c640eC0e9fBbb70E3dB966DfF57Ad579193' as const

export const gncConfig = { address: gncAddress, abi: gncAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiPlayerGame
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multiPlayerGameAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'roomNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'player1', internalType: 'address', type: 'address' },
      { name: 'player2', internalType: 'address', type: 'address' },
      { name: 'winningNumber1', internalType: 'uint256', type: 'uint256' },
      { name: 'winningNumber2', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'constructor',
    inputs: [
      { name: '_matchmakingAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'roomNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'GameFinished',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'roomNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'player1',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'player2',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GameStarted',
  },
  {
    type: 'function',
    inputs: [{ name: 'guess', internalType: 'uint256', type: 'uint256' }],
    name: 'guessNumber',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameID',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'number',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NumberGuessed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'winner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'winnings',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OneGameEnded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'quitGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'resetGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'calculateWinnings',
    outputs: [
      { name: 'platformFee', internalType: 'uint256', type: 'uint256' },
      { name: 'playerFee', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'checkGameStatus',
    outputs: [
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'gameFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'games',
    outputs: [
      { name: 'roomNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'player1', internalType: 'address', type: 'address' },
      { name: 'player2', internalType: 'address', type: 'address' },
      { name: 'roundNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'turnNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'totalPool', internalType: 'uint256', type: 'uint256' },
      { name: 'platformFee', internalType: 'uint256', type: 'uint256' },
      { name: 'winner', internalType: 'address', type: 'address' },
      { name: 'isGameInProgress', internalType: 'bool', type: 'bool' },
      { name: 'winningNumber1', internalType: 'uint256', type: 'uint256' },
      { name: 'winningNumber2', internalType: 'uint256', type: 'uint256' },
      { name: 'starter', internalType: 'address', type: 'address' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'player1', internalType: 'address', type: 'address' }],
    name: 'getPlayerGameNumber',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'hasGuessed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameID', internalType: 'uint256', type: 'uint256' }],
    name: 'isGameTimeout',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'matchmaking',
    outputs: [
      { name: '', internalType: 'contract RandomMatchmaking', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextGameNumber',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameID', internalType: 'uint256', type: 'uint256' }],
    name: 'remainingTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

export const multiPlayerGameAddress =
  '0x0eF50afB3Bf0274e71530108b13CC854Dd63279c' as const

export const multiPlayerGameConfig = {
  address: multiPlayerGameAddress,
  abi: multiPlayerGameAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SinglePlayerGame
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const singlePlayerGameAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'player1',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GameStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'number',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'isGameEnded',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'NumberGuessed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'gameNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'winner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'winnings',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OneGameEnded',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'calculateWinnings',
    outputs: [
      { name: 'platformFee', internalType: 'uint256', type: 'uint256' },
      { name: 'playerFee', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'checkGameStatus',
    outputs: [
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'gameFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'games',
    outputs: [
      { name: 'player1', internalType: 'address', type: 'address' },
      { name: 'turnNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'totalPool', internalType: 'uint256', type: 'uint256' },
      { name: 'platformFee', internalType: 'uint256', type: 'uint256' },
      { name: 'isGameInProgress', internalType: 'bool', type: 'bool' },
      { name: 'winningNumber1', internalType: 'uint256', type: 'uint256' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'player1', internalType: 'address', type: 'address' }],
    name: 'getPlayerGameNumber',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'guess', internalType: 'uint256', type: 'uint256' }],
    name: 'guessNumber',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'isGameTimeout',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextGameNumber',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'quitGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'remainingTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'gameNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'resetGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'gameNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'winner', internalType: 'address', type: 'address' },
      { name: 'prize', internalType: 'uint256', type: 'uint256' },
      { name: 'platformFee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'settleGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'seed', internalType: 'uint256', type: 'uint256' }],
    name: 'startGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

export const singlePlayerGameAddress =
  '0x8EF365921E38d880341bAadB8b998ED6003d95CB' as const

export const singlePlayerGameConfig = {
  address: singlePlayerGameAddress,
  abi: singlePlayerGameAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gncAbi}__
 */
export const useReadGnc = /*#__PURE__*/ createUseReadContract({
  abi: gncAbi,
  address: gncAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadGncAllowance = /*#__PURE__*/ createUseReadContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadGncBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadGncDecimals = /*#__PURE__*/ createUseReadContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"isAccountFrozen"`
 */
export const useReadGncIsAccountFrozen = /*#__PURE__*/ createUseReadContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'isAccountFrozen',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"name"`
 */
export const useReadGncName = /*#__PURE__*/ createUseReadContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadGncSymbol = /*#__PURE__*/ createUseReadContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadGncTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gncAbi}__
 */
export const useWriteGnc = /*#__PURE__*/ createUseWriteContract({
  abi: gncAbi,
  address: gncAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteGncApprove = /*#__PURE__*/ createUseWriteContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteGncBurn = /*#__PURE__*/ createUseWriteContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"buy"`
 */
export const useWriteGncBuy = /*#__PURE__*/ createUseWriteContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"freezeAccount"`
 */
export const useWriteGncFreezeAccount = /*#__PURE__*/ createUseWriteContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'freezeAccount',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteGncMint = /*#__PURE__*/ createUseWriteContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteGncTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteGncTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"unfreezeAccount"`
 */
export const useWriteGncUnfreezeAccount = /*#__PURE__*/ createUseWriteContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'unfreezeAccount',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gncAbi}__
 */
export const useSimulateGnc = /*#__PURE__*/ createUseSimulateContract({
  abi: gncAbi,
  address: gncAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateGncApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateGncBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"buy"`
 */
export const useSimulateGncBuy = /*#__PURE__*/ createUseSimulateContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"freezeAccount"`
 */
export const useSimulateGncFreezeAccount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gncAbi,
    address: gncAddress,
    functionName: 'freezeAccount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateGncMint = /*#__PURE__*/ createUseSimulateContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateGncTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: gncAbi,
  address: gncAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateGncTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gncAbi,
    address: gncAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gncAbi}__ and `functionName` set to `"unfreezeAccount"`
 */
export const useSimulateGncUnfreezeAccount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gncAbi,
    address: gncAddress,
    functionName: 'unfreezeAccount',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gncAbi}__
 */
export const useWatchGncEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: gncAbi,
  address: gncAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gncAbi}__ and `eventName` set to `"AccountFrozen"`
 */
export const useWatchGncAccountFrozenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gncAbi,
    address: gncAddress,
    eventName: 'AccountFrozen',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gncAbi}__ and `eventName` set to `"AccountUnfrozen"`
 */
export const useWatchGncAccountUnfrozenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gncAbi,
    address: gncAddress,
    eventName: 'AccountUnfrozen',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gncAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchGncApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gncAbi,
    address: gncAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gncAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchGncTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gncAbi,
    address: gncAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__
 */
export const useReadMultiPlayerGame = /*#__PURE__*/ createUseReadContract({
  abi: multiPlayerGameAbi,
  address: multiPlayerGameAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"calculateWinnings"`
 */
export const useReadMultiPlayerGameCalculateWinnings =
  /*#__PURE__*/ createUseReadContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'calculateWinnings',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"checkGameStatus"`
 */
export const useReadMultiPlayerGameCheckGameStatus =
  /*#__PURE__*/ createUseReadContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'checkGameStatus',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"gameFee"`
 */
export const useReadMultiPlayerGameGameFee =
  /*#__PURE__*/ createUseReadContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'gameFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"games"`
 */
export const useReadMultiPlayerGameGames = /*#__PURE__*/ createUseReadContract({
  abi: multiPlayerGameAbi,
  address: multiPlayerGameAddress,
  functionName: 'games',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"getPlayerGameNumber"`
 */
export const useReadMultiPlayerGameGetPlayerGameNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'getPlayerGameNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"hasGuessed"`
 */
export const useReadMultiPlayerGameHasGuessed =
  /*#__PURE__*/ createUseReadContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'hasGuessed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"isGameTimeout"`
 */
export const useReadMultiPlayerGameIsGameTimeout =
  /*#__PURE__*/ createUseReadContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'isGameTimeout',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"matchmaking"`
 */
export const useReadMultiPlayerGameMatchmaking =
  /*#__PURE__*/ createUseReadContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'matchmaking',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"nextGameNumber"`
 */
export const useReadMultiPlayerGameNextGameNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'nextGameNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMultiPlayerGameOwner = /*#__PURE__*/ createUseReadContract({
  abi: multiPlayerGameAbi,
  address: multiPlayerGameAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"remainingTime"`
 */
export const useReadMultiPlayerGameRemainingTime =
  /*#__PURE__*/ createUseReadContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'remainingTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"stakeAmount"`
 */
export const useReadMultiPlayerGameStakeAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'stakeAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiPlayerGameAbi}__
 */
export const useWriteMultiPlayerGame = /*#__PURE__*/ createUseWriteContract({
  abi: multiPlayerGameAbi,
  address: multiPlayerGameAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"createGame"`
 */
export const useWriteMultiPlayerGameCreateGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'createGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"guessNumber"`
 */
export const useWriteMultiPlayerGameGuessNumber =
  /*#__PURE__*/ createUseWriteContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'guessNumber',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"quitGame"`
 */
export const useWriteMultiPlayerGameQuitGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'quitGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"resetGame"`
 */
export const useWriteMultiPlayerGameResetGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'resetGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"startGame"`
 */
export const useWriteMultiPlayerGameStartGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'startGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiPlayerGameAbi}__
 */
export const useSimulateMultiPlayerGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"createGame"`
 */
export const useSimulateMultiPlayerGameCreateGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'createGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"guessNumber"`
 */
export const useSimulateMultiPlayerGameGuessNumber =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'guessNumber',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"quitGame"`
 */
export const useSimulateMultiPlayerGameQuitGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'quitGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"resetGame"`
 */
export const useSimulateMultiPlayerGameResetGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'resetGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `functionName` set to `"startGame"`
 */
export const useSimulateMultiPlayerGameStartGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    functionName: 'startGame',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multiPlayerGameAbi}__
 */
export const useWatchMultiPlayerGameEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `eventName` set to `"GameFinished"`
 */
export const useWatchMultiPlayerGameGameFinishedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    eventName: 'GameFinished',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `eventName` set to `"GameStarted"`
 */
export const useWatchMultiPlayerGameGameStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    eventName: 'GameStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `eventName` set to `"NumberGuessed"`
 */
export const useWatchMultiPlayerGameNumberGuessedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    eventName: 'NumberGuessed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link multiPlayerGameAbi}__ and `eventName` set to `"OneGameEnded"`
 */
export const useWatchMultiPlayerGameOneGameEndedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: multiPlayerGameAbi,
    address: multiPlayerGameAddress,
    eventName: 'OneGameEnded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__
 */
export const useReadSinglePlayerGame = /*#__PURE__*/ createUseReadContract({
  abi: singlePlayerGameAbi,
  address: singlePlayerGameAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"calculateWinnings"`
 */
export const useReadSinglePlayerGameCalculateWinnings =
  /*#__PURE__*/ createUseReadContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'calculateWinnings',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"checkGameStatus"`
 */
export const useReadSinglePlayerGameCheckGameStatus =
  /*#__PURE__*/ createUseReadContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'checkGameStatus',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"gameFee"`
 */
export const useReadSinglePlayerGameGameFee =
  /*#__PURE__*/ createUseReadContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'gameFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"games"`
 */
export const useReadSinglePlayerGameGames = /*#__PURE__*/ createUseReadContract(
  {
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'games',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"getPlayerGameNumber"`
 */
export const useReadSinglePlayerGameGetPlayerGameNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'getPlayerGameNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"isGameTimeout"`
 */
export const useReadSinglePlayerGameIsGameTimeout =
  /*#__PURE__*/ createUseReadContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'isGameTimeout',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"nextGameNumber"`
 */
export const useReadSinglePlayerGameNextGameNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'nextGameNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"owner"`
 */
export const useReadSinglePlayerGameOwner = /*#__PURE__*/ createUseReadContract(
  {
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'owner',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"remainingTime"`
 */
export const useReadSinglePlayerGameRemainingTime =
  /*#__PURE__*/ createUseReadContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'remainingTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"stakeAmount"`
 */
export const useReadSinglePlayerGameStakeAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'stakeAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"token"`
 */
export const useReadSinglePlayerGameToken = /*#__PURE__*/ createUseReadContract(
  {
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'token',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"tokenAmount"`
 */
export const useReadSinglePlayerGameTokenAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'tokenAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link singlePlayerGameAbi}__
 */
export const useWriteSinglePlayerGame = /*#__PURE__*/ createUseWriteContract({
  abi: singlePlayerGameAbi,
  address: singlePlayerGameAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"guessNumber"`
 */
export const useWriteSinglePlayerGameGuessNumber =
  /*#__PURE__*/ createUseWriteContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'guessNumber',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"quitGame"`
 */
export const useWriteSinglePlayerGameQuitGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'quitGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"resetGame"`
 */
export const useWriteSinglePlayerGameResetGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'resetGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"settleGame"`
 */
export const useWriteSinglePlayerGameSettleGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'settleGame',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"startGame"`
 */
export const useWriteSinglePlayerGameStartGame =
  /*#__PURE__*/ createUseWriteContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'startGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link singlePlayerGameAbi}__
 */
export const useSimulateSinglePlayerGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"guessNumber"`
 */
export const useSimulateSinglePlayerGameGuessNumber =
  /*#__PURE__*/ createUseSimulateContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'guessNumber',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"quitGame"`
 */
export const useSimulateSinglePlayerGameQuitGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'quitGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"resetGame"`
 */
export const useSimulateSinglePlayerGameResetGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'resetGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"settleGame"`
 */
export const useSimulateSinglePlayerGameSettleGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'settleGame',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `functionName` set to `"startGame"`
 */
export const useSimulateSinglePlayerGameStartGame =
  /*#__PURE__*/ createUseSimulateContract({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    functionName: 'startGame',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link singlePlayerGameAbi}__
 */
export const useWatchSinglePlayerGameEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `eventName` set to `"GameStarted"`
 */
export const useWatchSinglePlayerGameGameStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    eventName: 'GameStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `eventName` set to `"NumberGuessed"`
 */
export const useWatchSinglePlayerGameNumberGuessedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    eventName: 'NumberGuessed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link singlePlayerGameAbi}__ and `eventName` set to `"OneGameEnded"`
 */
export const useWatchSinglePlayerGameOneGameEndedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: singlePlayerGameAbi,
    address: singlePlayerGameAddress,
    eventName: 'OneGameEnded',
  })
