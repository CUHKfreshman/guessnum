import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
} from 'wagmi/codegen'

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
