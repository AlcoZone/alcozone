import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const MAX_VALUE = 100

export type RadialChartProps = {
  title: string
  footer?: string
  data: {
    percentage?: number
    subType?: string
  }[]
  fill?: string
  description?: string
}

export const RadialChartWidget = ({
  title,
  footer,
  data,
  description = "Porcentaje de accidentes",
}: RadialChartProps) => {
  const colors = ["#6463D6", "#F99C30", "#2FBFDE"]

  return (
    <div style={{ paddingTop: "1px" }}>
      <Card className="flex flex-col max-w-1xl mx-auto">
        <CardHeader className="items-center py-1 px-2">
          <CardTitle className="text-1xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {data.map((item, index) => {
            const translateClass = index === 1 ? "translate-y-6" : "translate-y-0"

            // Usa 0 si percentage no está definido
            const percentage = typeof item.percentage === "number" ? item.percentage : 0
            const subType = item.subType ?? ""

            const chartData = [
              { name: subType, value: percentage, fill: colors[index] ?? "#ccc" },
              { name: "Resto", value: MAX_VALUE - percentage, fill: "#eee" },
            ]

            return (
              <div
                key={index}
                className={`mx-auto aspect-square w-full max-w-[200px] min-w-[100px] transform ${translateClass}`}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      data={chartData}
                      startAngle={0}
                      endAngle={270}
                      innerRadius="80%"
                      outerRadius="115%"
                    >
                      <PolarGrid gridType="circle" radialLines={false} stroke="#eee" />
                      <RadialBar dataKey="value" background cornerRadius={10} />
                      <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
                    </RadialBarChart>
                  </ResponsiveContainer>
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
                      {percentage.toLocaleString(undefined, { minimumFractionDigits: 2 })}%
                    </div>
                    <div className="text-base fill-muted-foreground">{subType}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 text-sm">
          {footer && <span>{footer}</span>}
        </CardFooter>
      </Card>
    </div>
  )
}

