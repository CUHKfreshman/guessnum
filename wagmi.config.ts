import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { greetingsAbi, GNCAbi } from '@/hooks/abi'
export default defineConfig({
  out: 'hooks/generated.ts',
  contracts: [
    {
      name: 'greeting',
      address: "0xB618c63daf79128ff8578957c3130af7507009Ae",
      abi: greetingsAbi,
    },
    {
      name: 'GNC',
      address: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
      abi: GNCAbi,
    }
  ],
  plugins: [
    react(),
  ],
})