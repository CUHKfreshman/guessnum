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
      address: "0x93d2bE2246fe2cB1AC56B1B0Fbb19Cbc1EeB29AE",//"0x91Ae40b176a31740437eeEbB47B9d75D0417af38",
      abi: MultiPlayerGameAbi,
    },
    {
      name: 'MatchMaking',
      address: "0xfAFEd46ee3fdC87581911d2D67DFa8371048428A",
      abi: MatchMakingAbi,
    },
  ],
  plugins: [
    react(),
  ],
})