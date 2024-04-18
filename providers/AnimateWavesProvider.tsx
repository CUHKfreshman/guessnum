import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimateWavesContextType {
    animateWaves: boolean;
    setAnimateWaves: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnimateWavesContext = createContext<AnimateWavesContextType | undefined>(undefined);

export default function AnimateWavesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [animateWaves, setAnimateWaves] = useState<boolean>(false);

    return (
        <AnimateWavesContext.Provider value={{ animateWaves, setAnimateWaves }}>
            {children}
        </AnimateWavesContext.Provider>
    );
};
export const useAnimateWavesProvider = () => {
    const context = useContext(AnimateWavesContext);
    if (!context) {
        throw new Error('useAnimateWavesProvider must be used within a AnimateWavesProvider');
    }
    return context;
};