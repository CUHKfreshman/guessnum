"use client"
interface RoundOverlayProps {
    roundNumber: number;
    fadeRoundOverlay: boolean;
}
// shows the round number before the game starts
export default function RoundOverlay({ roundNumber, fadeRoundOverlay }: RoundOverlayProps) {
    return (
        <div className={`fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-[800] bg-gradient-base-pure transition-opacity duration-500 ease-in-out  ${fadeRoundOverlay?"opacity-0":""}`}>
            <h1 className="text-lg md:text-4xl lg:text-6xl text-slate-100 font-bold text-shadow-base">Round {roundNumber}</h1>
        </div>
    );
}