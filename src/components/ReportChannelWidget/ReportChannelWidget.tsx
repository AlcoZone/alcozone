"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  data: { report_source: string; total_accidents: number }[];
  config: ChartConfig;
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
          <CardTitle className="text-2xl" style={{ color: "#001391" }}>
            {title}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-green-600">
            {description} <TrendingUp className="h-4 w-4" />
          </div>
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
                ticks={[10, 100, 1000, 10000]}
              />
              {
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
              }
              <Bar
                dataKey="total_accidents"
                fill="var(--color-desktop)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportChannelWidget;
