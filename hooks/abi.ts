
import type { Abi } from 'viem';
import GNC_ABI from "@/public/GNC_ABI.json";
import SinglePlayerGame from '@/public/SinglePlayerGame_ABI.json';
import MultiPlayerGame from '@/public/MultiPlayerGame_ABI.json';
import MatchMaking from '@/public/MatchMaking_ABI.json';
export const greetingsAbi: Abi= [{ "inputs": [], "name": "close", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_greeting", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "greet", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }]
export const GNCAbi: Abi = JSON.parse(JSON.stringify(GNC_ABI)); // This is a workaround for a bug in the plugin
export const SinglePlayerGameAbi: Abi = JSON.parse(JSON.stringify(SinglePlayerGame)); // This is a workaround for a bug in the plugin
export const MultiPlayerGameAbi: Abi = JSON.parse(JSON.stringify(MultiPlayerGame)); // This is a workaround for a bug in the plugin
export const MatchMakingAbi: Abi = JSON.parse(JSON.stringify(MatchMaking)); // This is a workaround for a bug in the plugin