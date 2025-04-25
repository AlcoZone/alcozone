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

type DonutChartProps = {
  /** Title of the chart */
  title: string;
  /** Description shown below the title */
  footer: string;
  /** Text shown in the center of the chart */
  centerLabel: string;
  /** Data for the pie chart */
  data: Array<{
    category: string;
    visitors: number;
    fill: string;
  }>;
}

export const DonutChartWidget: React.FC<DonutChartProps> = ({
  title,
  footer,
  centerLabel,
  data,
}) => {
  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [data])

  return (
    <div style={{ paddingTop: "1px" }}>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{footer}</CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center items-center">
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              dataKey="visitors"
              nameKey="category"
              innerRadius={60}
              outerRadius={100}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
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
                        {totalVisitors.toLocaleString()}
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
          {data.map((entry) => {
            const percentage = ((entry.visitors / totalVisitors) * 100).toFixed(1)
            return (
              <div key={entry.category} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="font-medium">{entry.category}</span>
                <span className="text-muted-foreground">– {percentage}%</span>
              </div>
            )
          })}
        </CardFooter>
      </Card>
    </div>
  )
}
