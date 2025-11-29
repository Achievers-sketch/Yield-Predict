# **App Name**: Yield Predict

## Core Features:

- Market Creation: Admin creates prediction markets with ETH or USDT assets and defined prediction windows. Only the admin can create new markets. Market info will be stored on chain.
- Deposit: Users deposit ETH or USDT into UP or DOWN pools for a specific market. Deposits happen through the smart contract.
- Yield Staking: Deposited funds are automatically staked into Aave v3 or a similar yield protocol via a Yield Strategy contract. Users can examine stats on staked tokens using the UI.
- Settlement: The smart contract automatically determines the winning pool using Chainlink Price Feeds and distributes the yield proportionally to the winners using Chainlink Keepers. Smart contract will include an admin-only method to manually settle the outcome in an emergency case.
- Principal Withdrawal: Users can withdraw their initial deposit (principal) regardless of the prediction outcome via smart contract interaction.
- Yield Claim: Winners can claim their share of the yield earned from the staking protocol via smart contract interaction.
- Market Summary: Users can view active, upcoming, and past markets, along with pool statistics, APY estimates, and countdown timers.

## Style Guidelines:

- Primary color: Vibrant purple (#9D4EDD) to convey innovation and energy, reflecting the Web3 space.
- Background color: Very light gray (#F5F3F7), a desaturated version of the primary hue, creating a clean, modern backdrop.
- Accent color: Soft pink (#F72585), analogous to the primary color, adds a playful touch to the interface and highlights interactive elements.
- Body font: 'Inter', a grotesque-style sans-serif with a modern look suitable for both headlines and body text.
- Use simple, outlined icons to represent market trends (up/down arrows) and asset types (ETH/USDT).
- A clean, component-based layout using TailwindCSS with a focus on clear data visualization and easy navigation.
- Subtle animations and transitions to provide feedback on user interactions (e.g., depositing, claiming yield).