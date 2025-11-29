import { getMarketById } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Icons } from "@/components/icons";
import PageHeader from "@/components/page-header";
import CountdownTimer from "@/components/countdown-timer";
import DepositForm from "@/components/deposit-form";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Users,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import MarketChart from "@/components/market-chart";

type MarketPageProps = {
  params: {
    id: string;
  };
};

export default function MarketPage({ params }: MarketPageProps) {
  const market = getMarketById(params.id);

  if (!market) {
    notFound();
  }

  const AssetIcon = market.asset === "ETH" ? Icons.eth : Icons.usdt;
  const totalDeposited = market.upPool.amount + market.downPool.amount;
  const totalParticipants = market.upPool.participants + market.downPool.participants;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <PageHeader
        title={`${market.asset}/USD Market`}
        description={`Prediction period: ${format(
          market.predictionStartDate,
          "PP"
        )} - ${format(market.predictionEndDate, "PP")}`}
        icon={<AssetIcon className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Price Chart</CardTitle>
              <CardDescription>
                Current price vs start price. The outcome will be settled against the Chainlink price feed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MarketChart startPrice={market.startPrice} asset={market.asset} />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-green-500/5 border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-400">
                    <ArrowUp className="mr-2 h-6 w-6" /> UP Pool
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center"><DollarSign className="h-4 w-4 mr-1"/> Pool Size</span>
                    <span className="font-bold text-lg">{formatCurrency(market.upPool.amount)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center"><Users className="h-4 w-4 mr-1"/> Participants</span>
                    <span className="font-bold text-lg">{market.upPool.participants}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-red-500/5 border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-400">
                    <ArrowDown className="mr-2 h-6 w-6" /> DOWN Pool
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center"><DollarSign className="h-4 w-4 mr-1"/> Pool Size</span>
                    <span className="font-bold text-lg">{formatCurrency(market.downPool.amount)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center"><Users className="h-4 w-4 mr-1"/> Participants</span>
                    <span className="font-bold text-lg">{market.downPool.participants}</span>
                  </div>
                </CardContent>
              </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={market.status === 'active' ? 'default' : 'secondary'} className={market.status === 'active' ? 'bg-green-500/20 text-green-500 border-green-500/30' : ''}>
                  {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                </Badge>
              </div>
               <div className="flex justify-between">
                <span className="text-muted-foreground">Prediction Ends</span>
                 <CountdownTimer
                    endDate={market.predictionEndDate}
                    prefix="Time left: "
                  />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Value Locked</span>
                <span className="font-medium">{formatCurrency(totalDeposited)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Participants</span>
                <span className="font-medium">{totalParticipants}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated APY</span>
                <span className="font-medium text-primary">{market.estimatedAPY.toFixed(2)}%</span>
              </div>
               <div className="flex justify-between">
                <span className="text-muted-foreground">Start Price</span>
                <span className="font-medium">{formatCurrency(market.startPrice)}</span>
              </div>
            </CardContent>
          </Card>
          
          {market.status === 'active' && <DepositForm asset={market.asset} />}

          {market.status === 'settled' && (
            <Card>
              <CardHeader>
                <CardTitle>Settlement Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Winning Side</span>
                  <span className={`font-bold text-lg ${market.winner === 'UP' ? 'text-green-500' : 'text-red-500'}`}>{market.winner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Settled Price</span>
                  <span className="font-medium">{formatCurrency(market.settledPrice!)}</span>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
