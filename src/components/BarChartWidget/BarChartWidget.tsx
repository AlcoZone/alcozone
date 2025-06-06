import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div style={{ width: "100%", height: "200px" }}>
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
        </div>
      </CardContent>

      <CardFooter className="text-center text-sm font-medium"></CardFooter>
    </Card>
  );
};

const defaultColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
