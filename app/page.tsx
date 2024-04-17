'use client';
import Image from "next/image";
import { ReactTyped } from "react-typed";
import FloatingNumbers from "@/components/custom/FloatingNumbers";
import { useEffect, useState } from "react";
import Home from "@/components/pages/Home";
import SinglePlayerGame from "@/components/pages/SinglePlayerGame";
import PreGame from "@/components/pages/PreGame";
import WalletButton from "@/components/custom/WalletButton";
import { useAnimateWaves } from "@/providers/AnimateWavesProvider";
export default function Page() {
  const { animateWaves, setAnimateWaves } = useAnimateWaves();
  const [currentPage, setCurrentPage] = useState<"Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame">("Home");
  const [hasFoundMatch, setHasFoundMatch] = useState<boolean>(false);
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'PreGame':
        return <PreGame setCurrentPage={setCurrentPage} />;
      case 'SinglePlayerGame':
        return <SinglePlayerGame setCurrentPage={setCurrentPage} hasFoundMatch={hasFoundMatch} setHasFoundMatch={setHasFoundMatch} />;
      //case 'MultiPlayerGame':
      //  return <MultiPlayerGame />;
      default:
        return <div>Page not found</div>;
    }
  };
  useEffect(() => {
    // for switching component effect
    setTimeout(() => {
      if (animateWaves) {
        setAnimateWaves(false);
      }
    }, 1000);
  }, [animateWaves]);
  return (
    <main className={`relative overflow-hidden flex min-h-screen flex-col items-center justify-center p-24 transition-colors duration-500 ease-in-out bg-gradient-base ${hasFoundMatch && "bg-gradient-success"}`}>{/** bg-gradient-to-bl from-slate-800 via-indigo-900 to-slate-800 */}
      {/** 
      <img src="/wave.svg" className="absolute h-1/2 w-full object-cover z-[1] top-0 opacity-[40%]" alt="Wave Background" />
      <img src="/wave2.svg" className="absolute h-1/2 w-full object-cover z-[1] top-0 opacity-[40%]" alt="Wave Background" />
      */}
      <div className="fixed left-0 top-0 w-full h-20 z-[999]">
        <div className="flex items-center justify-between h-full px-4">
          <div className="mb-4 text-slate-500 font-bold select-none transition-colors duration-500 ease-in-out">🎲GUESS<span className={` transition-colors duration-500 ease-in-out ${hasFoundMatch?"text-orange-500":"text-sky-500"}`}>NUM</span></div>
          <div className="mb-4 flex items-center gap-4 select-none">
            <WalletButton />
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
      {renderPage()}
      <FloatingNumbers hasFoundMatch={hasFoundMatch} />
    </main>
  );
}
