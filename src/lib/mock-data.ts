import { addDays, subDays } from "date-fns";
import type { Market, UserHistoryItem, UserPosition, MarketStatus, Asset } from "./types";

const now = new Date();

const mockMarkets: Market[] = [
  {
    id: "eth-usd-active-1",
    asset: "ETH",
    status: "active",
    predictionStartDate: subDays(now, 2),
    predictionEndDate: addDays(now, 5),
    settlementDate: addDays(now, 6),
    upPool: { amount: 150.5, participants: 42 },
    downPool: { amount: 80.2, participants: 28 },
    estimatedAPY: 12.5,
    startPrice: 3400.0,
  },
  {
    id: "usdt-usd-active-1",
    asset: "USDT",
    status: "active",
    predictionStartDate: subDays(now, 1),
    predictionEndDate: addDays(now, 3),
    settlementDate: addDays(now, 4),
    upPool: { amount: 500000, participants: 150 },
    downPool: { amount: 750000, participants: 200 },
    estimatedAPY: 8.2,
    startPrice: 1.0001,
  },
  {
    id: "eth-usd-upcoming-1",
    asset: "ETH",
    status: "upcoming",
    predictionStartDate: addDays(now, 1),
    predictionEndDate: addDays(now, 8),
    settlementDate: addDays(now, 9),
    upPool: { amount: 0, participants: 0 },
    downPool: { amount: 0, participants: 0 },
    estimatedAPY: 15.0,
    startPrice: 0,
  },
    {
    id: "eth-usd-settled-1",
    asset: "ETH",
    status: "settled",
    predictionStartDate: subDays(now, 10),
    predictionEndDate: subDays(now, 3),
    settlementDate: subDays(now, 2),
    upPool: { amount: 120.3, participants: 35 },
    downPool: { amount: 200.8, participants: 50 },
    estimatedAPY: 11.3,
    startPrice: 3200.0,
    settledPrice: 3350.0,
    winner: "UP",
  },
    {
    id: "usdt-usd-settled-1",
    asset: "USDT",
    status: "settled",
    predictionStartDate: subDays(now, 15),
    predictionEndDate: subDays(now, 8),
    settlementDate: subDays(now, 7),
    upPool: { amount: 1200000, participants: 350 },
    downPool: { amount: 800000, participants: 250 },
    estimatedAPY: 7.8,
    startPrice: 0.9998,
    settledPrice: 0.9995,
    winner: "DOWN",
  },
];

const mockUserPositions: UserPosition[] = [
    { id: "pos-1", marketId: "eth-usd-active-1", side: "UP", amount: 10, claimed: false },
    { id: "pos-2", marketId: "usdt-usd-active-1", side: "DOWN", amount: 5000, claimed: false },
];

const mockUserHistory: UserHistoryItem[] = [
    {
        id: "hist-1",
        market: mockMarkets.find(m => m.id === "eth-usd-settled-1")!,
        position: { id: "pos-hist-1", marketId: "eth-usd-settled-1", side: "UP", amount: 5, claimed: true },
        pnl: 150.25,
        pnlPercentage: 0.93,
    },
    {
        id: "hist-2",
        market: mockMarkets.find(m => m.id === "usdt-usd-settled-1")!,
        position: { id: "pos-hist-2", marketId: "usdt-usd-settled-1", side: "UP", amount: 10000, claimed: true },
        pnl: 0,
        pnlPercentage: 0,
    }
];

export const getMarkets = (status?: MarketStatus): Market[] => {
    if (status) {
        return mockMarkets.filter(m => m.status === status);
    }
    return mockMarkets;
}

export const getMarketById = (id: string): Market | undefined => {
    return mockMarkets.find(m => m.id === id);
}

export const getUserPositions = (): (UserPosition & { market: Market })[] => {
    return mockUserPositions.map(pos => ({
        ...pos,
        market: mockMarkets.find(m => m.id === pos.marketId)!,
    }));
}

export const getUserHistory = (): UserHistoryItem[] => {
    return mockUserHistory;
}
