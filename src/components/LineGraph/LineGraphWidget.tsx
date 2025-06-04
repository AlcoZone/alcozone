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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


type Props = {
  data: { accident_date: string; total_accidents: number }[];
  config: Record<string, { label: string; color: string }>;
  title: string;
  description: string;
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
        <CardTitle className="text-1xl">{title}</CardTitle>
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
              dataKey="accident_date"
              tickLine={false}
              axisLine={false}
              tickFormatter={() => ""}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              labelFormatter={(label) => {
                if (!label) return "";
                const [year, month, day] = label.split("-");
                return `${day}-${month}-${year}`;
              }}
            />
            {Object.entries(config).map(([key, { color }]) => (
              <Line
                key={key}
                dataKey={key}
                type="monotone"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default LineGraphWidget;
