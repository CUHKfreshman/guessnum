'use client';
import Image from "next/image";
import { ReactTyped } from "react-typed";
import FloatingNumbers from "@/components/custom/FloatingNumbers";
import { use, useEffect, useState } from "react";
import Home from "@/components/pages/Home";
import SinglePlayerGame from "@/components/pages/SinglePlayerGame";
import MultiPlayerGame from "@/components/pages/MultiPlayerGame";
import PreGame from "@/components/pages/PreGame";
import WalletDialogButton from "@/components/custom/WalletDialogButton";
import { useAnimateWavesProvider } from "@/providers/AnimateWavesProvider";
import { useGameStatusProvider } from "@/providers/GameStatusProvider";
import { useAccount } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useWaitForTransactionReceipt } from "wagmi";
import { useClientContextProvider } from "@/providers/ClientContextProvider";
import { singlePlayerGameAddress, multiPlayerGameAddress, useWriteGncApprove, useSimulateSinglePlayerGameStartGame, useReadSinglePlayerGameGetPlayerGameNumber, useWriteSinglePlayerGameStartGame, useWatchSinglePlayerGameGameStartedEvent } from "@/hooks/generated";
import SinglePlayerGameStartEventListener from "@/components/hooks/SinglePlayerGameStartEventListener";
export default function Page() {
  const { animateWaves, setAnimateWaves } = useAnimateWavesProvider();
  const { gameStatus, setGameStatus } = useGameStatusProvider();
  const [currentPage, setCurrentPage] = useState<"Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame">("Home");
  const [hasFoundMatch, setHasFoundMatch] = useState<"Client" | "Opponent" | false>(false);
  const { address,singlePlayerGameNumber} = useClientContextProvider();
  const { toast } = useToast();
  const { data: WriteSinglePlayerGameStartGameHash, writeContract: WriteSinglePlayerGameStartGame } = useWriteSinglePlayerGameStartGame();
  const { data: approveHash, writeContract: approveGNC } = useWriteGncApprove();
  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    })
  const { data:isWriteSinglePlayerGameData,isLoading: isWriteSinglePlayerGameStartGameConfirming, isSuccess: isWriteSinglePlayerGameStartGameConfirmed } = useWaitForTransactionReceipt({
      hash: WriteSinglePlayerGameStartGameHash,
    })
  useEffect(() => {
    if (isWriteSinglePlayerGameStartGameConfirmed) {
      console.log("write single player game start game confirmed")
      if (gameStatus === "StartingSinglePlayerGame") {
        handleEnterGame("SinglePlayerGame");
      }
    }
  }, [isWriteSinglePlayerGameStartGameConfirmed])
  useEffect(() => {
    if (isApproveConfirmed) {
      console.log("approve confirmed")
      if(gameStatus==="StartingSinglePlayerGame"){
        
          WriteSinglePlayerGameStartGame({ account: address, args: [BigInt(42)] }); // seed
      }
    }
  }, [isApproveConfirmed])
  // const resp = useSimulateSinglePlayerGameStartGame({ account: address, args: [BigInt(42)] });
  // useEffect(() => {
  //   console.log(resp)
  // }, [resp])
  useWatchSinglePlayerGameGameStartedEvent({
    args: { player1: address as `0x${string}`, gameNumber: singlePlayerGameNumber },
    onLogs: (logs) => {
      console.log("single player game started event!", logs);
      //handleEnterGame("SinglePlayerGame");
    },
    onError: (error) => {
      console.error("single player game started event error", error);
    },
    strict: true,
    fromBlock: BigInt(0),
  });

  useEffect(() => {
    if (gameStatus === "NotInGame") {
      if (singlePlayerGameNumber !== undefined && singlePlayerGameNumber.toString() !== "0") {
        toast({
          title: "Unfinished Game",
          description: "You have an unfinished game, do you want to continue?",
          action: <ToastAction altText="Continue" onClick={() => { handleStartNewGame("SinglePlayerGame", singlePlayerGameNumber) }}>Continue</ToastAction>,
        });
      }
    }
  }, [singlePlayerGameNumber])
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'PreGame':
        return <PreGame setCurrentPage={setCurrentPage} handleStartNewGame={handleStartNewGame} />;
      case 'SinglePlayerGame':
        return <SinglePlayerGame setCurrentPage={setCurrentPage} hasFoundMatch={hasFoundMatch} setHasFoundMatch={setHasFoundMatch} handleStartNewGame={handleStartNewGame} />;
      case 'MultiPlayerGame':
        return <MultiPlayerGame setCurrentPage={setCurrentPage} hasFoundMatch={hasFoundMatch} setHasFoundMatch={setHasFoundMatch} handleStartNewGame={handleStartNewGame} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };
  const handleEnterGame = (showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound") => {
    if (showOptions === "SinglePlayerGame") {
      setGameStatus("InSinglePlayerGame");
      setCurrentPage("SinglePlayerGame");
    }
    else if (showOptions === "MultiPlayerGame") {
      setGameStatus("InMultiPlayerGame");
      setCurrentPage("MultiPlayerGame");
    }
    else {

    }
    setAnimateWaves(false);
  }
  const handleStartNewGame = (showOptions: "SinglePlayerGame" | "MultiPlayerGame" | "MultiPlayerGameNextRound" | null, gameNumber?: BigInt) => {
    // for switching component effect
    const isFromGamePage = (gameStatus === "InMultiPlayerGame" || gameStatus === "InSinglePlayerGame");
    if (!isFromGamePage) {
      setAnimateWaves(true);
    }
    if (showOptions === "SinglePlayerGame") {
      setGameStatus("StartingSinglePlayerGame");
      // if is new game
      if (gameNumber === undefined) {
        console.log("start new game...")
        approveGNC({ account: address, args: [singlePlayerGameAddress, BigInt(100)] });
      }
      else {
        handleEnterGame("SinglePlayerGame");
      }
      // setTimeout(() => {
      //   setCurrentPage("SinglePlayerGame");
      //   setGameStatus("InSinglePlayerGame");
      // }, 500);
    }
    else if (showOptions === "MultiPlayerGame") {
      // send join game request
      // wait for response
      // setTimeout(() => {
      //     setSelectedGame("MultiPlayerGame");
      // }, 500);
      setGameStatus("StartingMultiPlayerGame");

      // setTimeout(() => {
      //   setGameStatus("InMultiPlayerGame");
      // }, 1000);
      // setTimeout(() => {
      //   setCurrentPage("MultiPlayerGame");
      // }, 1500);
    }
    else {

    }
  }
  return (
    <main className={`relative overflow-hidden flex min-h-screen flex-col items-center justify-center p-24 transition-colors duration-500 ease-in-out bg-gradient-base ${hasFoundMatch === "Client" ? "bg-gradient-success":""}`}>{/** bg-gradient-to-bl from-slate-800 via-indigo-900 to-slate-800 */}
      {/** 
      <img src="/wave.svg" className="absolute h-1/2 w-full object-cover z-[1] top-0 opacity-[40%]" alt="Wave Background" />
      <img src="/wave2.svg" className="absolute h-1/2 w-full object-cover z-[1] top-0 opacity-[40%]" alt="Wave Background" />
      */}
      {(address && singlePlayerGameNumber!==undefined) && <SinglePlayerGameStartEventListener address={address} gameNumber={singlePlayerGameNumber} handleEnterGame={handleEnterGame}/>}
      <div className="fixed left-0 top-0 w-full h-20 z-[999]">
        <div className="flex items-center justify-between h-full px-4">
          <a href="https://github.com/CUHKfreshman/guessnum" className="mb-4 text-slate-500 font-bold select-none transition-colors duration-500 ease-in-out">🎲GUESS<span className={` transition-colors duration-500 ease-in-out ${hasFoundMatch === 'Client' ? "text-orange-500" : "text-sky-500"}`}>NUM</span></a>
          <div className="mb-4 flex items-center gap-4 select-none">
            <WalletDialogButton />
          </div>
        </div>
      </div>
      <div className={`z-[998] fixed flex flex-col m-0 p-0 gap-0 justify-center items-start h-full w-full top-[-67%] transition ease-in-out duration-500 ${animateWaves ? "translate-y-[67%]" : ""}`}>
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
