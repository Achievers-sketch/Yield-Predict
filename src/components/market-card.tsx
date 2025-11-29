import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { type Market } from "@/lib/types";
import { Icons } from "@/components/icons";
import { ArrowUp, ArrowDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type MarketCardProps = {
  market: Market;
};

export default function MarketCard({ market }: MarketCardProps) {
  const AssetIcon = market.asset === "ETH" ? Icons.eth : Icons.usdt;
  const totalDeposited = market.upPool.amount + market.downPool.amount;
  const upPercentage =
    totalDeposited > 0 ? (market.upPool.amount / totalDeposited) * 100 : 50;
  
  const getStatusInfo = () => {
    switch(market.status) {
      case 'active':
        return `Ends in ${formatDistanceToNow(market.predictionEndDate, { addSuffix: true })}`;
      case 'upcoming':
        return `Starts on ${format(market.predictionStartDate, "MMM d")}`;
      case 'settled':
        return `Settled on ${format(market.settlementDate, "MMM d")}`;
      default:
        return '';
    }
  }

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AssetIcon className="h-8 w-8" />
            <CardTitle className="text-xl">
              {market.asset}/USD
            </CardTitle>
          </div>
          <Badge variant={market.status === 'active' ? 'default' : 'secondary'} className={market.status === 'active' ? 'bg-green-500/20 text-green-500 border-green-500/30' : ''}>
            {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>{getStatusInfo()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <div className="flex justify-between items-center text-sm mb-1">
              <span className="flex items-center text-green-500 font-medium"><ArrowUp className="h-4 w-4 mr-1"/> UP</span>
              <span className="flex items-center text-red-500 font-medium">DOWN <ArrowDown className="h-4 w-4 ml-1"/></span>
          </div>
          <Progress value={upPercentage} className="h-3" />
          <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
              <span>{upPercentage.toFixed(0)}%</span>
              <span>{(100 - upPercentage).toFixed(0)}%</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <p className="text-muted-foreground">Total Value Locked</p>
            <p className="font-bold text-lg">{formatCurrency(totalDeposited, 'USD')}</p>
          </div>
          <div className="text-sm text-right">
            <p className="text-muted-foreground">Est. APY</p>
            <p className="font-bold text-lg text-primary">{market.estimatedAPY.toFixed(2)}%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/markets/${market.id}`}>
            {market.status === 'settled' ? 'View Result' : 'Go to Market'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
