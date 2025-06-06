import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const MAX_VALUE = 100;

export type RadialChartProps = {
  title: string;
  footer?: string;
  data: {
    percentage?: number;
    subType?: string;
  }[];
  description?: string;
  chartHeight?: number;
};

export const RadialChartWidget: React.FC<RadialChartProps> = ({
  title,
  footer,
  data,
  description = "Porcentaje de accidentes",
  chartHeight,
}) => {
  const colors = ["#6463D6", "#F99C30", "#2FBFDE"];

  return (
    <Card className={`w-full ${chartHeight ? "h-full" : ""}`}>
      <CardHeader className="items-center text-center">
        <CardTitle className="text-1xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent
        className={
          chartHeight
            ? "flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1"
        }
      >
        {data.map((item, index) => {
          const percentage =
            typeof item.percentage === "number" ? item.percentage : 0;
          const subType = item.subType ?? "";

          const chartData = [
            { name: subType, value: percentage, fill: colors[index] ?? "#ccc" },
            { name: "Resto", value: MAX_VALUE - percentage, fill: "#eee" },
          ];

          return (
            <div
              key={index}
              className={`relative mx-auto w-full aspect-square ${
                chartHeight
                  ? `h-[${chartHeight}px]`
                  : "max-w-[200px] min-w-[100px]"
              }`}
            >
              <ChartContainer
                config={{}}
                style={{
                  width: "100%",
                  height: chartHeight !== undefined ? chartHeight - 150 : 210,
                }}
              >
                <RadialBarChart
                  data={chartData}
                  startAngle={0}
                  endAngle={270}
                  innerRadius="80%"
                  outerRadius="115%"
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="#eee"
                  />
                  <RadialBar dataKey="value" background cornerRadius={10} />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  />
                </RadialBarChart>
              </ChartContainer>

              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                <div className="text-3xl font-bold fill-foreground">
                  {percentage.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                  %
                </div>
                <div className="text-base fill-muted-foreground">{subType}</div>
              </div>
            </div>
          );
        })}
      </CardContent>

      <CardFooter className="flex flex-col gap-2 text-sm">
        {footer && <span>{footer}</span>}
      </CardFooter>
    </Card>
  );
};
