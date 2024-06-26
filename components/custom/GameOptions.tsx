'use client';
import { useAppProvider } from '@/providers/appContextProvider';
import TopUpDialogButton from '@/components/custom/TopUpDialogButton';
import { useGameStatusProvider } from '@/providers/GameStatusProvider';
// import rainbowkit to get user's balance
interface GameOptionsProps {
    setSelectedGame: (gameType: "SinglePlayerGame" | "MultiPlayerGame" | "SinglePlayerGameCanceled" | "MultiPlayerGameCanceled" | null) => void;
    showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound" | null;
    setShowOptions: (showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound" | null) => void;
    handleStartNewGame: (showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound" | null) => void;
}
export default function GameOptions({ showOptions, setSelectedGame, setShowOptions, handleStartNewGame }: GameOptionsProps) {
    const { authStatus } = useAppProvider();
    const {gameStatus} = useGameStatusProvider();

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
                <TopUpDialogButton gameStatus={gameStatus} />
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
