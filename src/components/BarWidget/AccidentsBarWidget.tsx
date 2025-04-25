"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
}
function AccidentsBarChart({ data, config }: Props) {
  return (
    <Card className="w-full max-w-md p-4 rounded-2xl shadow-md bg-white max-h-[350px] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-2xl" style={{ color: "#001391" }}>Accidentes</CardTitle>
        <CardDescription>Enero - Diciembre 2022</CardDescription>
        <div className="flex items-center gap-2 text-sm text-green-600">
          2.1% vs el año pasado <TrendingUp className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default AccidentsBarChart