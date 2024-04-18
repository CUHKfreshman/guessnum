'use client';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider } from 'wagmi';
import {
  klaytnBaobab
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import type { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { useToast } from '@/components/ui/use-toast';
interface ContextProps {
  authStatus: AuthenticationStatus;
  setAuthStatus: any;
}

const AppContext = createContext<ContextProps>({
  authStatus: "unauthenticated",
  setAuthStatus: () => "unauthenticated",
});

const wagmiConfig = getDefaultConfig({
  wallets: [{
    groupName: 'Recommended',
    wallets: [rainbowWallet, metaMaskWallet, coinbaseWallet],
  }],
  appName: 'guessnum',
  projectId: 'YOUR_PROJECT_ID',
  chains: [klaytnBaobab],
  ssr: true,
});
const queryClient = new QueryClient();
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>("unauthenticated");
  const { toast } = useToast();

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      toast({
        title: "Please connect your wallet",
        description: "You need to connect your wallet to play the game",
      });
    }
    else if (authStatus === "authenticated") {
      toast({
        title: "Wallet connected",
        description: "You can now play the game",
      });
    }
    else if (authStatus === "loading") {
      toast({
        title: "Wallet loading",
        description: "Connecting to the wallet...",
      });
    }
  }, [authStatus]);
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          coolMode={true}
        >
          <AppContext.Provider
            value={{
              authStatus,
              setAuthStatus,
            }}
          >
            {children}
          </AppContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export const useAppProvider = () => useContext(AppContext);