# YIELD PREDICT

**A Zero-Loss Prediction Market Protocol**

YIELD PREDICT is a decentralized prediction market where users never lose their principal. Players deposit assets to predict market outcomes (UP/DOWN), all funds are pooled and staked into yield-generating protocols, and only the earned yield is distributed to winners. Everyone can withdraw their original deposit regardless of the outcome.

---

## 🎯 Key Features

- **Zero Principal Loss** - All deposits are returned to users
- **Yield-Based Rewards** - Winners share the yield earned from staking
- **Aave v3 Integration** - Automated yield generation from battle-tested DeFi protocols
- **Chainlink Price Feeds** - Trustless and accurate price settlement
- **Multi-Asset Support** - ETH and USDT markets
- **Real-Time Updates** - Live market data and predictions
- **Mobile Responsive** - Fully optimized for all devices

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 18
- Docker & Docker Compose
- MetaMask or compatible Web3 wallet
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/yield-predict.git
cd yield-predict

# Install dependencies
npm run install:all

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start local blockchain
npm run chain

# Deploy contracts (new terminal)
npm run deploy:local

# Start backend services
npm run backend:dev

# Start frontend (new terminal)
npm run frontend:dev
```

Visit `http://localhost:3000` to see the app.

---

## 📦 Tech Stack

### Smart Contracts
- **Solidity 0.8.20** - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Security-audited contract libraries
- **Chainlink** - Price feeds & automation
- **Aave v3** - Yield generation protocol

### Frontend
- **Next.js 14** - React framework with App Router
- **wagmi v2** - React hooks for Ethereum
- **RainbowKit** - Wallet connection UI
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **TanStack Query** - Data fetching & caching
- **Recharts** - Data visualization

### Backend
- **Node.js & Express** - REST API server
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Relational database
- **ethers.js** - Ethereum library
- **Bull** - Job queue for event indexing

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipelines
- **Vercel** - Frontend deployment
- **Railway** - Backend deployment

---

## 🎮 How It Works

### For Users

1. **Connect Wallet** - Use MetaMask or any WalletConnect-compatible wallet
2. **Choose Market** - Browse active prediction markets
3. **Make Prediction** - Deposit ETH/USDT and select UP or DOWN
4. **Earn Yield** - Your deposit generates yield while the market is active
5. **Settle** - After settlement, winners claim their share of yield
6. **Withdraw** - Everyone withdraws their original principal

### For Market Creators

1. Navigate to the Admin panel
2. Configure market parameters (asset, settlement time, price feed)
3. Deploy the market on-chain
4. Market automatically settles via Chainlink Keepers

---

## 🔧 Configuration

### Environment Variables

```bash
# Blockchain
PRIVATE_KEY=                    # Deployment wallet private key
RPC_URL_MAINNET=               # Mainnet RPC endpoint
RPC_URL_TESTNET=               # Testnet RPC endpoint

# Chainlink
CHAINLINK_ETH_USD_FEED=        # Price feed address
CHAINLINK_KEEPER_REGISTRY=     # Keeper registry address

# Aave
AAVE_POOL_ADDRESS=             # Aave v3 pool address
AAVE_AWETH_ADDRESS=            # aWETH token address

# Backend
DATABASE_URL=                  # PostgreSQL connection string
JWT_SECRET=                    # API authentication secret
INDEXER_START_BLOCK=          # Starting block for event indexing

# Frontend
NEXT_PUBLIC_ALCHEMY_KEY=      # Alchemy API key
NEXT_PUBLIC_WALLETCONNECT_ID= # WalletConnect project ID
```

---

## 🧪 Testing

### Run All Tests

```bash
# Unit tests
npm run test

# Coverage report
npm run test:coverage

# Gas report
npm run test:gas

# Integration tests (mainnet fork)
npm run test:fork
```


## 📊 Database Schema

```prisma
model Market {
  id              String        @id @default(uuid())
  contractAddress String        @unique
  asset           String
  startTime       DateTime
  endTime         DateTime
  settlementTime  DateTime
  finalPrice      Decimal?
  status          MarketStatus
  predictions     Prediction[]
  settlements     Settlement[]
}

model Prediction {
  id            String   @id @default(uuid())
  marketId      String
  userAddress   String
  direction     String   // UP or DOWN
  amount        Decimal
  depositedAt   DateTime
  withdrawnAt   DateTime?
  market        Market   @relation(fields: [marketId], references: [id])
}

model Settlement {
  id              String   @id @default(uuid())
  marketId        String
  winningPool     String
  totalYield      Decimal
  settledAt       DateTime
  market          Market   @relation(fields: [marketId], references: [id])
}
```

---

## 🚢 Deployment

### Testnet Deployment

```bash
# Deploy to Arbitrum Sepolia
npm run deploy:testnet

# Verify contracts
npm run verify:testnet
```

### Mainnet Deployment

```bash
# Deploy to Arbitrum One
npm run deploy:mainnet

# Verify contracts
npm run verify:mainnet
```

### Frontend Deployment

```bash
# Deploy to Vercel
vercel --prod

# Or use GitHub integration for automatic deployments
```

### Backend Deployment

```bash
# Build Docker image
docker build -t yield-predict-backend .

# Deploy to Railway/Render
# Follow platform-specific instructions
```

---

## 🛡 Security

### Audits
- Internal security review completed
- External audit: *Pending*

### Security Measures
- ReentrancyGuard on all state-changing functions
- Pausable emergency controls
- SafeERC20 for token transfers
- Ownable for admin functions
- Input validation on all parameters
- Comprehensive test coverage (>95%)

### Bug Bounty
We take security seriously. If you discover a vulnerability, please email security@yieldpredict.io

---

## 📈 Roadmap

- [x] Core prediction market functionality
- [x] Aave v3 yield integration
- [x] Frontend dApp
- [x] Event indexing system
- [ ] External security audit
- [ ] Mainnet deployment
- [ ] NFT rewards system
- [ ] Referral program
- [ ] Multi-chain expansion (Base, Optimism)
- [ ] DAO governance token
- [ ] Mobile app

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🔗 Links

- **Website:** https://yieldpredict.io
- **Documentation:** https://docs.yieldpredict.io
- **Discord:** https://discord.gg/yieldpredict
- **Twitter:** https://twitter.com/yieldpredict
- **GitHub:** https://github.com/your-org/yield-predict

---

## 👥 Team

Built with ❤️ by the YIELD PREDICT team

