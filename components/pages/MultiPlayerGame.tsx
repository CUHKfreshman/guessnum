'use client';
import { MouseEvent, useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { fetchGuessResult } from '@/apis/gameApi';
import { useAnimateWavesProvider } from "@/providers/AnimateWavesProvider";
import { useCheckGameStatus, useSendGuess } from "@/hooks/gameHooks";
import FlipCards from "@/components/custom/FlipCards"
import RoundOverlay from "@/components/custom/RoundOverlay"
import { useGameStatusProvider } from "@/providers/GameStatusProvider";
interface MultiPlayerGameProps {
    hasFoundMatch: "Client" | "Opponent" | null;
    setHasFoundMatch: (value: "Client" | "Opponent" | null) => void;
    setCurrentPage: (pagename: "Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame") => void;
    handleStartNewGame: (showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound" | null) => void;
}
export default function MultiPlayerGame({ hasFoundMatch, setHasFoundMatch, setCurrentPage, handleStartNewGame }: MultiPlayerGameProps) {
    const { setAnimateWaves } = useAnimateWavesProvider();
    //State to track the flip status of each card using an object where the keys are card indices
    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    const [guessResults, setGuessResults] = useState<{ [key: number]: boolean | null }>({});
    const [remainingStake, setRemainingStake] = useState<number>(20);
    const [fadeRoundOverlay, setFadeRoundOverlay] = useState<boolean>(false);
    const [showRoundOverlay, setShowRoundOverlay] = useState<boolean>(true);
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
    const [roundNumber, setRoundNumber] = useState<number>(1);
    const [title, setTitle] = useState<string>("");
    const [fadeTitle, setFadeTitle] = useState<boolean>(false);
    const { gameStatus, setGameStatus } = useGameStatusProvider();
    useEffect(() => {
        if (gameStatus === "InMultiPlayerGame") {
            // show the flip cards after 1s
            setShowRoundOverlay(true);
            setTimeout(() => {
                setFadeRoundOverlay(false);
            }, 1000);
            setTimeout(() => {
                setFadeRoundOverlay(true);
            }, 1500);
        }
    }, [roundNumber]);
    useEffect(() => {
        setTimeout(() => {
            setShowRoundOverlay(!fadeRoundOverlay);
        }, 500);
    }, [fadeRoundOverlay]);
    const handleTryAgain = (tryAgainType: "MultiPlayerGameNextRound" | "MultiPlayerGame") => {
        setFlippedCards({});
        setGuessResults({});
        setHasFoundMatch(null);
        // reset cards rotate
        const cards = document.querySelectorAll('.flip-card') as NodeListOf<HTMLDivElement>;
        cards.forEach(card => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
        handleStartNewGame(tryAgainType);
        if (tryAgainType === "MultiPlayerGame") {
            setRoundNumber(1);
        }
    }
    const handleBack = () => {
        setAnimateWaves(true);
        setTimeout(() => {
            setHasFoundMatch(null);
            setGameStatus("NotInGame");
            setCurrentPage('PreGame');
        }, 500);

    }
    useEffect(() => {
        const displayTitle = () => {
            switch (hasFoundMatch) {
                case "Client":
                    return "🎉 Congratulations! You found a match! 🎉";
                case "Opponent":
                    return "❌ Opponent won this round... ❌";
                default:
                    if (isMyTurn) {
                        return "Choose Your Fortune!";
                    }
                    return "Waiting for the opponent...";
            }
        }
        setFadeTitle(true);
        setTimeout(() => {
            setTitle(displayTitle());
            setFadeTitle(false);
        }, 500);
        if (hasFoundMatch && roundNumber == 1) {
            setTimeout(() => {
                setRoundNumber(prev => prev + 1);
                handleTryAgain("MultiPlayerGameNextRound");
            }, 2000);
        }
    }, [hasFoundMatch, isMyTurn]);
    return (
        <>
            <div className={`flex flex-row`}>
                {showRoundOverlay && <RoundOverlay roundNumber={roundNumber} fadeRoundOverlay={fadeRoundOverlay} />}
                <div className={`flex flex-col items-center justify-center z-[50] select-none transition-opacity duration-500 ${showRoundOverlay ? "opacity-0" : ""}`}>
                    <h1 className={`${hasFoundMatch === 'Client' ? "text-md md:text-2xl lg:text-4xl text-shadow-success" : "text-2xl md:text-4xl lg:text-7xl"} ${fadeTitle ? "opacity-0" : ""} transition-all duration-300 text-slate-100 mb-4 font-bold text-nowrap`}>
                        {title}
                    </h1>
                    <FlipCards hasFoundMatch={hasFoundMatch} setHasFoundMatch={setHasFoundMatch} flippedCards={flippedCards} setFlippedCards={setFlippedCards} guessResults={guessResults} setGuessResults={setGuessResults} isMyTurn={isMyTurn} />
                    <div className={`fixed bottom-0 h-1/4 w-full flex flex-col items-center justify-center z-[50] transition ease-in-out duration-500 ${hasFoundMatch && roundNumber >= 2 ? "" : "opacity-[0%] hidden"}`}>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <button className="btn text-yellow-300 text-lg uppercase animate-pulse select-none"
                                onClick={() => { handleTryAgain("MultiPlayerGame") }}>- New Game -</button>
                            <button className="btn text-yellow-300 text-lg uppercase animate-pulse select-none"
                                onClick={handleBack}>- Back -</button>
                        </div>
                    </div>
                    {/** add some buttons to switch is my turn & round num for debug */}
                    <div className="absolute bottom-0 left-0 flex flex-col items-center justify-center gap-4 z-[9999]">
                        <button className="btn text-yellow-300 text-lg uppercase animate-pulse select-none"
                            onClick={() => setIsMyTurn(prev => !prev)}>- Switch Turn -</button>
                        <button className="btn text-yellow-300 text-lg uppercase animate-pulse select-none"
                            onClick={() => setRoundNumber(prev => prev + 1)}>- Next Round -</button>
                    </div>
                </div>
            </div>
        </>
    );
}
