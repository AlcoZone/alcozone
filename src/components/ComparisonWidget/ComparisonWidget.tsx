"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", alcoholRelated: 120, nonAlcoholRelated: 200 },
  { month: "February", alcoholRelated: 160, nonAlcoholRelated: 230 },
  { month: "March", alcoholRelated: 110, nonAlcoholRelated: 220 },
  { month: "April", alcoholRelated: 90, nonAlcoholRelated: 170 },
  { month: "May", alcoholRelated: 130, nonAlcoholRelated: 210 },
  { month: "June", alcoholRelated: 150, nonAlcoholRelated: 200 },
]

const alcoholColor = "#07E098"
const nonAlcoholColor = "#0095FF"

const chartConfig = {
  alcoholRelated: {
    label: "Relacionado al alcohol",
    color: alcoholColor,
  },
  nonAlcoholRelated: {
    label: "No relacionado al alcohol",
    color: nonAlcoholColor,
  },
} satisfies ChartConfig

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const month = payload[0].payload.month

    return (
      <div className="rounded-md border bg-white p-3 shadow-sm">
        <p className="text-sm font-bold">{month}</p>
        <div className="mt-1 space-y-1 text-sm">
          {payload.map((entry: any, index: number) => {
            const config = chartConfig[entry.dataKey as keyof typeof chartConfig]
            return (
              <div key={index} className="flex justify-between gap-4">
                <span className="text-muted-foreground">{config.label}:</span>
                <span style={{ color: config.color }}>{entry.value}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return null
}

export function ComparisonWidget() {
  return (
    <div style={{ paddingTop: "500px" }}>
      <Card className="w-[700px]"> {/* Aumenté de 500px a 600px */}
        <CardHeader className="text-center">
          <CardTitle>Accidentes por mes</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#ccc", strokeWidth: 1 }}
              />
              <Area
                dataKey="alcoholRelated"
                type="natural"
                fill={alcoholColor}
                fillOpacity={0.6}
                stroke={alcoholColor}
              />
              <Area
                dataKey="nonAlcoholRelated"
                type="natural"
                fill={nonAlcoholColor}
                fillOpacity={0.4}
                stroke={nonAlcoholColor}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Enero - Junio 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}



export default ComparisonWidget;
