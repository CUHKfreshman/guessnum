"use client"
import { useWatchSinglePlayerGameNumberGuessedEvent } from "@/hooks/generated";
import { MutableRefObject, Dispatch, SetStateAction, memo } from "react";

interface SinglePlayerGameNumberGuessedEventListenerProps {
    address: `0x${string}`;
    gameNumber: bigint;
    setHasFoundMatch: (value: "Client" | "Opponent" | false) => void;
    setGuessResults: Dispatch<SetStateAction<{ [key: number]: boolean | null; }>>;
    isFetchingRef: MutableRefObject<boolean>;
}
export default function SinglePlayerGameNumberGuessedEventListener({ address, gameNumber, setHasFoundMatch, setGuessResults, isFetchingRef }: SinglePlayerGameNumberGuessedEventListenerProps) {
    console.log("single player game number guessed event listener", address, gameNumber);
    useWatchSinglePlayerGameNumberGuessedEvent({
        args: { player: address, gameNumber: gameNumber },
        onLogs: (logs) => {
            const newestLog = logs[logs.length - 1];
            const { isGameEnded, number } = newestLog.args;
            const index = parseInt(number?.toString() ?? '-1');
            if (index === -1) { return; }
            console.log("single player game number guessed event", logs);
            setHasFoundMatch(isGameEnded ? "Client" : false);
            setGuessResults(prevGuessResults => ({
                ...prevGuessResults,
                [index]: isGameEnded ?? false
            }));
            isFetchingRef.current = false;
        },
        poll: true,
        pollingInterval: 1000
    });
    return <></>;
}
