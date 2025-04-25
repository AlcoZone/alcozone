"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Props = {
  data: { month: string; desktop: number; mobile: number }[]
  config: ChartConfig
  title?: string
  description?: string
  summary?: string
  accidents?: string
}

function LineChartMultiple({
  data,
  config,
  title = "Accidentes por alcoholismo",
  description = "2023 vs 2024",
  summary = "2.1% vs año pasado",
  accidents = "56, 799",
}: Props) {
  return (
    <Card className="w-full max-w-md p-4 rounded-2xl shadow-md bg-white max-h-[350px] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-2xl" style={{ color: "#001391" }}>{title}</CardTitle>
        
        <div className="text-xl font-bold">{accidents}</div>
        
        <div className="flex items-center gap-2 text-sm text-red-600">
          {summary}
          <TrendingDown className="h-4 w-4" />
        </div>

        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <LineChart
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default LineChartMultiple