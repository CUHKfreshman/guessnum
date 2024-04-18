// hooks/useViewBalance.ts
import { useEffect, useState, useCallback } from 'react';
import fakeApi from '@/apis/gameApi';


export function useViewBalance(account: any): number {
    const [balance, setBalance] = useState(0);
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer + 1);
        }
            , 1000);
            // Clean up the interval when the component unmounts
            return () => clearInterval(interval);
    },[]);

    useEffect(() => {
        console.log('Fetching balance...')
        // Simulate fetching balance based on account - in this case, we ignore the account since it's a mock
        fakeApi.erc20.view_balance().then(setBalance);
    }, [account, timer]);

    return balance;
}
interface UseJoinGameProps {
    gameType: 'SinglePlayerGame' | 'MultiPlayerGame';
}

export function useJoinGame({ gameType }: UseJoinGameProps): [boolean, () => Promise<void>] {
    const [inGame, setInGame] = useState(false);

    const joinGame = async () => {
        const message = await fakeApi[gameType].join_game();
        console.log(message);  // Optional: handle the message in UI
        setInGame(true);
    };

    return [inGame, joinGame];
}
interface UseSendGuessProps {
    gameType: 'SinglePlayerGame' | 'MultiPlayerGame';
}

export function useSendGuess({ gameType }: UseSendGuessProps): [string, (number: number) => Promise<void>] {
    const [status, setStatus] = useState('');

    const sendGuess = useCallback(async (number: number) => {
        const response = await fakeApi[gameType].send_guess(number);
        setStatus(response);
    }, [gameType]);

    return [status, sendGuess];
}


export function useMint(address:any):(amount:number)=> Promise<number>{

    const mint = (amount:number)=> fakeApi.erc20.mint(amount);

    return mint;
}
interface UseCheckGameStatusProps {
    gameType: 'SinglePlayerGame' | 'MultiPlayerGame';
}

export function useCheckGameStatus({ gameType }: UseCheckGameStatusProps) {
    const [gameStatus, setGameStatus] = useState<{
        guessedNumbers: number[];
        gameEnded: boolean;
        myTurn?: boolean;     // This will be undefined for singlePlayer
        prizePool: number;
        round?: number;       // This will be undefined for singlePlayer
    }>({
        guessedNumbers: [],
        gameEnded: false,
        prizePool: 0,
    });

    useEffect(() => {
        const fetchStatus = async () => {
            if (gameType === 'SinglePlayerGame') {
                const { guessedNumbers, gameEnded, prizePool } = await fakeApi[gameType].check_game_status();
                setGameStatus({
                    guessedNumbers,
                    gameEnded,
                    prizePool,
                });
            } else if (gameType === 'MultiPlayerGame') {
                const { guessedNumbers, gameEnded, prizePool, round, myTurn } = await fakeApi[gameType].check_game_status();
                setGameStatus({
                    guessedNumbers,
                    gameEnded,
                    prizePool,
                    round,
                    myTurn,
                });
            }
        };

        fetchStatus();
    }, [gameType]);

    return gameStatus;
}