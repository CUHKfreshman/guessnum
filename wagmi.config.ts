import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { greetingsAbi } from '@/hooks/abi'
import { klaytnBaobab } from 'wagmi/chains'
export default defineConfig({
  out: 'hooks/generated.ts',
  contracts: [
    {
      name: 'greeting',
      address: "0xB618c63daf79128ff8578957c3130af7507009Ae",
      abi: greetingsAbi,
    },
  ],
  plugins: [
    react(),
  ],
})