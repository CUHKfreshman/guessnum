'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useAccount, useConfig } from 'wagmi';
import { useAppProvider } from '@/providers/appContextProvider';
import { useToast } from '@/components/ui/use-toast';
export default function WalletButton() {
  const { setAuthStatus } = useAppProvider();
  const clientAccount = useAccount();
  useEffect(() => {
      const authStatus = clientAccount.address ? "authenticated" : "unauthenticated";
      setAuthStatus(authStatus);
  },[clientAccount.address]);
  return (
    <ConnectButton
    />
  );
}