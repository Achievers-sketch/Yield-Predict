import PageHeader from "@/components/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getUserHistory, getUserPositions } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import {
  DollarSign,
  PieChart,
  Target,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
  const positions = getUserPositions();
  const history = getUserHistory();
  
  const totalPrincipal = positions.reduce((sum, pos) => sum + pos.amount, 0);
  const activePredictions = positions.length;
  // This is a mock value
  const claimableYield = 125.42;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <PageHeader title="My Dashboard" />

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Principal
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPrincipal)}</div>
            <p className="text-xs text-muted-foreground">
              Your entire deposited amount is safe.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Predictions
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePredictions}</div>
            <p className="text-xs text-muted-foreground">
              Across all active markets.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claimable Yield</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(claimableYield)}</div>
            <p className="text-xs text-muted-foreground">
              From settled winning predictions.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Active Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Market</TableHead>
                <TableHead>Your Side</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Ends In</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.length > 0 ? (
                positions.map((pos) => {
                  const AssetIcon = pos.market.asset === 'ETH' ? Icons.eth : Icons.usdt;
                  return (
                    <TableRow key={pos.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <AssetIcon className="h-5 w-5" />
                        {pos.market.asset}/USD
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            pos.side === "UP"
                              ? "text-green-500 border-green-500/50"
                              : "text-red-500 border-red-500/50"
                          )}
                        >
                          {pos.side === "UP" ? (
                            <ArrowUp className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDown className="mr-1 h-3 w-3" />
                          )}
                          {pos.side}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(pos.amount, pos.market.asset === 'USDT' ? 'USD' : pos.market.asset)}
                      </TableCell>
                       <TableCell>
                        {formatDistanceToNow(pos.market.predictionEndDate, { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                           <Link href={`/markets/${pos.marketId}`}>View Market</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    You have no active positions.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Prediction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Market</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Your Position</TableHead>
                <TableHead className="text-right">PnL</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
               {history.length > 0 ? (
                history.map((item) => {
                  const AssetIcon = item.market.asset === 'ETH' ? Icons.eth : Icons.usdt;
                  const didWin = item.market.winner === item.position.side;
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <AssetIcon className="h-5 w-5" />
                        {item.market.asset}/USD
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.market.winner} win</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={cn("font-medium", didWin ? "text-green-500" : "text-red-500")}>
                          {item.position.side} - {formatCurrency(item.position.amount, item.market.asset === 'USDT' ? 'USD' : item.market.asset)}
                        </span>
                      </TableCell>
                      <TableCell className={cn("text-right font-semibold", didWin ? "text-green-500" : "text-red-500")}>
                        {didWin ? `+${formatCurrency(item.pnl)}` : "Principal Back"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" disabled={!didWin || item.position.claimed}>
                          {item.position.claimed ? 'Claimed' : 'Claim Yield'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                 <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No prediction history yet.
                  </TableCell>
                </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
