'use client';
import { useState, useContext, useEffect } from 'react';
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
  } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { useAppProvider } from '@/providers/appContextProvider';
// import rainbowkit to get user's balance
interface SinglePlayerOptionsProps {
}
export default function SinglePlayerOptions({ }: SinglePlayerOptionsProps) {
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const { authStatus } = useAppProvider();
    const account = useAccount();
    const balance = useBalance(account);
    const [remainingGameTimes, setRemainingGameTimes] = useState<BigInt>();
    const gameRequiredTokenNum = 10 ** 17;
    useEffect(() => {
        if (balance.data?.value) {
            const remainingTimes = balance.data.value / BigInt(gameRequiredTokenNum);
            setRemainingGameTimes(remainingTimes);
        }
    }, [balance.data?.value, authStatus]);
    return (
        <>
            <div className='flex flex-col items-start justify-center'>
                <div className='md:h-40'></div>
                <button
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${authStatus === 'authenticated'? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse": "text-slate-300/50 line-through"}`}
                    onClick={openAccountModal}
                    disabled={authStatus !== 'authenticated'}
                >
                    START
                </button>
                <button
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${authStatus === 'authenticated'? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse": "text-slate-300/50 line-through"}`}
                    onClick={openChainModal}
                    disabled={authStatus !== 'authenticated'}
                >
                    TOP UP
                </button>
            </div>
        </>
    );
}
