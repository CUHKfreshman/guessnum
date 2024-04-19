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
      address: "0x35CDe12FD3d25652719c801d4eABA50F7D1800D6",
      abi: SinglePlayerGameAbi,
    },
    {
      name: 'MultiPlayerGame',
      address: "0x954d2a8dEE7128aB7986D87E93AEdC999Fad6Fd8",//"0x91Ae40b176a31740437eeEbB47B9d75D0417af38",
      abi: MultiPlayerGameAbi,
    },
    {
      name: 'MatchMaking',
      address: "0xeC6dB2EcF6cBA6f147F4a2548baabcc941D78c3e",
      abi: MatchMakingAbi,
    },
  ],
  plugins: [
    react(),
  ],
})