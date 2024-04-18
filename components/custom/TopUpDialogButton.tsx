"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppProvider } from "@/providers/appContextProvider";
import { useAccount, useBalance } from "wagmi";
import { useReadGncBalanceOf, useWriteGncBuy } from "@/hooks/generated";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useWaitForTransactionReceipt } from "wagmi";
interface TopUpDialogButtonProps {
  gameStatus: "InSinglePlayerGame" | "InMultiPlayerGame" | "NotInGame" | "StartingSinglePlayerGame" | "StartingMultiPlayerGame";
}
export default function TopUpDialogButton({ gameStatus }: TopUpDialogButtonProps) {
  const {address} = useAccount();
  const {data:balance} = useReadGncBalanceOf({account:address, args:[address as `0x${string}`]});
  const {data:buyHash, isSuccess: isBuySent, writeContract} = useWriteGncBuy();
  const [mintTokenNumber, setMintTokenNumber] = useState(0);
  const { authStatus } = useAppProvider();
  const { toast } = useToast();
  const { isLoading: isBuyConfirming, isSuccess: isBuyConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash: buyHash, 
    }) 
  const handleTopUp = () => {
    if(address === undefined) {
      toast({
        title: "Invalid Address",
        description: "Please connect your wallet to top up.",
        variant:"destructive"
      });
      return;
    }
    if(mintTokenNumber <= 0) {
      toast({
        title: "Invalid Top Up",
        description: "Please enter a valid number of tokens to top up.",
        variant:"destructive"
      });
      return;
    }
    writeContract({account:address, args:[address, BigInt(mintTokenNumber)]})
    toast({
      title: "Top Up In Progress",
      description: `Waiting for transaction to be confirmed...`,
    });
  }
  useEffect(() => {
    if(isBuySent) {
      toast({
        title: "Top Up Success",
        description: `You have successfully topped up ${mintTokenNumber} tokens!`,
        variant:"success"
      });
      setMintTokenNumber(0);
    }
  }, [isBuySent]);
  useEffect(() => {
    if(isBuyConfirmed) {
      toast({
        title: "Transaction Confirmed",
        description: `Previsou top up has been confirmed in the blockchain.`,
      });
    }
  }, [isBuyConfirmed]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        
                <button
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${gameStatus!=="NotInGame"?"text-slate-300/50":authStatus === 'authenticated'? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse": "text-slate-300/50 line-through"}`}
                    disabled={authStatus !== 'authenticated' || gameStatus!=="NotInGame"}
                >
                    TOP UP
                </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Top Up</DialogTitle>
          <DialogDescription>
            Get to play more games by topping up your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="remaining-tokens" className="text-right">
              Remaining Tokens
            </Label>
            <Input
              id="remaining-tokens"
              defaultValue={balance?.toString() ?? 0}
              className="col-span-3"
              disabled={true}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="add-token" className="text-right">
              Get More Tokens
            </Label>
            <Input
              id="add-token"
              onChange={(e) => setMintTokenNumber(parseInt(e.target.value))}
              defaultValue={0}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleTopUp}>Top Up</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
