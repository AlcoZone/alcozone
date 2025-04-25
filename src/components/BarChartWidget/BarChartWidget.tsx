'use client'

import { Bar, BarChart, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export type BarChartWidgetProps = {
  title: string
  description: string
  chartData: { month: string; "Causa: Alcohol": number; "Otras causas": number }[]
}

const causaAlcoholColor = "#0095FF"
const OtrasCausasColor = "#00E096"  


export function BarChartWidget({ title, description, chartData }: BarChartWidgetProps) {
  const totalAlcohol = chartData.reduce((acc, item) => acc + item["Causa: Alcohol"], 0)
  const totalOtras = chartData.reduce((acc, item) => acc + item["Otras causas"], 0)

  return (
    <div style={{ paddingTop: "1px" }}>
      <Card className="w-[600px]">
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart width={500} height={250} data={chartData}>
            <Tooltip />
            <Bar dataKey="Causa: Alcohol" stackId="a" fill={causaAlcoholColor} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Otras causas" stackId="a" fill={OtrasCausasColor} radius={[0, 0, 4, 4]} />
          </BarChart>
          <div className="flex gap-4 justify-center mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div style={{ width: "12px", height: "12px", backgroundColor: causaAlcoholColor}} />
              <span>Causa: Alcohol</span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: "12px", height: "12px", backgroundColor: OtrasCausasColor }} />
              <span>Otras causas</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex-col items-center gap-2 text-sm text-center">
          <div className="flex gap-2 font-medium leading-none">
            Total por alcohol: {totalAlcohol}
          </div>
          <div className="leading-none text-muted-foreground">
            Total por otras causas: {totalOtras}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BarChartWidget



