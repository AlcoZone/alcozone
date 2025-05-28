import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

const MAX_VALUE = 100;

export type RadialChartProps = {
  title: string;
  footer?: string;
  data: {
    percentage?: number;
    subType?: string;
  }[];
  fill?: string;
  description?: string;
};

export const RadialChartWidget = ({
  title,
  footer,
  data,
  description = "Porcentaje de accidentes",
}: RadialChartProps) => {
  const colors = ["#3b82f6", "#f97316", "#ef4444"];

  return (
    <div>
      <Card className="flex flex-col max-w-1xl mx-auto gap-0">
        <CardHeader className="items-center py-1 px-2">
          <CardTitle className="text-1xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 h-full">
          {data.map((item, index) => {
            const translateClass =
              index === 1 ? "translate-y-6" : "translate-y-0";

            // Usa 0 si percentage no está definido
            const percentage =
              typeof item.percentage === "number" ? item.percentage : 0;
            const subType = item.subType ?? "";

            const chartData = [
              {
                name: subType,
                value: percentage,
                fill: colors[index] ?? "#ccc",
              },
              { name: "Resto", value: MAX_VALUE - percentage, fill: "#eee" },
            ];

            return (
              <div
                key={index}
                className={`mx-auto w-full max-w-full min-w-0 aspect-square transform ${translateClass}`}
                style={{ height: "100%" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      data={chartData}
                      startAngle={0}
                      endAngle={270}
                      innerRadius="50%"
                      outerRadius="90%"
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
                  </ResponsiveContainer>
                  {/* Etiquetas en el centro */}
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
                    <div className="text-base fill-muted-foreground">
                      {subType}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 text-sm">
          {footer && <span>{footer}</span>}
        </CardFooter>
      </Card>
    </div>
  );
};
