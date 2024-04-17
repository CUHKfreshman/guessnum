
import type { Abi } from 'viem'
export const greetingsAbi: Abi= [{ "inputs": [], "name": "close", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_greeting", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "greet", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }]