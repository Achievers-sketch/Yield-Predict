"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import ConnectWallet from "@/components/connect-wallet";
import { useState } from "react";
import { useAccount } from "@reown/appkit";

const navLinks = [
  { href: "/", label: "Markets" },
  { href: "/dashboard", label: "Dashboard", protected: true },
  { href: "/admin", label: "Admin", protected: true },
];

export default function Header() {
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredNavLinks = navLinks.filter(link => !link.protected || isConnected);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold hidden sm:inline-block font-headline">
            Yield Predict
          </span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {filteredNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ConnectWallet />
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href="/"
                      className="flex items-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ShieldCheck className="h-6 w-6 text-primary" />
                      <span className="font-bold">Yield Predict</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col space-y-4">
                  {filteredNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg transition-colors hover:text-primary",
                        pathname === link.href
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
