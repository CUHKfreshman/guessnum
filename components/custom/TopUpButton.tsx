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
import { useViewBalance, useMint } from "@/hooks/gameHooks";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
interface TopUpButtonProps {
  isFetching: boolean;
}
export default function TopUpButton({ isFetching }: TopUpButtonProps) {
  const {address} = useAccount();
  const balance = useViewBalance(address);
  const mint = useMint(address);
  const [mintTokenNumber, setMintTokenNumber] = useState(0);
  const { authStatus } = useAppProvider();
  const { toast } = useToast();
  const handleTopUp = () => {
    if(mintTokenNumber <= 0) {
      toast({
        title: "Invalid Top Up",
        description: "Please enter a valid number of tokens to top up",
        variant:"destructive"
      });
      return;
    }
    mint(mintTokenNumber);
    toast({
      title: "Top Up Success",
      description: `You have successfully topped up ${mintTokenNumber} tokens!`,
      variant:"success"
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        
                <button
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${isFetching?"text-slate-300/50":authStatus === 'authenticated'? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse": "text-slate-300/50 line-through"}`}
                    disabled={authStatus !== 'authenticated' || isFetching}
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
              defaultValue={balance}
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
