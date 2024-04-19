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
      address: "0x91Ae40b176a31740437eeEbB47B9d75D0417af38",
      abi: MultiPlayerGameAbi,
    },
    {
      name: 'MatchMaking',
      address: "0xd92E21e0f8e82BfF4EA06a515935Be058D561648",
      abi: MatchMakingAbi,
    },
  ],
  plugins: [
    react(),
  ],
})