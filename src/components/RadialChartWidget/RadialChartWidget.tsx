"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const MAX_VALUE = 100

export type RadialChartProps = {
  title: string
  footer?: string
  chartDataList: {
    label: string
    value: number
    fill: string
  }[]
}

export function RadialChartWidget({
  title,
  footer,
  chartDataList,
}: RadialChartProps) {
  return (
    <div style={{ paddingTop: "1px" }}>
      <Card className="flex flex-col w-full max-w-1xl mx-auto p-6">
        <CardHeader className="items-center pb-4">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>Porcentaje de accidentes</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 pb-6">
          {chartDataList.map((data, index) => {
            const translateClass = index === 1 ? "translate-y-6" : "translate-y-0"

            const chartData = [
              { name: data.label, value: data.value, fill: data.fill },
              { name: "Resto", value: MAX_VALUE - data.value, fill: "#eee" },
            ]

            return (
              <div
                key={index}
                className={`mx-auto aspect-square w-full max-w-[300px] min-w-[240px] transform ${translateClass}`}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    data={chartData}
                    startAngle={0}
                    endAngle={270}
                    innerRadius="50%"
                    outerRadius="90%"
                  >
                    <PolarGrid gridType="circle" radialLines={false} stroke="#eee" />
                    <RadialBar dataKey="value" background cornerRadius={10} />
                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {data.value.toLocaleString()}%
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 30}
                                  className="fill-muted-foreground text-base"
                                >
                                  {data.label}
                                </tspan>
                              </text>
                            )
                          }
                          return null
                        }}
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            )
          })}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 text-sm">
          {footer && <span>{footer}</span>}
        </CardFooter>
      </Card>
    </div>
  )
}

export default RadialChartWidget
