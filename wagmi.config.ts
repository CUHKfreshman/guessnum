import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { greetingsAbi, GNCAbi, MultiPlayerGameAbi, SinglePlayerGameAbi, MatchMakingAbi } from '@/hooks/abi'
export default defineConfig({
  out: 'hooks/generated.ts',
  contracts: [
    // {
    //   name: 'greeting',
    //   address: "0xB618c63daf79128ff8578957c3130af7507009Ae",
    //   abi: greetingsAbi,
    // },
    {
      name: 'GNC',
      address: "0x34A64c640eC0e9fBbb70E3dB966DfF57Ad579193",
      abi: GNCAbi,
    },
    {
      name: 'SinglePlayerGame',
      address: "0xb7056D6e9D6BC32352043aFB8ECeFC998E8870c6",
      abi: SinglePlayerGameAbi,
    },
    {
      name: 'MultiPlayerGame',
      address: "0x2809eA978ed00E5321a45814d7CcE565Cbeb4F44",
      abi: MultiPlayerGameAbi,
    },
    {
      name: 'MatchMaking',
      address: "0x22fFd8E4a4a819406f4A2767B49261E35d6b26d9",
      abi: MatchMakingAbi,
    },
  ],
  plugins: [
    react(),
  ],
})