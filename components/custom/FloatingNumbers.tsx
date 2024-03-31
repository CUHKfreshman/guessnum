"use client"

import { useEffect, useState } from "react";
let numberId = 0; // unique identifier
export default function FloatingNumbers() {
    const [numbers, setNumbers] = useState<{ id: number; value: number; left: number; duration: number }[]>([]);

    useEffect(() => {
        // Function to generate and add a new number
        const generateNumber = () => {
            const newNumber = {
                id: numberId++, // Increment the identifier
                value: Math.floor(Math.random() * 10),
                left: Math.floor(Math.random() * 100),
                duration: Math.max(Math.floor(Math.random() * 10), 5),
            };
            numberId %= 1000;
            
            setNumbers((prevNumbers) => [...prevNumbers, newNumber]);
    
            // Remove numbers that have finished animating after a delay
            setTimeout(() => {
                setNumbers((prevNumbers) => prevNumbers.filter((number) => number.id !== newNumber.id));
            }, newNumber.duration * 1000); // Adjusted to use the duration for each number
        };
    
        // Generate the first number immediately
        generateNumber();
    
        // Set up the interval to generate numbers
        const interval = setInterval(() => {
            generateNumber();
        }, 300); // Generate a new number every 300 milliseconds
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            {numbers.map(({ id, value, left, duration }) => (
                <div
                    key={id}
                    className="fixed top-0 text-slate-400 z-[1]"
                    style={{
                        left: `${left}%`,
                        animation: `float ${duration}s ease-in forwards`,
                    }}
                >
                    {value}
                </div>
            ))}
        </>
    )
}