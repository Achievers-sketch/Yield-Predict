"use client";

import { AppKitProvider } from "@reown/appkit";
import { config } from "@/lib/wallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppKitProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppKitProvider>
  );
}
