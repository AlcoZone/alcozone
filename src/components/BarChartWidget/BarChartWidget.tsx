import React from "react";
import { Bar, BarChart, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type BarChartWidgetProps = {
  title: string;
  description: string;
  data: { month: string; [key: string]: number }[];
  categories: string[];
  categoryColors: string[];
};

export const BarChartWidget = ({
  title,
  description,
  data,
  categories,
  categoryColors,
}: BarChartWidgetProps) => {
  const totals = categories.reduce((acc, category) => {
    acc[category] = data.reduce((sum, item) => sum + item[category], 0);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ paddingTop: "1px" }}>
      <Card className="w-[600px]">
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart width={500} height={250} data={data}>
            <Tooltip />
            {categories.map((category, index) => (
              <Bar
                key={category}
                dataKey={category}
                stackId="a"
                fill={categoryColors[index]}
                radius={index === 0 ? [4, 4, 0, 0] : [0, 0, 4, 4]}
              />
            ))}
          </BarChart>
          <div className="flex gap-4 justify-center mt-4 text-sm">
            {categories.map((category, index) => (
              <div key={category} className="flex items-center gap-2">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: categoryColors[index],
                  }}
                />
                <span>{category}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-center gap-2 text-sm text-center">
          {categories.map((category) => (
            <div key={category} className="flex gap-2 font-medium leading-none">
              Total por {category}: {totals[category]}
            </div>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};






