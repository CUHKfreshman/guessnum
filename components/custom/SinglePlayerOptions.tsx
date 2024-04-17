'use client';
import { useState, useContext, useEffect } from 'react';
import { useAppProvider } from '@/providers/appContextProvider';
import TopUpButton from '@/components/custom/TopUpButton';
import { useAnimateWaves } from '@/providers/AnimateWavesProvider';
// import rainbowkit to get user's balance
interface SinglePlayerOptionsProps {
    setCurrentPage: (pagename: "Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame") => void;
}
export default function SinglePlayerOptions({ setCurrentPage}: SinglePlayerOptionsProps) {
    const { setAnimateWaves } = useAnimateWaves();
    const { authStatus } = useAppProvider();
    const handleClick = () => {
        setAnimateWaves(true);
        // for switching component effect
        setTimeout(() => {
            setCurrentPage("SinglePlayerGame");
        }, 500);
    }
    return (
        <>
            <div className='flex flex-col items-start justify-center'>
                <div className='md:h-40'></div>
                <button
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${authStatus === 'authenticated'? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse": "text-slate-300/50 line-through"}`}
                    onClick={handleClick}
                    disabled={authStatus !== 'authenticated'}
                >
                    START
                </button>
                <TopUpButton/>
            </div>
        </>
    );
}
