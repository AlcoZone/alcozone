import * as React from "react";
import { PieChart, Pie, Cell, Label, LabelProps } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { de } from "date-fns/locale";

type AccidenteDonut = {
  town: string;
  total_accidents: string; // número como string
};

type DonutChartProps = {
  title: string;
  footer: string;
  centerLabel: string;
  data: AccidenteDonut[];
  chartHeight?: number;
};

const COLORS = ["#C7CEFF", "#5A6ACF"];

export const DonutChartWidget: React.FC<DonutChartProps> = ({
  title,
  footer,
  centerLabel,
  data,
  chartHeight,
}) => {
  const chartData = React.useMemo(() => {
    return data.map((item) => ({
      ...item,
      total_accidents: Number(item.total_accidents),
    }));
  }, [data]);

  const totalAccidents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total_accidents, 0);
  }, [chartData]);

  const defaultHeight = 150;

  return (
    <Card className={`w-full ${chartHeight ? "h-full" : ""}`}>
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{footer}</CardDescription>
      </CardHeader>

      <CardContent
        className={`flex justify-center items-center ${
          chartHeight ? "flex-1" : ""
        }`}
      >
        <ChartContainer
          config={{}}
          style={{
            width: "100%",
            height:
              chartHeight !== undefined ? chartHeight - 180 : defaultHeight,
          }}
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="total_accidents"
              nameKey="town"
              innerRadius="70%"
              outerRadius="100%"
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
                content={({ viewBox }: LabelProps) => {
                  if (!viewBox) return null;
                  const cx = (viewBox as any).cx || 0;
                  const cy = (viewBox as any).cy || 0;
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
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 text-sm pt-4">
        {chartData.map((entry, index) => {
          const percentage = (
            (entry.total_accidents / totalAccidents) *
            100
          ).toFixed(1);
          return (
            <div
              key={`${entry.town}-${index}`}
              className="flex items-center gap-2"
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <span className="font-medium">{entry.town}</span>
              <span className="text-muted-foreground">– {percentage}%</span>
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
};
