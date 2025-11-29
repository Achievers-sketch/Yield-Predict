"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Asset } from "@/lib/types"
import { getChainlinkPriceHistory, PriceDataPoint } from "@/lib/chainlink"
import { Skeleton } from "./ui/skeleton"

type MarketChartProps = {
  startPrice: number
  asset: Asset
}

export default function MarketChart({ startPrice, asset }: MarketChartProps) {
  const [chartData, setChartData] = useState<PriceDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getChainlinkPriceHistory(asset, startPrice);
      setChartData(data);
      setLoading(false);
    }
    fetchData();
  }, [startPrice, asset]);

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--primary))",
    },
  }

  if (loading) {
      return (
          <div className="h-[300px] w-full flex items-center justify-center">
              <Skeleton className="h-full w-full" />
          </div>
      )
  }

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 6)}
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => `$${Number(value).toFixed(asset === 'ETH' ? 0 : 4)}`}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={80}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={<ChartTooltipContent indicator="dot" formatter={(value, name, props) => [`$${Number(value).toFixed(asset === 'ETH' ? 2 : 4)}`, 'Price']}/>}
          />
          <defs>
            <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-price)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-price)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="price"
            type="natural"
            fill="url(#fillPrice)"
            stroke="var(--color-price)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
