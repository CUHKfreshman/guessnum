'use client';
import { MouseEvent, useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { fetchGuessResult } from '@/apis/gameApi';
import { useAnimateWaves } from "@/providers/AnimateWavesProvider";
import { useCheckGameStatus, useSendGuess } from "@/hooks/gameHooks";
import FlipCards from "@/components/custom/FlipCards"
import RoundOverlay from "@/components/custom/RoundOverlay"
interface MultiPlayerGameProps {
    hasFoundMatch: boolean;
    setHasFoundMatch: (value: boolean) => void;
    setCurrentPage: (pagename: "Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame") => void;
}
export default function MultiPlayerGame({ hasFoundMatch, setHasFoundMatch, setCurrentPage }: MultiPlayerGameProps) {
    const { setAnimateWaves } = useAnimateWaves();
    //State to track the flip status of each card using an object where the keys are card indices
    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    const [guessResults, setGuessResults] = useState<{ [key: number]: boolean | null }>({});
    const [remainingStake, setRemainingStake] = useState<number>(20);
    const [fadeRoundOverlay, setFadeRoundOverlay] = useState<boolean>(false);
    const [showRoundOverlay, setShowRoundOverlay] = useState<boolean>(true);
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
    const [roundNumber, setRoundNumber] = useState<number>(1);
    useEffect(() => {
        // show the flip cards after 1s
        setTimeout(() => {
            setFadeRoundOverlay(true);
        }, 1000);
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setShowRoundOverlay(!fadeRoundOverlay);
        }, 500);
    }, [fadeRoundOverlay]);
    const handleTryAgain = () => {
        setFlippedCards({});
        setGuessResults({});
        setHasFoundMatch(false);
        // reset cards rotate
        const cards = document.querySelectorAll('.flip-card') as NodeListOf<HTMLDivElement>;
        cards.forEach(card => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }
    const handleBack = () => {
        setAnimateWaves(true);
        setTimeout(() => {
            setHasFoundMatch(false);
            setCurrentPage('PreGame');
        }, 500);

    }
    return (
        <>
            <div className={`flex flex-row`}>
                {showRoundOverlay && <RoundOverlay roundNumber={roundNumber} fadeRoundOverlay={fadeRoundOverlay}/>}
                <div className={`flex flex-col items-center justify-center z-[50] select-none transition-opacity duration-500 ${showRoundOverlay?"opacity-0":""}`}>
                    <h1 className={`${hasFoundMatch ? "text-md md:text-2xl lg:text-4xl text-shadow-success" : "text-2xl md:text-4xl lg:text-7xl"} transition-all duration-300 text-slate-100 mb-4 font-bold text-nowrap`}>
                        {Object.keys(guessResults).length < 10 && !hasFoundMatch ? "Choose Your Fortune!" : hasFoundMatch ? '🎉 Congratulations! You found a match! 🎉' : '❌ Sorry! No match found! ❌'}
                    </h1>
                    <FlipCards hasFoundMatch={hasFoundMatch} setHasFoundMatch={setHasFoundMatch} flippedCards={flippedCards} setFlippedCards={setFlippedCards} guessResults={guessResults} setGuessResults={setGuessResults} isMyTurn={isMyTurn}/>
                    <div className={`fixed bottom-0 h-1/4 w-full flex flex-col items-center justify-center z-[50] transition ease-in-out duration-500 ${hasFoundMatch ? "" : "opacity-[0%] hidden"}`}>
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
