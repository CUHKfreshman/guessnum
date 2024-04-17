'use client';
import { useEffect, useState } from 'react';
import SinglePlayerOptions from '../custom/SinglePlayerOptions';
import MultiPlayerOptions from '../custom/MultiPlayerOptions';
interface PreGameProps {
}
export default function PreGame({ }: PreGameProps) {
    const [selectedGame, setSelectedGame] = useState<"SinglePlayer" | "MultiPlayer" | null>(null);
    const [showOptions, setShowOptions] = useState(false);
    const handleSelectGame = (gameType: "SinglePlayer" | "MultiPlayer") => {
        setSelectedGame(gameType);
        // Wait for the animation to finish before showing options
        setTimeout(() => {
            setShowOptions(true);
        }, 600);
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center z-50 transition ease-in-out duration-500">
            <div className="flex flex-col md:flex-row items-center justify-center">
                <div className={`basis-1/2 p-4 transform transition-all duration-300 ${(selectedGame === 'MultiPlayer' && !showOptions) ? 'translate-x-[-100vw]' : ''}`}>
                        <div className='w-[300px] flex justify-center items-center md:justify-end'>
                    {((!showOptions || selectedGame === 'SinglePlayer')) && (
                            <button
                                className={`btn text-slate-300 uppercase select-none text-lg md:text-4xl mb-8 animated-underline transition-all duration-300 ease-out ${(showOptions ? "persistent-underline" : "[&:not(:hover)]:animate-pulse")}`}
                                onClick={() => handleSelectGame('SinglePlayer')}
                            >
                                SinglePlayer
                            </button>
                    )}
                    {(showOptions && selectedGame === 'MultiPlayer') && <MultiPlayerOptions />}
                        </div>
                </div>
                <div className={`bg-slate-300 h-40 w-[2px] m-4 hidden md:block transition duration-300 ${selectedGame === 'MultiPlayer' ? "rotate-[-60deg]" : "rotate-[60deg]"}`}>
                </div>
                <div className={`basis-1/2 p-4 transform transition-transform duration-300 ${(selectedGame === 'SinglePlayer' && !showOptions) ? 'translate-x-[100vw]' : ''}`}>
                <div className='w-[300px] flex justify-center items-center md:justify-start'>
                    {((!showOptions || selectedGame === 'MultiPlayer')) && (
                        

                            <button
                                className={`btn text-slate-300 uppercase select-none text-lg md:text-4xl animated-underline transition-all duration-300 ease-out ${selectedGame === 'MultiPlayer' ? "mb-8" : "mt-8"} ${(showOptions ? "persistent-underline" : "[&:not(:hover)]:animate-pulse")}`}
                                onClick={() => handleSelectGame('MultiPlayer')}
                            >
                                MultiPlayer
                            </button>
                        
                    )}
                    {(showOptions && selectedGame === 'SinglePlayer') && <SinglePlayerOptions />}
                    </div>
                </div>
            </div>
        </div>
    );
}
