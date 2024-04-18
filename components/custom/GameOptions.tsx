'use client';
import { useState, useContext, useEffect } from 'react';
import { useAppProvider } from '@/providers/appContextProvider';
import TopUpButton from '@/components/custom/TopUpButton';
import { useAnimateWaves } from '@/providers/AnimateWavesProvider';
import { useJoinGame } from '@/hooks/gameHooks';
import { useAccount } from 'wagmi';
// import rainbowkit to get user's balance
interface SinglePlayerOptionsProps {
    setCurrentPage: (pagename: "Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame") => void;
    setSelectedGame: (gameType: "SinglePlayerGame" | "MultiPlayerGame" | "SinglePlayerGameCanceled" | "MultiPlayerGameCanceled" | null) => void;
    showOptions: "SinglePlayerGame" | "MultiPlayerGame" | null;
    setShowOptions: (showOptions: "SinglePlayerGame" | "MultiPlayerGame" | null) => void;
}
export default function GameOptions({ showOptions, setCurrentPage, setSelectedGame, setShowOptions }: SinglePlayerOptionsProps) {
    const { setAnimateWaves } = useAnimateWaves();
    const { authStatus } = useAppProvider();
    const { address } = useAccount();
    // const JoinGame = useJoinGame();
    const handleStart = () => {
        setAnimateWaves(true);
        // for switching component effect
        if (showOptions === "SinglePlayerGame") {
            setTimeout(() => {
                setCurrentPage("SinglePlayerGame");
            }, 500);
        }
        else{
            setTimeout(() => {
                setSelectedGame("MultiPlayerGame");
            }, 500);
        }
    }
    const handleBack = () => {
        if(showOptions === "SinglePlayerGame"){
        setSelectedGame("SinglePlayerGameCanceled");
        }
        else{
            setSelectedGame("MultiPlayerGameCanceled");
        }
        setShowOptions(null);
        setTimeout(() => {
            setSelectedGame(null);
        }, 600);
    }
    return (
        <>
            <div className='flex flex-col items-start justify-center'>
                <div className='md:h-60'></div>
                <button
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${authStatus === 'authenticated' ? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse" : "text-slate-300/50 line-through"}`}
                    onClick={handleStart}
                    disabled={authStatus !== 'authenticated'}
                >
                    START
                </button>
                <TopUpButton />
                <button
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${authStatus === 'authenticated' ? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse" : "text-slate-300/50 line-through"}`}
                    onClick={handleBack}
                    disabled={authStatus !== 'authenticated'}
                >
                    Back
                </button>
            </div>
        </>
    );
}
