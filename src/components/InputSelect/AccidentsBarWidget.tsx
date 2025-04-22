"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
const chartData = [
  { month: "Enero", desktop: 186, mobile: 80 },
  { month: "Febrero", desktop: 305, mobile: 200 },
  { month: "Marzo", desktop: 237, mobile: 120 },
  { month: "Abril", desktop: 73, mobile: 190 },
  { month: "Mayo", desktop: 209, mobile: 130 },
  { month: "Junio", desktop: 214, mobile: 140 },
  { month: "Julio", desktop: 214, mobile: 140 },
  { month: "Agosto", desktop: 214, mobile: 140 },
  { month: "Septiembre", desktop: 214, mobile: 140 },
  { month: "Octubre", desktop: 214, mobile: 140 },
  { month: "Noviembre", desktop: 200, mobile: 57 },
  { month: "Diciembre", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "2022",
    color: "hsl(var(--chart-1))",
    
  },
  mobile: {
    label: "2021",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accidentes</CardTitle>
        <CardDescription>Enero - Diciembre 2022</CardDescription>
        <div className="flex gap-2 font-medium leading-none ">
          2.1% vs el año pasado <TrendingUp className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
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

export default Component
