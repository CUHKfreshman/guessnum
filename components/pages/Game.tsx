"use client"
import { MouseEvent, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
interface GameProps {
}
export default function Game({ }: GameProps) {
    //State to track the flip status of each card using an object where the keys are card indices
    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index:number) => {
        if(!!flippedCards[index]) {return;} // only rotate the card if it is not flipped
        const card = e.currentTarget.previousSibling as HTMLDivElement; // assuming the card is the previous sibling
        const { clientX, clientY } = e;
        const { left, top, width, height } = card.getBoundingClientRect();
        const mouseX = clientX - left - width / 2;
        const mouseY = top + height / 2 - clientY;

        const rotateY = Math.min((mouseX / width) * 70, 70);
        const rotateX = Math.min((mouseY / height) * 70, 70);
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseOut = (e: MouseEvent<HTMLDivElement>, index:number) => {
        if(!!flippedCards[index]) {return;} // only rotate the card if it is not flipped
        const card = e.currentTarget.previousSibling as HTMLDivElement; // assuming the card is the previous sibling
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    const handleCardClick = (e: MouseEvent<HTMLDivElement>, index: number) => {
        console.log('Card clicked:', index);
        const card = e.currentTarget.previousSibling as HTMLDivElement; // assuming the card is the previous sibling
        card.style.transform = 'rotateY(180deg)';
        // Toggle the flipped status for the card that was clicked
        setFlippedCards(prevFlippedCards => ({
            ...prevFlippedCards,
            [index]: true
        }));
    };
    return (
        <>
            <div className={`flex flex-row`}>
                <div className="flex flex-col items-center justify-center z-[50] select-none">
                    <h1 className="text-2xl md:text-4xl lg:text-7xl text-slate-100 mb-4 font-bold text-nowrap">
                        Choose Your Fortune!
                    </h1>
                    <div className="flex flex-row items-between justify-center w-full gap-4 flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, index) => {
                            const isFlipped = flippedCards[index];
                            return (
                                <div className="relative" style={{ perspective: "800px" }} key={index}>
                                    <Card className={`flip-card ${isFlipped ? 'flipped' : ''} relative bg-slate-100 w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 flex justify-center items-center shadow-xl shadow-slate-50 drop-shadow-lg`}>
                                        <CardContent className={`flip-card-front ${isFlipped ? 'flipped' : ''} w-full h-full flex justify-center items-center p-0`}>
                                            <p className="text-md md:text-2xl lg:text-4xl text-slate-700">{num}</p>
                                        </CardContent>
                                        <CardContent className={`flip-card-back ${isFlipped ? '' : 'invisible'} w-full h-full flex justify-center items-center p-0`}>
                                            <p className="text-md md:text-2xl lg:text-4xl text-slate-700">❌</p>
                                        </CardContent>
                                    </Card>
                                    <div className="absolute top-0 left-0 w-full h-full" onMouseMove={(e)=>handleMouseMove(e,index)} onMouseOut={(e)=>handleMouseOut(e,index)} onClick={(e) => handleCardClick(e,index)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
