'use client';
import { useState, useContext, useEffect } from 'react';
import { useAppProvider } from '@/providers/appContextProvider';
import TopUpButton from '@/components/custom/TopUpButton';
import { useAccount } from 'wagmi';
import { useToast } from '../ui/use-toast';
import { useGameStatusProvider } from '@/providers/GameStatusProvider';
// import rainbowkit to get user's balance
interface SinglePlayerOptionsProps {
    setCurrentPage: (pagename: "Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame") => void;
    setSelectedGame: (gameType: "SinglePlayerGame" | "MultiPlayerGame" | "SinglePlayerGameCanceled" | "MultiPlayerGameCanceled" | null) => void;
    showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound" | null;
    setShowOptions: (showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound" | null) => void;
    handleStartNewGame: (showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound" | null) => void;
}
export default function GameOptions({ showOptions, setCurrentPage, setSelectedGame, setShowOptions, handleStartNewGame }: SinglePlayerOptionsProps) {
    const { authStatus } = useAppProvider();
    const { address } = useAccount();
    const {gameStatus} = useGameStatusProvider();
    const {toast} = useToast();
    // const JoinGame = useJoinGame();

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
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${gameStatus!=="NotInGame"?"text-slate-100":authStatus === 'authenticated' ? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse" : "text-slate-300/50 line-through"}`}
                    onClick={()=>{handleStartNewGame(showOptions)}}
                    disabled={authStatus !== 'authenticated' || gameStatus!=="NotInGame"}
                >
                    START
                </button>
                <TopUpButton gameStatus={gameStatus} />
                <button
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${gameStatus!=="NotInGame"?"text-slate-300/30":authStatus === 'authenticated' ? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse" : "text-slate-300/50 line-through"}`}
                    onClick={handleBack}
                    disabled={authStatus !== 'authenticated' || gameStatus!=="NotInGame"}
                >
                    Back
                </button>
            </div>
        </>
    );
}
