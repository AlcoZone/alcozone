"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import React from "react";

type ComparisonWidgetProps = {
  title: string;
  data: Array<{
    month: string;
    alcoholRelated: number;
    nonAlcoholRelated: number;
  }>;
  config: Record<string, { label: string; color: string }>;
  footer: string;
  chartHeight: number;
};

export const ComparisonWidget: React.FC<ComparisonWidgetProps> = ({
  title,
  data,
  config,
  footer,
  chartHeight,
}) => {
  function CustomTooltip({ active, payload }: any) {
    if (active && payload && payload.length) {
      const month = payload[0].payload.month;

      return (
        <div className="rounded-md border bg-white p-3 shadow-sm">
          <p className="text-sm font-bold">{month}</p>
          <div className="mt-1 space-y-1 text-sm">
            {payload.map((entry: any, index: number) => {
              const chartConfig = config[entry.dataKey as keyof typeof config];
              return (
                <div key={index} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    {chartConfig.label}:
                  </span>
                  <span style={{ color: chartConfig.color }}>
                    {entry.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="w-full h-full" style={{ paddingTop: "1px" }}>
      <Card className="flex flex-col h-full w-full">
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <ChartContainer
            config={config}
            style={{ width: "100%", height: chartHeight - 130 }}
          >
            <AreaChart data={data} margin={{ left: 12, right: 12 }}>
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#ccc", strokeWidth: 1 }}
              />
              {Object.keys(config).map((key) => {
                const chartConfig = config[key];
                return (
                  <Area
                    key={key}
                    dataKey={key}
                    type="natural"
                    fill={chartConfig.color}
                    fillOpacity={0.6}
                    stroke={chartConfig.color}
                  />
                );
              })}
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {footer}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
