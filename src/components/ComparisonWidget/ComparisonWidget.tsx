import { Area, AreaChart, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

type ComparisonWidgetProps = {
  title: string;
  data: Array<{ month_name: string; accidents: string | number }>;
  config: Record<string, { label: string; color: string }>;
  footer: string;
  chartHeight?: number;
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
        <div className="rounded-md border bg-white p-3 shadow-sm" data-testid="custom-tooltip">
          <p className="text-sm font-bold" data-testid="tooltip-month">{month}</p>
          <div className="mt-1 space-y-1 text-sm">
            {payload.map((entry: any, index: number) => {
              const chartConfig = config[entry.dataKey];
              return (
                <div key={index} className="flex justify-between gap-4" data-testid={`tooltip-entry-${index}`}>
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

  const defaultHeight = 210;

  return (
      <div data-testid="comparison-widget">
        <Card className={`w-full ${chartHeight ? "h-full" : ""}`}>
          <CardHeader className="text-center" data-testid="widget-header">
            <CardTitle data-testid="widget-title">{title}</CardTitle>
          </CardHeader>
          <CardContent className={chartHeight ? "flex-1" : ""} data-testid="widget-content">
            <div data-testid="chart-wrapper">
              <ChartContainer
                  config={config}
                  style={{
                    width: "100%",
                    height:
                      chartHeight !== undefined ? chartHeight - 130 : defaultHeight,
                  }}
                >
                  <AreaChart
                    data={data.map((item) => ({
                      ...item,
                      accidents: Number(item.accidents),
                    }))}
                    margin={{ left: 12, right: 12 }}
                    data-testid="area-chart"
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
                          data-testid={`area-${key}`}
                        />
                      );
                    })}
                  </AreaChart>
                </ChartContainer>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm" data-testid="widget-footer">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none text-muted-foreground" data-testid="footer-text">
                  {footer}
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
  );
};
