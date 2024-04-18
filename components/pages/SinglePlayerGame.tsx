'use client';
import { MouseEvent, useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import {fetchGuessResult} from '@/apis/gameApi';
import { useAnimateWaves } from "@/providers/AnimateWavesProvider";
import { useCheckGameStatus, useSendGuess } from "@/hooks/gameHooks";
interface SinglePlayerGameProps {
    hasFoundMatch: boolean;
    setHasFoundMatch: (value: boolean) => void;
    setCurrentPage: (pagename: "Home" | "PreGame" | "SinglePlayerGame" | "MultiPlayerGame") => void;
}
export default function SinglePlayerGame({hasFoundMatch,setHasFoundMatch, setCurrentPage }: SinglePlayerGameProps) {
    const { setAnimateWaves } = useAnimateWaves();
    //State to track the flip status of each card using an object where the keys are card indices
    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    const [guessResults, setGuessResults] = useState<{ [key: number]: boolean | null }>({});
    const [remainingStake, setRemainingStake] = useState<number>(20);
    const [isFetching, setIsFetching] = useState(false);
    const isFetchingRef = useRef(isFetching);
    const { guessedNumbers,gameEnded, prizePool } = useCheckGameStatus({gameType:"SinglePlayerGame"});
    // useEffect(() => {
    //     // initialize guessResults if refreshed page
    //     guessedNumbers.forEach((num) => {
    //         setGuessResults(prevGuessResults => ({
    //             ...prevGuessResults,
    //             [num]: true
    //         }));
    //     })
    // }, [guessedNumbers]);
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
        // return if flipped
        if (!!flippedCards[index]) { return; } // only rotate the card if it is not flipped
        const card = e.currentTarget.previousSibling as HTMLDivElement; // assuming the card is the previous sibling
        const { clientX, clientY } = e;
        const { left, top, width, height } = card.getBoundingClientRect();
        const mouseX = clientX - left - width / 2;
        const mouseY = top + height / 2 - clientY;

        const rotateY = Math.min((mouseX / width) * 70, 70);
        const rotateX = Math.min((mouseY / height) * 70, 70);
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(110%)`;
    };

    const handleMouseOut = (e: MouseEvent<HTMLDivElement>, index: number) => {
        if (!!flippedCards[index]) { return; } // only rotate the card if it is not flipped
        const card = e.currentTarget.previousSibling as HTMLDivElement; // assuming the card is the previous sibling
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    const handleCardClick = async (e: MouseEvent<HTMLDivElement>, index: number) => {
        if (!!flippedCards[index] || isFetchingRef.current || hasFoundMatch) { return; }
        const card = e.currentTarget.previousSibling as HTMLDivElement; // assuming the card is the previous sibling
        // get rotateY & rotateX values
        // rotate 180deg / -180deg according to the current value
        const currentRotateYRegArr = card.style.transform.match(/rotateY\(([^)]+)deg\)/);
        // if current > 0 then rotate to 180deg else rotate to -180deg
        //?not working
        const rotateY = currentRotateYRegArr ? (parseInt(currentRotateYRegArr[1]) > 0 ? -180 : 180) : 180;
        card.style.transform = `rotateY(${rotateY}deg)`;
        // Toggle the flipped status for the card that was clicked
        setFlippedCards(prevFlippedCards => ({
            ...prevFlippedCards,
            [index]: true
        }));
        setGuessResults(prevGuessResults => ({
            ...prevGuessResults,
            [index]: null
        }));
        isFetchingRef.current = true;
        try {
            const result = await fetchGuessResult();
            console.log('result:', result);
            setHasFoundMatch(result);
            setGuessResults(prevGuessResults => ({
                ...prevGuessResults,
                [index]: result
            }));

        } catch (error) {
            console.error('Error fetching guess result:', error);
        }
        finally {
            isFetchingRef.current = false;
        }
    };

    const handleTryAgain = () => {
        setFlippedCards({});
        setGuessResults({});
        setHasFoundMatch(false);
        // reset cards rotate
        const cards = document.querySelectorAll('.flip-card') as NodeListOf<HTMLDivElement>;
        cards.forEach(card => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }
    const handleBack = () => {
        setAnimateWaves(true);
        setTimeout(() => {
            setHasFoundMatch(false);
            setCurrentPage('PreGame');
        }, 500);

    }
    return (
        <>
            <div className={`flex flex-row`}>
                <div className="flex flex-col items-center justify-center z-[50] select-none">
                    <h1 className={`${hasFoundMatch?"text-md md:text-2xl lg:text-4xl text-shadow-special":"text-2xl md:text-4xl lg:text-7xl"} transition-all duration-300 text-slate-100 mb-4 font-bold text-nowrap`}>
                        {Object.keys(guessResults).length < 10 && !hasFoundMatch?"Choose Your Fortune!":hasFoundMatch ? '🎉 Congratulations! You found a match! 🎉' : '❌ Sorry! No match found! ❌'}
                    </h1>
                    <div className="flex flex-row items-between justify-center w-full gap-4 flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, index) => {
                            const isFlipped = flippedCards[index];
                            const guessResult = guessResults[index];
                            let showCard = true;
                            if(Object.keys(guessResults).length < 10 && !hasFoundMatch){
                                showCard = true;
                            }
                            if(Object.keys(guessResults).length === 10 && !hasFoundMatch){
                                showCard = false;
                            }
                            if(hasFoundMatch){
                                if(guessResult){
                                    showCard = true;
                                }
                                else{
                                    showCard = false;
                                }
                            }
                            return (
                                <div className={`${showCard || guessResult !== undefined?"":"opacity-0"} ${guessResult===undefined &&showCard?'cursor-pointer':'cursor-default'} transition duration-500 relative`} style={{ perspective: "800px" }} key={index}>
                                    <Card className={`${guessResult === null || guessResult === undefined?"bg-slate-100":guessResult?" bg-yellow-300":" bg-neutral-300"} flip-card transition-all duration-200 relative w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 flex justify-center items-center shadow-lg shadow-slate-800/80`}>
                                        <CardContent className={`flip-card-front ${!!isFlipped ? 'flipped' : ''} w-full h-full flex justify-center items-center p-0`}>
                                            <p className="text-md md:text-2xl lg:text-4xl text-slate-700">{num}</p>
                                        </CardContent>
                                        <CardContent className={`flip-card-back transition duration-500 w-full h-full flex justify-center items-center p-0`}>
                                                    <p className={`absolute text-md md:text-2xl lg:text-4xl text-slate-700 transition-all duration-100 ease-out ${guessResult === null? "opacity-100":"opacity-0"}`}>❔</p>
                                                    <p className={`absolute text-md md:text-2xl lg:text-4xl text-slate-700 transition-all duration-100 ease-in delay-300 ${guessResult === undefined?"": guessResult === null? "opacity-0":"opacity-100"}`}>{guessResult===undefined || guessResult===null? "":guessResult?'⭕':'✖'}</p>
                                        </CardContent>
                                    </Card>
                                    <div className="absolute top-0 left-0 w-full h-full" onMouseMove={(e) => handleMouseMove(e, index)} onMouseOut={(e) => handleMouseOut(e, index)} onClick={(e) => handleCardClick(e, index)} />
                                </div>
                            );
                        })}
                    </div>
           <div className={`fixed bottom-0 h-1/4 w-full flex flex-col items-center justify-center z-[50] transition ease-in-out duration-500 ${hasFoundMatch ? "" : "opacity-[0%] hidden"}`}>
                <div className="flex flex-col items-center justify-center gap-4">
                    <button className="btn text-yellow-300 text-lg uppercase animate-pulse select-none"
                        onClick={handleTryAgain}>- Try Again -</button>
                        <button className="btn text-yellow-300 text-lg uppercase animate-pulse select-none"
                            onClick={handleBack}>- Back -</button>
                </div>
            </div>
                    
                </div>
            </div>
        </>
    );
}
