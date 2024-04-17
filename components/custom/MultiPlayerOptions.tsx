'use client';
import { useState } from 'react';
interface MultiPlayerOptionsProps {
}
export default function MultiPlayerOptions({ }: MultiPlayerOptionsProps) {
    return (
        <>
            <div className='flex flex-col items-center sm:items-end justify-center'>
                <div className='md:h-40'></div>
                <button
                    className={`w-fit btn text-slate-300 uppercase select-none text-lg md:text-3xl mb-8 animated-underline transition-all duration-300 ease-out [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse`}
                    onClick={() => { }}
                >
                    START
                </button>
                <button
                    className={`w-fit btn text-slate-300 uppercase select-none text-lg md:text-3xl mb-8 animated-underline transition-all duration-300 ease-out [&:not(:hover)]:animate-pulse`}
                    onClick={() => { }}
                >
                    TOP UP
                </button>
            </div>
        </>
    );
}
