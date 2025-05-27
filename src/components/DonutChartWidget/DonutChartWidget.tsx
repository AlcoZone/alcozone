import * as React from "react"
import { PieChart, Pie, Cell, Label } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type AccidenteDonut = {
  town: string 
  total_accidents: string // número como string
}

type DonutChartProps = {
  title: string;
  footer: string;
  centerLabel: string;
  data: AccidenteDonut[];
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57", "#a4de6c", "#d084d8"]

export const DonutChartWidget: React.FC<DonutChartProps> = ({
  title,
  footer,
  centerLabel,
  data,
}) => {
  // Convertimos los datos a números reales
  const chartData = React.useMemo(() => {
    return data.map((item) => ({
      ...item,
      total_accidents: Number(item.total_accidents),
    }))
  }, [data])

  const totalAccidents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total_accidents, 0)
  }, [chartData])

  return (
    <div style={{ paddingTop: "1px" }}>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{footer}</CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center items-center">
          <PieChart width={120} height={120}>
            <Pie
              data={chartData}
              dataKey="total_accidents"
              nameKey="town"
              innerRadius={40}
              outerRadius={60}
              stroke="none"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

              <Label
                position="center"
                content={({ viewBox }) => {
                  if (!viewBox) return null
                  const { cx, cy } = viewBox
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={cx}
                        y={cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalAccidents.toLocaleString()}
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + 24}
                        className="fill-muted-foreground text-sm"
                      >
                        {centerLabel}
                      </tspan>
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 text-sm pt-4">
          {chartData.map((entry, index) => {
            const percentage = ((entry.total_accidents / totalAccidents) * 100).toFixed(1)
            return (
              <div key={entry.town} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="font-medium">{entry.town}</span>
                <span className="text-muted-foreground">– {percentage}%</span>
              </div>
            )
          })}
        </CardFooter>
      </Card>
    </div>
  )
}

