"use client"
import Image from "next/image";
import { ReactTyped } from "react-typed";
import FloatingNumbers from "@/components/custom/FloatingNumbers";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

import Home from "@/components/pages/Home";
import Game from "@/components/pages/Game";
export default function Page() {
  const [animateWaves, setAnimateWaves] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [hasFoundMatch, setHasFoundMatch] = useState<boolean>(false);
  useEffect(() => {
    // for switching component effect
    setTimeout(() => {
      if (animateWaves) {
        setAnimateWaves(false);
      }
    }, 1000);
  }, [animateWaves]);
  return (
    <main className="relative overflow-hidden flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-bl from-slate-800 via-purple-900 to-slate-800">{/** bg-gradient-to-bl from-slate-800 via-indigo-900 to-slate-800 */}
      {/** 
      <img src="/wave.svg" className="absolute h-1/2 w-full object-cover z-[1] top-0 opacity-[40%]" alt="Wave Background" />
      <img src="/wave2.svg" className="absolute h-1/2 w-full object-cover z-[1] top-0 opacity-[40%]" alt="Wave Background" />
      */}
      <div className="fixed left-0 top-0 w-full h-20 z-[999]">
        <div className="flex items-center justify-between h-full px-8">
          <div className="text-slate-300 font-bold select-none">🎲GUESS<span className="text-sky-500">NUM</span></div>
          <div className="flex items-center gap-4">
            <button className="btn btn-secondary bg-clip-text text-transparent font-semibold from-purple-500 via-violet-500 to-violet-500 bg-gradient-to-r">Subscribe</button>
            <button className="btn btn-secondary bg-clip-text text-transparent font-semibold from-indigo-500 via-violet-600 to-violet-500 bg-gradient-to-l">Settings</button>
          </div>
        </div>
      </div>
      <div className={`z-[100] fixed flex flex-col m-0 p-0 gap-0 justify-center items-start h-full w-full top-[-67%] transition ease-in-out duration-500 ${animateWaves ? "translate-y-[67%]" : ""}`}>
        <div className={`relative w-full flex-2 m-0 p-0 ${animateWaves ? "mb-[-1px]" : "mb-[-1px] lg:mb-0"}`}>
          <div className={`absolute top-0 h-full w-full bg-slate-200 transition ease-in-out duration-500 ${animateWaves ? "" : " opacity-[50%]"}`}></div>
          <div className={`absolute top-0 h-full w-full bg-slate-200 transition ease-in-out duration-500 opacity-[50%]`}></div>
        </div>
        <div className="relative w-full flex-1 m-0 p-0">

          <img src="/wave.svg" className={`absolute h-full w-full object-cover top-0 transition ease-in-out duration-500 ${animateWaves ? "" : " opacity-[50%]"}`} alt="Wave Background" />
          <img src="/wave.svg" className={`absolute h-full w-full object-cover top-0 transform scale-x-[120%] -translate-x-4 md:-translate-x-20 transition ease-in-out duration-500 opacity-[50%]`} alt="Wave Background 2" />
        </div>
      </div>
      {!showGame &&
        <Home animateWaves={animateWaves} setAnimateWaves={setAnimateWaves} setShowGame={setShowGame} />
      }
      {showGame && <Game hasFoundMatch={hasFoundMatch} setHasFoundMatch={setHasFoundMatch} />}

      <FloatingNumbers hasFoundMatch={hasFoundMatch} />
    </main>
  );
}
