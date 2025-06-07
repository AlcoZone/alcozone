"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  data: { report_source: string; total_accidents: number }[];
  config: Record<string, { label: string; color: string }>;
  title: string;
  description: string;
  chartHeight: number;
};

const ReportChannelWidget = ({
  data,
  config,
  title,
  description,
  chartHeight,
}: Props) => {
  return (
    <div className="w-full h-full">
      <Card className="flex flex-col h-full w-full">
        <CardHeader>
          <CardTitle className="text-1xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ChartContainer
            config={config}
            style={{ width: "100%", height: chartHeight - 130 }}
          >
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="report_source"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                scale="log"
                domain={["auto", "auto"]}
                ticks={[1, 10, 100, 1000, 10000]}
              />
              {
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
              }
              {Object.entries(config).map(([key, { color }]) => (
                <Bar key={key} dataKey={key} fill={color} radius={4} />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportChannelWidget;
