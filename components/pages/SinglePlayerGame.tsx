'use client';
import { MouseEvent, useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { fetchGuessResult } from '@/apis/gameApi';
import { useAnimateWavesProvider } from "@/providers/AnimateWavesProvider";
import { useCheckGameStatus, useSendGuess } from "@/hooks/gameHooks";
import FlipCards from "@/components/custom/FlipCards"
import { useGameStatusProvider } from "@/providers/GameStatusProvider";
interface SinglePlayerGameProps {
    hasFoundMatch: "Client" | "Opponent" | null;
    setHasFoundMatch: (value: "Client" | "Opponent" | null) => void;
    setCurrentPage: (pagename: "Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame") => void;
    handleStartNewGame: (showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound" | null) => void;
}
export default function SinglePlayerGame({ hasFoundMatch, setHasFoundMatch, setCurrentPage, handleStartNewGame }: SinglePlayerGameProps) {
    const { setAnimateWaves } = useAnimateWavesProvider();
    //State to track the flip status of each card using an object where the keys are card indices
    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    const [guessResults, setGuessResults] = useState<{ [key: number]: boolean | null }>({});
    const [remainingStake, setRemainingStake] = useState<number>(20);
    const {setGameStatus} = useGameStatusProvider();
    const handleTryAgain = () => {
        setFlippedCards({});
        setGuessResults({});
        setHasFoundMatch(null);
        // reset cards rotate
        const cards = document.querySelectorAll('.flip-card') as NodeListOf<HTMLDivElement>;
        cards.forEach(card => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
        handleStartNewGame("SinglePlayerGame");
    }
    const handleBack = () => {
        setAnimateWaves(true);
        setTimeout(() => {
            setGameStatus("NotInGame");
            setHasFoundMatch(null);
            setCurrentPage('PreGame');
        }, 500);

    }
    return (
        <>
            <div className={`flex flex-row`}>
                <div className={`flex flex-col items-center justify-center z-[50] select-none transition-opacity duration-500`}>
                    <h1 className={`${hasFoundMatch==='Client' ? "text-md md:text-2xl lg:text-4xl text-shadow-success" : "text-2xl md:text-4xl lg:text-7xl"} transition-all duration-300 text-slate-100 mb-4 font-bold text-nowrap`}>
                        {Object.keys(guessResults).length < 10 && !hasFoundMatch ? "Choose Your Fortune!" : hasFoundMatch==='Client' ? '🎉 Congratulations! You found a match! 🎉' : '❌ Sorry! No match found! ❌'}
                    </h1>
                    <FlipCards hasFoundMatch={hasFoundMatch} setHasFoundMatch={setHasFoundMatch} flippedCards={flippedCards} setFlippedCards={setFlippedCards} guessResults={guessResults} setGuessResults={setGuessResults} />
                    <div className={`fixed bottom-0 h-1/4 w-full flex flex-col items-center justify-center z-[50] transition ease-in-out duration-500 ${hasFoundMatch==='Client' ? "" : "opacity-[0%] hidden"}`}>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <button className="btn text-yellow-300 text-lg uppercase animate-pulse select-none"
                                onClick={handleTryAgain}>- Try Again -</button>
                            <button className="btn text-yellow-300 text-lg uppercase animate-pulse select-none"
                                onClick={handleBack}>- Back -</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
