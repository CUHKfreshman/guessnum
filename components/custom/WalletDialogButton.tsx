'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useClientContextProvider } from '@/providers/ClientContextProvider';
import { useAppProvider } from '@/providers/appContextProvider';
export default function WalletDialogButton() {
  const { setAuthStatus } = useAppProvider();
  const {address} = useClientContextProvider();
  useEffect(() => {
      const authStatus = address ? "authenticated" : "unauthenticated";
      setAuthStatus(authStatus);
  },[address]);
  return (
    <ConnectButton
    />
  );
}