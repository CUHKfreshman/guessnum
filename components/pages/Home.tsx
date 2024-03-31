"use client"
import { ReactTyped } from "react-typed";
import { useEffect, useState } from "react";
interface HomeProps {
    animateWaves: boolean;
    setAnimateWaves: (value: boolean) => void;
    setShowGame: (value: boolean) => void;
}
export default function Home({animateWaves, setAnimateWaves, setShowGame}: HomeProps) {
    const handleClicked = () => {
        setAnimateWaves(!animateWaves);
        // for switching component effect
        setTimeout(() => {
                setAnimateWaves(false);
                setShowGame(true);
                console.log("Switching to Game Component");
            
        }, 1000);
    }
    return (
        <>
            <div className={`flex flex-row`}>

                <div className="flex flex-col items-start justify-center z-[50] select-none">
                    <h1 className="text-7xl text-slate-100 mb-4 font-bold">
                        Crypto Conquest🎯
                    </h1>
                    <h1 className="text-5xl text-slate-200 mb-1">
                        {/** pr-1 because orbitron will be clipped wrongly using tailwindcss */}
                        Guess a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-violet-500 pr-1">Number</span>
                        , Win Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-700 pr-1">Tokens</span>
                    </h1>
                    <h1 className="text-2xl text-slate-200/80 uppercase font-semibold">
                        Is it
                        <ReactTyped
                            strings={["... ...0?", "... ...1?", "... ...2?", "... ...3?", "... ...4?", "... ...5?", "... ...6?", "... ...7?", "... ...8?", "... ...9?"]}
                            typeSpeed={100}
                            loop
                            backSpeed={70}
                            showCursor={true}
                        />
                    </h1>
                </div>
            </div>
            <div className={`fixed bottom-0 h-1/4 w-full flex flex-col items-center justify-center z-[50] transition ease-in-out duration-500 ${animateWaves ? "opacity-[0%] " : ""}`}>
                <div className="flex flex-col items-center justify-center gap-4">
                    <button className="btn text-slate-300 text-lg uppercase animate-pulse"
                        onClick={handleClicked}>- Play Now -</button>
                </div>
            </div>
        </>
    );
}
