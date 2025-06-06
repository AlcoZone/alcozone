import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

type AccidenteData = {
  month_name: string;
  town: string;
  total_accidents: number;
};

export type BarChartWidgetProps = {
  title?: string;
  description?: string;
  data: AccidenteData[];
  colors?: Record<string, string>; // opcional: colores por town
  chartHeight?: number;
};

export const BarChartWidget: React.FC<BarChartWidgetProps> = ({
  title,
  description,
  data,
  colors = {},
  chartHeight,
}) => {
  const groupedByMonth: Record<string, Record<string, number>> = {};

  data.forEach(({ month_name, town, total_accidents }) => {
    if (!groupedByMonth[month_name]) {
      groupedByMonth[month_name] = {};
    }
    groupedByMonth[month_name][town] = total_accidents;
  });

  const chartData = Object.entries(groupedByMonth).map(([month, towns]) => ({
    month_name: month,
    ...towns,
  }));

  const uniqueTowns = Array.from(new Set(data.map((d) => d.town)));

  const defaultHeight = 205;

  return (
    <Card className={`w-full ${chartHeight ? "h-full" : ""}`}>
      <CardHeader className="text-center">
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className={chartHeight ? "flex-1" : ""}>
        <ChartContainer
          config={{}}
          style={{
            width: "100%",
            height:
              chartHeight !== undefined ? chartHeight - 130 : defaultHeight,
          }}
        >
          <BarChart data={chartData}>
            <XAxis dataKey="month_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {uniqueTowns.map((town, index) => (
              <Bar
                key={town}
                dataKey={town}
                fill={
                  colors[town] || defaultColors[index % defaultColors.length]
                }
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="text-center text-sm font-medium"></CardFooter>
    </Card>
  );
};

const defaultColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
