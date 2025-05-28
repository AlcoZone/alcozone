import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

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
};

export const BarChartWidget = ({
  title,
  description,
  data,
  colors = {},
}: BarChartWidgetProps) => {
  // Agrupamos datos por mes
  const groupedByMonth: Record<string, Record<string, number>> = {};

  data.forEach(({ month_name, town, total_accidents }) => {
    if (!groupedByMonth[month_name]) {
      groupedByMonth[month_name] = {};
    }
    groupedByMonth[month_name][town] = total_accidents;
  });

  // Convertimos a formato de Recharts
  const chartData = Object.entries(groupedByMonth).map(([month, towns]) => ({
    month_name: month,
    ...towns,
  }));

  // Obtenemos lista de towns únicos para dibujar una <Bar /> por cada uno
  const uniqueTowns = Array.from(new Set(data.map((d) => d.town)));

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
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
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="text-center text-sm font-medium">
        Mostrando los dos towns más peligrosos por mes
      </CardFooter>
    </Card>
  );
};

const defaultColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
