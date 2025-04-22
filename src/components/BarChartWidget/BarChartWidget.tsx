"use client"

import { Bar, BarChart, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const causaAlcoholColor = "#0095FF"
const OtrasCausasColor = "#00E096"  

const chartData = [
  { month: "January", "Causa: Alcohol": 186, "Otras causas": 80 },
  { month: "February", "Causa: Alcohol": 305, "Otras causas": 200 },
  { month: "March", "Causa: Alcohol": 237, "Otras causas": 120 },
  { month: "April", "Causa: Alcohol": 73, "Otras causas": 190 },
  { month: "May", "Causa: Alcohol": 209, "Otras causas": 130 },
  { month: "June", "Causa: Alcohol": 214, "Otras causas": 140 },
]

//added this to calculate the bottom part of how many accidents of each type exist.
const totalAlcohol = chartData.reduce((acc, item) => acc + item["Causa: Alcohol"], 0)
const totalOtras = chartData.reduce((acc, item) => acc + item["Otras causas"], 0)

export function BarChartWidget() {
  return (
    <div style={{ paddingTop: "500px" }}>
      <Card className="w-[600px]">
        
        <CardHeader className="text-center">
          <CardTitle>Accidentes causados por alcohol</CardTitle>
          <CardDescription>Enero a Junio 2024</CardDescription>
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

export default BarChartWidget;


//<div style={{paddingTop: "500px"}}>