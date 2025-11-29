"use client";

import {
  ConnectButton,
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "@reown/appkit";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { copyToClipboard } from "@reown/appkit/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { truncateAddress } from "@reown/appkit/utils";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const { toast } = useToast();

  const handleCopy = () => {
    if (address) {
      copyToClipboard(address);
      toast({ title: "Address copied to clipboard" });
    }
  };

  if (!isConnected) {
    return (
      <ConnectButton.Custom>
        {({ open }) => (
          <Button onClick={open}>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        )}
      </ConnectButton.Custom>
    );
  }

  const displayName = ensName ?? truncateAddress(address!);
  const displayAddress = truncateAddress(address!, 6, 4);

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Avatar className="h-6 w-6 mr-2">
              {ensAvatar && <AvatarImage src={ensAvatar} alt={ensName!} />}
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                {displayName?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline">{displayName}</span>
            <span className="md:hidden">{displayAddress}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem onSelect={handleCopy}>
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => disconnect()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConnectButton.Modal
        theme={{
          colorMode: "dark",
          accentColor: "purple",
          font: "sans",
          radius: "md",
        }}
        lang="en-US"
        title="Connect to Yield Predict"
        hideTooltips={false}
      />
    </div>
  );
}
