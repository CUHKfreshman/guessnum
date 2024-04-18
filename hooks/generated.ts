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

export const gncAddress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa' as const

export const gncConfig = { address: gncAddress, abi: gncAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// greeting
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const greetingAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'close',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'constructor',
    inputs: [{ name: '_greeting', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'greet',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

export const greetingAddress =
  '0xB618c63daf79128ff8578957c3130af7507009Ae' as const

export const greetingConfig = {
  address: greetingAddress,
  abi: greetingAbi,
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link greetingAbi}__
 */
export const useReadGreeting = /*#__PURE__*/ createUseReadContract({
  abi: greetingAbi,
  address: greetingAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link greetingAbi}__ and `functionName` set to `"greet"`
 */
export const useReadGreetingGreet = /*#__PURE__*/ createUseReadContract({
  abi: greetingAbi,
  address: greetingAddress,
  functionName: 'greet',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link greetingAbi}__
 */
export const useWriteGreeting = /*#__PURE__*/ createUseWriteContract({
  abi: greetingAbi,
  address: greetingAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link greetingAbi}__ and `functionName` set to `"close"`
 */
export const useWriteGreetingClose = /*#__PURE__*/ createUseWriteContract({
  abi: greetingAbi,
  address: greetingAddress,
  functionName: 'close',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link greetingAbi}__
 */
export const useSimulateGreeting = /*#__PURE__*/ createUseSimulateContract({
  abi: greetingAbi,
  address: greetingAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link greetingAbi}__ and `functionName` set to `"close"`
 */
export const useSimulateGreetingClose = /*#__PURE__*/ createUseSimulateContract(
  { abi: greetingAbi, address: greetingAddress, functionName: 'close' },
)
