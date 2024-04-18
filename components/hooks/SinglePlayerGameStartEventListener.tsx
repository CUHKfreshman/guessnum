"use client"
import { useWatchSinglePlayerGameGameStartedEvent } from "@/hooks/generated";
import {memo} from 'react';

interface SinglePlayerGameStartEventListenerProps {
    address: `0x${string}`;
    gameNumber: bigint;
    handleEnterGame: (gameType: "SinglePlayerGame" | "MultiPlayerGame") => void;
}
function SinglePlayerGameStartEventListener({ address, gameNumber, handleEnterGame }: SinglePlayerGameStartEventListenerProps) {
    console.log("single player game start event listener", address, gameNumber);
    useWatchSinglePlayerGameGameStartedEvent({
        args: { player1: address as `0x${string}`, gameNumber: gameNumber },
        onLogs: (logs) => {
            console.log("single player game started event", logs);
            handleEnterGame("SinglePlayerGame");
        },
        poll:true,
        pollingInterval: 1000
    });
    return <></>;
}
//memo to avoid re-rendering for address and gameNumber
export default memo(SinglePlayerGameStartEventListener, (prevProps, nextProps) => {
    // This function determines if the component should update
    return prevProps.address === nextProps.address &&
        prevProps.gameNumber === nextProps.gameNumber;
});