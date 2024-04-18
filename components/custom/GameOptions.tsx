'use client';
import { useState, useContext, useEffect } from 'react';
import { useAppProvider } from '@/providers/appContextProvider';
import TopUpButton from '@/components/custom/TopUpButton';
import { useAnimateWaves } from '@/providers/AnimateWavesProvider';
import { useJoinGame } from '@/hooks/gameHooks';
import { useAccount } from 'wagmi';
import { useToast } from '../ui/use-toast';
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
    const [isFetching, setIsFetching] = useState(false);

    const {toast} = useToast();
    // const JoinGame = useJoinGame();
    const handleStart = () => {
        // for switching component effect
        if (showOptions === "SinglePlayerGame") {
            setAnimateWaves(true);
            toast({
                title: "Entering Game",
                description: "Connecting to the GuessNUM Contract......",
            });
            setTimeout(() => {
                setCurrentPage("SinglePlayerGame");
            }, 500);
        }
        else{
            // send join game request
            // wait for response
            // setTimeout(() => {
            //     setSelectedGame("MultiPlayerGame");
            // }, 500);
            setIsFetching(true);
            toast({
                title: "Matching Game",
                description: "Searching for an opponent......",
            });
            setTimeout(() => {
                setIsFetching(false);
                toast({
                    title: "Match Found",
                    description: "Opponent found, starting game......",
                });
                setAnimateWaves(true);
            }, 1000);
            setTimeout(() => {
                
                setCurrentPage("MultiPlayerGame");
            }, 1500);
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
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${isFetching?"text-slate-100":authStatus === 'authenticated' ? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse" : "text-slate-300/50 line-through"}`}
                    onClick={handleStart}
                    disabled={authStatus !== 'authenticated' || isFetching}
                >
                    START
                </button>
                <TopUpButton isFetching={isFetching} />
                <button
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${isFetching?"text-slate-300/30":authStatus === 'authenticated' ? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse" : "text-slate-300/50 line-through"}`}
                    onClick={handleBack}
                    disabled={authStatus !== 'authenticated' || isFetching}
                >
                    Back
                </button>
            </div>
        </>
    );
}
