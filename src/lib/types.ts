export type Asset = "ETH" | "USDT";
export type MarketStatus = "upcoming" | "active" | "settled";
export type PredictionSide = "UP" | "DOWN";

export type Pool = {
  amount: number;
  participants: number;
};

export type Market = {
  id: string;
  asset: Asset;
  status: MarketStatus;
  predictionStartDate: Date;
  predictionEndDate: Date;
  settlementDate: Date;
  upPool: Pool;
  downPool: Pool;
  estimatedAPY: number;
  startPrice: number;
  settledPrice?: number;
  winner?: PredictionSide;
};

export type UserPosition = {
  id: string;
  marketId: string;
  side: PredictionSide;
  amount: number;
  claimed: boolean;
};

export type UserHistoryItem = {
    id: string;
    market: Market;
    position: UserPosition;
    pnl: number;
    pnlPercentage: number;
}
