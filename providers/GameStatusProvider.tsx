import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
interface GameStatusContextType {
    gameStatus: "InSinglePlayerGame" | "InMultiPlayerGame" | "NotInGame" | "StartingSinglePlayerGame" | "StartingMultiPlayerGame";
    setGameStatus: React.Dispatch<React.SetStateAction<"InSinglePlayerGame" | "InMultiPlayerGame" | "NotInGame" | "StartingSinglePlayerGame" | "StartingMultiPlayerGame">>;
}

const GameStatusContext = createContext<GameStatusContextType | undefined>(undefined);

export default function GameStatusProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [gameStatus, setGameStatus] = useState<"InSinglePlayerGame" | "InMultiPlayerGame" | "NotInGame" | "StartingSinglePlayerGame" | "StartingMultiPlayerGame">("NotInGame");
    const { toast } = useToast();

    useEffect(() => {
        switch (gameStatus) {
            case 'StartingSinglePlayerGame':
                toast({
                    title: "Entering Game",
                    description: "Connecting to the GuessNUM Contract......"
                });
                break;
            case 'StartingMultiPlayerGame':
                toast({
                    title: "Matching Game",
                    description: "Searching for an opponent......"
                });
                break;
            case 'InSinglePlayerGame':
                toast({
                    title: "Entered Game",
                    description: "Connected to the GuessNUM Contract!",
                    variant: "success"
                });
                break;
            case 'InMultiPlayerGame':
                toast({
                    title: "Match Found",
                    description: "Opponent found, starting game......",
                    variant: "success"
                });
                break;
            default:
                break;

        }
    }, [gameStatus]);

    return (
        <GameStatusContext.Provider value={{ gameStatus, setGameStatus }}>
            {children}
        </GameStatusContext.Provider>
    );
};
export const useGameStatusProvider = () => {
    const context = useContext(GameStatusContext);
    if (!context) {
        throw new Error('useGameStatusProvider must be used within a GameStatusProvider');
    }
    return context;
};