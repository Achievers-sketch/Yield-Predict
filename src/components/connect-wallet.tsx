"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, User, Wallet } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ConnectWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const walletAddress = "0x1234...AbCd";

  if (!isConnected) {
    return (
      <Button onClick={() => setIsConnected(true)}>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarFallback className="bg-primary/20 text-primary text-xs">
              {walletAddress.substring(2, 4)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{walletAddress}</span>
           <span className="md:hidden">{walletAddress.substring(0,6)}...</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsConnected(false)}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
