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
export default function TopUpButton() {
  const {address} = useAccount();
  const {data:balanceData} = useBalance({address:address});
  const { authStatus } = useAppProvider();
  return (
    <Dialog>
      <DialogTrigger asChild>
        
                <button
                    className={`w-fit btn uppercase select-none text-lg md:text-3xl mb-8  transition-all duration-300 ease-out ${authStatus === 'authenticated'? "animated-underline text-slate-300 [&:not(:hover)]:animate-pulse [&:not(:focus)]:animate-pulse": "text-slate-300/50 line-through"}`}
                    disabled={authStatus !== 'authenticated'}
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
              defaultValue={0}
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
              defaultValue={0}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Top Up</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
