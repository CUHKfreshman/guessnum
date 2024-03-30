import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-800">
      {/** 
      <img src="/wave.svg" className="absolute h-1/2 w-full object-cover z-[1] top-0 opacity-[40%]" alt="Wave Background" />
      <img src="/wave2.svg" className="absolute h-1/2 w-full object-cover z-[1] top-0 opacity-[40%]" alt="Wave Background" />
      */}
      <div className="fixed left-0 top-0 w-full h-20 z-[999]">
        <div className="flex items-center justify-between h-full px-8">
          <div className="text-slate-300 font-bold">🎲GUESS<span className="text-sky-400">NUM</span></div>
          <div className="flex items-center gap-4">
            <button className="btn btn-secondary text-slate-300/80">Leaderboard</button>
            <button className="btn btn-secondary text-slate-300/80">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        
      <div className="flex flex-col items-start justify-center z-[999]">
        <h1 className="text-7xl text-slate-100 mb-4 font-bold">
        Crypto Conquest🎯
        </h1>
          <h1 className="text-5xl text-slate-200 mb-1">
            {/** pr-1 because orbitron will be clipped wrongly using tailwindcss */}
            Guess a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-700 pr-1">Number</span>
            , Win Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-700 pr-1">Tokens</span>
          </h1>
          <h1 className="text-2xl text-slate-200/80 uppercase font-semibold">
            Is it... ... 0?
          </h1>
        </div>
      </div>

      <div className="fixed bottom-0 h-1/4 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <button className="btn text-slate-400">- Play Now -</button>
        </div>
      </div>
    </main>
  );
}
