"use client"

import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Asset } from "@/lib/types"

type MarketChartProps = {
  startPrice: number
  asset: Asset
}

export default function MarketChart({ startPrice, asset }: MarketChartProps) {
  const chartData = useMemo(() => {
    const data = []
    const days = 30;
    const volatility = asset === 'ETH' ? 0.05 : 0.0005;

    let price = startPrice
    for (let i = days; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        price += (Math.random() - 0.5) * price * volatility;
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: parseFloat(price.toFixed(asset === 'ETH' ? 2 : 4)),
        })
    }
    return data
  }, [startPrice, asset]);

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--primary))",
    },
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
            tickFormatter={(value) => `$${value}`}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={70}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="price"
            type="natural"
            fill="var(--color-price)"
            fillOpacity={0.1}
            stroke="var(--color-price)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
