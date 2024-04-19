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
      address: "0x8EF365921E38d880341bAadB8b998ED6003d95CB",
      abi: SinglePlayerGameAbi,
    },
    {
      name: 'MultiPlayerGame',
      address: "0xc5b37BB38c20f384b357Af96044b3CCd2F575B3E",
      abi: MultiPlayerGameAbi,
    },
    {
      name: 'MatchMaking',
      address: "0x001F4bc8B50Af54e8Dc35Cb22F07B7D0c0487349",
      abi: MatchMakingAbi,
    },
  ],
  plugins: [
    react(),
  ],
})