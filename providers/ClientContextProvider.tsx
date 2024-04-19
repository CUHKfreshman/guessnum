import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useReadSinglePlayerGameGetPlayerGameNumber,useReadMatchMakingGetPlayerRoomNumber } from "@/hooks/generated";
interface ClientContextContextType {
    address: `0x${string}`;
    singlePlayerGameNumber: bigint;
    multiPlayerGameNumber: bigint;
}

const ClientContextContext = createContext<ClientContextContextType | undefined>(undefined);

export default function ClientContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [_address, set_address] = useState<`0x${string}`>("0x0");
    const [_singlePlayerGameNumber, _setSinglePlayerGameNumber] = useState<bigint>(BigInt(0));
    const [_matchMakingRoomNumber, _setMatchMakingRoomNumber] = useState<bigint>(BigInt(0));
    const {data:singlePlayerGameNumber} = useReadSinglePlayerGameGetPlayerGameNumber({account:_address,args:[_address]});
    const {data:matchMakingRoomNData} = useReadMatchMakingGetPlayerRoomNumber({account:_address,args:[_address]});
    const {address} = useAccount();
    useEffect(() => {
        if(address){
            console.log("provider address",address);
            set_address(address);
        }
    }, [address]);
    useEffect(() => {
        if(singlePlayerGameNumber){
            console.log("provider singlePlayerGameNumber",singlePlayerGameNumber);
            _setSinglePlayerGameNumber(singlePlayerGameNumber);
        }
    }, [singlePlayerGameNumber]);
    useEffect(() => {
        if(matchMakingRoomNData?.[0]){
            console.log("provider matchMakingRoomData",matchMakingRoomNData?.[0]);
            _setMatchMakingRoomNumber(matchMakingRoomNData[0]);
        }
    }, [matchMakingRoomNData]);
    return (
        <ClientContextContext.Provider value={{ address:_address, singlePlayerGameNumber:_singlePlayerGameNumber,multiPlayerGameNumber:_matchMakingRoomNumber }}>
            {children}
        </ClientContextContext.Provider>
    );
};
export const useClientContextProvider = () => {
    const context = useContext(ClientContextContext);
    if (!context) {
        throw new Error('useClientContextProvider must be used within a ClientContextProvider');
    }
    return context;
};