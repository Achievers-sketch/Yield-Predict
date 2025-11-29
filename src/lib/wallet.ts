import { createConfig } from "@reown/appkit";
import { http } from "viem";
import { mainnet, arbitrum, sepolia } from "viem/chains";
import { walletConnect, injected } from "@reown/appkit-adapter-wagmi";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID!;

if (!walletConnectProjectId) {
  throw new Error(
    "WalletConnect project ID is not defined. Please check your environment variables."
  );
}

export const config = createConfig({
  chains: [mainnet, arbitrum, sepolia],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [sepolia.id]: http(),
  },
  wallets: [
    walletConnect({
      projectId: walletConnectProjectId,
      metadata: {
        name: "Yield Predict",
        description: "Zero-Loss Prediction Market",
        url: "https://yieldpredict.io",
        icons: ["https://yieldpredict.io/icon.png"],
      },
    }),
    injected({
      target: "metaMask",
    }),
    injected({
        target: "coinbaseWallet",
      }),
  ],
  ssr: true,
});
