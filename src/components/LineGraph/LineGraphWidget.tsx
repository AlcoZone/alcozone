"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
  data: { date: string; accidents: number }[]
  config: ChartConfig
  title: string
  description: string
}

const LineGraphWidget = ({
  data,
  config,
  title,
  description,
}: Props) => {
  return (
    <Card className="w-full max-w-md p-4 rounded-2xl shadow-md bg-white max-h-[330px] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-2xl" style={{ color: "#001391" }}>{title}</CardTitle>
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
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={() => ""}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="accidents"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default LineGraphWidget;
