'use client';
import { MouseEvent, useEffect, useState, useRef } from "react";
import { useAnimateWavesProvider } from "@/providers/AnimateWavesProvider";
import FlipCards from "@/components/custom/FlipCards";
import { useGameStatusProvider } from "@/providers/GameStatusProvider";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useClientContextProvider } from "@/providers/ClientContextProvider";
import { useWatchSinglePlayerGameNumberGuessedEvent, useWatchSinglePlayerGameOneGameEndedEvent, useWriteSinglePlayerGameGuessNumber, useReadSinglePlayerGameCheckGameStatus } from "@/hooks/generated";
import SinglePlayerGameNumberGuessedEventListener from "../hooks/SinglePlayerGameNumberGuessedEventListener";
interface SinglePlayerGameProps {
    hasFoundMatch: "Client" | "Opponent" | false;
    setHasFoundMatch: (value: "Client" | "Opponent" | false) => void;
    setCurrentPage: (pagename: "Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame") => void;
    handleStartNewGame: (showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound" | null) => void;
}
export default function SinglePlayerGame({ hasFoundMatch, setHasFoundMatch, setCurrentPage, handleStartNewGame }: SinglePlayerGameProps) {
    const { setAnimateWaves } = useAnimateWavesProvider();
    const isFetchingRef = useRef<boolean>(false);
    //State to track the flip status of each card using an object where the keys are card indices
    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    const [guessResults, setGuessResults] = useState<{ [key: number]: boolean | null }>({});
    const [lastClickedIndex, setLastClickedIndex] = useState<number>(-1);
    // const [remainingStake, setRemainingStake] = useState<number>(20);
    const { setGameStatus } = useGameStatusProvider();
    const { address, singlePlayerGameNumber } = useClientContextProvider();
    const { data: gameStatusData } = useReadSinglePlayerGameCheckGameStatus({ account: address });
    const { data: sendGuessHash, writeContract: sendGuessNumber } = useWriteSinglePlayerGameGuessNumber();
    const { data: guessTransactionData } =
        useWaitForTransactionReceipt({
            hash: sendGuessHash,
        })
    useEffect(() => {
        console.log("res", guessTransactionData)
        if (guessTransactionData === undefined) { return; }
        let isGameEnded = false;
        if (guessTransactionData.logs.length === 4) {
            isGameEnded = true;
        }
        setHasFoundMatch(isGameEnded ? "Client" : false);
        setGuessResults(prevGuessResults => ({
            ...prevGuessResults,
            [lastClickedIndex]: isGameEnded
        }));
        isFetchingRef.current = false;
    }, [guessTransactionData]);
    // useWatchSinglePlayerGameNumberGuessedEvent({
    //     args: { player: address, gameNumber: singlePlayerGameNumber },
    //     onLogs: (logs) => {
    //         console.log("single player game number guessed event", logs);
    //         const newestLog = logs[logs.length - 1];
    //         const { isGameEnded, number } = newestLog.args;
    //         const index = parseInt(number?.toString() ?? '-1');
    //         if (index === -1) { return; }
    //         setHasFoundMatch(isGameEnded ? "Client" : null);
    //         setGuessResults(prevGuessResults => ({
    //             ...prevGuessResults,
    //             [index]: isGameEnded ?? false
    //         }));
    //         isFetchingRef.current = false;
    //     },
    //     onError: (error) => {
    //         console.error("single player game number guessed event error", error);
    //     }
    //     // poll:true,
    //     // pollingInterval: 1000
    // });
    // useEffect(() => {
    //     if (address && singlePlayerGameNumber) {
    //         useWatchSinglePlayerGameOneGameEndedEvent({
    //             args: { winner: address as `0x${string}`, gameNumber: singlePlayerGameNumber },
    //             onLogs: (logs) => {
    //                 console.log("single player game ended event", logs);
    //             }
    //         });
    //     }
    // }, [address, singlePlayerGameNumber]);

    const handleSendGuess = (index: number) => {
        isFetchingRef.current = true;
        sendGuessNumber({ account: address, args: [BigInt(index)] });
    }
    const handleTryAgain = () => {
        setHasFoundMatch(false);
        setFlippedCards({});
        setGuessResults({});
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
            setAnimateWaves(false);
        }, 1000);
        setTimeout(() => {
            console.log("hasfoundmatch", hasFoundMatch);
            setGameStatus("NotInGame");
            setHasFoundMatch(false);
            setCurrentPage('PreGame');
        }, 500);

    }
    return (
        <>
            {(false && address && singlePlayerGameNumber !== undefined) && <SinglePlayerGameNumberGuessedEventListener address={address} gameNumber={singlePlayerGameNumber} setHasFoundMatch={setHasFoundMatch} setGuessResults={setGuessResults} isFetchingRef={isFetchingRef} />}
            <div className={`flex flex-row`}>
                <div className={`flex flex-col items-center justify-center z-[50] select-none transition-opacity duration-500`}>
                    <h1 className={`${hasFoundMatch === 'Client' ? "text-md md:text-2xl lg:text-4xl text-shadow-success" : "text-2xl md:text-4xl lg:text-7xl"} transition-all duration-300 text-slate-100 mb-4 font-bold text-nowrap`}>
                        {Object.keys(guessResults).length < 10 && !hasFoundMatch ? "Choose Your Fortune!" : hasFoundMatch === 'Client' ? '🎉 Congratulations! You found a match! 🎉' : '❌ Sorry! No match found! ❌'}
                    </h1>
                    <FlipCards setLastClickedIndex={setLastClickedIndex} handleSendGuess={handleSendGuess} hasFoundMatch={hasFoundMatch} setHasFoundMatch={setHasFoundMatch} flippedCards={flippedCards} setFlippedCards={setFlippedCards} guessResults={guessResults} setGuessResults={setGuessResults} isFetchingRef={isFetchingRef} />
                    <div className={`fixed bottom-0 h-1/4 w-full flex flex-col items-center justify-center z-[50] transition ease-in-out duration-500 ${hasFoundMatch === 'Client' ? "" : "opacity-[0%] hidden"}`}>
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
