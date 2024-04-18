'use client';
import { useEffect, useState } from 'react';
import GameOptions from '@/components/custom/GameOptions';
import { useReadGreetingGreet } from '@/hooks/generated';
import { useAccount } from 'wagmi';
interface PreGameProps {
    setCurrentPage: (pagename: "Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame") => void;
}
export default function PreGame({ setCurrentPage }: PreGameProps) {
    const [selectedGame, setSelectedGame] = useState<"SinglePlayerGame" | "MultiPlayerGame" | "SinglePlayerGameCanceled" | "MultiPlayerGameCanceled"  | null>(null);
    const [showOptions, setShowOptions] = useState<"SinglePlayerGame" | "MultiPlayerGame" | null>(null);
    // const account = useAccount();
    // const greeting = useReadGreetingGreet({account: account.address});
    const handleSelectGame = (gameType: "SinglePlayerGame" | "MultiPlayerGame") => {
        setSelectedGame(gameType);
        // Wait for the animation to finish before showing options
        setTimeout(() => {
            setShowOptions(gameType);
        }, 600);
    };
    // useEffect(() => {
    //     console.log(greeting);
    // }, [greeting]);
    return (
        <div className="h-full w-full flex flex-col items-center justify-center z-50 transition ease-in-out duration-500">
            <div className="flex flex-col md:flex-row items-center justify-center">
                <div className={`basis-1/2 p-4 transform transition-all duration-300 ${((selectedGame === 'MultiPlayerGame' && !!!showOptions) || selectedGame==="MultiPlayerGameCanceled") ? 'translate-x-[-100vw]' : ''}`}>
                        <div className='w-[300px] flex justify-center items-center md:justify-end'>
                    {((!!!showOptions && selectedGame !=="MultiPlayerGameCanceled") || selectedGame === 'SinglePlayerGame') && (
                            <button
                                className={`btn text-slate-300 uppercase select-none text-lg md:text-4xl mb-8 animated-underline transition-all duration-300 ease-out ${(!!showOptions ? "persistent-underline" : "[&:not(:hover)]:animate-pulse")}`}
                                onClick={() => handleSelectGame('SinglePlayerGame')}
                            >
                                SinglePlayer
                            </button>
                    )}
                    {((!!showOptions && selectedGame === 'MultiPlayerGame') || selectedGame==="MultiPlayerGameCanceled") && <GameOptions showOptions={showOptions} setCurrentPage={setCurrentPage} setSelectedGame={setSelectedGame} setShowOptions={setShowOptions} />}
                        </div>
                </div>
                <div className={`bg-slate-300 h-40 w-[2px] m-4 hidden md:block transition duration-300 ${selectedGame === 'MultiPlayerGame' ? "rotate-[-60deg]" : "rotate-[60deg]"}`}>
                </div>
                <div className={`basis-1/2 p-4 transform transition-transform duration-300 ${((selectedGame === 'SinglePlayerGame' && !!!showOptions) || selectedGame==="SinglePlayerGameCanceled") ? 'translate-x-[100vw]' : ''}`}>
                <div className='w-[300px] flex justify-center items-center md:justify-start'>
                    {((!!!showOptions && selectedGame !=="SinglePlayerGameCanceled") || selectedGame === 'MultiPlayerGame') && (
                        

                            <button
                                className={`btn text-slate-300 uppercase select-none text-lg md:text-4xl animated-underline transition-all duration-300 ease-out ${selectedGame === 'MultiPlayerGame' ? "mb-8" : "mt-8"} ${(!!showOptions ? "persistent-underline" : "[&:not(:hover)]:animate-pulse")}`}
                                onClick={() => handleSelectGame('MultiPlayerGame')}
                            >
                                MultiPlayer
                            </button>
                        
                    )}
                    {((!!showOptions && selectedGame === 'SinglePlayerGame') || selectedGame==="SinglePlayerGameCanceled") && <GameOptions showOptions={showOptions} setCurrentPage={setCurrentPage} setSelectedGame={setSelectedGame} setShowOptions={setShowOptions}/>}
                    </div>
                </div>
            </div>
        </div>
    );
}
