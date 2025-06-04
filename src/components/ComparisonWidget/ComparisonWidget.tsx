import { Area, AreaChart, Tooltip, ResponsiveContainer } from "recharts";
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
  data: Array<{ month_name: string; accidents: string | number }>;
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
      const month = payload[0].payload.month_name;

      return (
        <div className="rounded-md border bg-white p-3 shadow-sm">
          <p className="text-sm font-bold">{month}</p>
          <div className="mt-1 space-y-1 text-sm">
            {payload.map((entry: any, index: number) => {
              const chartConfig = config[entry.dataKey];
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
    <div style={{ paddingTop: "1px" }}>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 210 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.map((item) => ({
                  ...item,
                  accidents: Number(item.accidents),
                }))}
                margin={{ left: 12, right: 12 }}
              >
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
            </ResponsiveContainer>
          </div>
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
