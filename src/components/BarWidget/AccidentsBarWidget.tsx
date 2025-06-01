"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  data: { month: string; month1: number; month2: number }[];
  config: ChartConfig;
  title: string;
  subtitle: string;
  description: string;
  chartHeight: number;
};

const AccidentsBarChart = ({
  data,
  config,
  title,
  subtitle,
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
          <CardDescription>{subtitle}</CardDescription>
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
              <Bar dataKey="month1" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="month2" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccidentsBarChart;
