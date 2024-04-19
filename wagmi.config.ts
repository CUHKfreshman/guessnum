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
      address: "0xd8c3d3fDc954958998f405beBb81903e071413BF",
      abi: SinglePlayerGameAbi,
    },
    {
      name: 'MultiPlayerGame',
      address: "0x98131Ba87d000634Cb370fB9095e430B6E6fAf0C",
      abi: MultiPlayerGameAbi,
    },
    {
      name: 'MatchMaking',
      address: "0xc0aB08B6D2A9cfcD1eE45994fdE5ab68ADb745f1",
      abi: MatchMakingAbi,
    },
  ],
  plugins: [
    react(),
  ],
})