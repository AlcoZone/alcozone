import type { Meta, StoryObj } from "@storybook/react"
import LineChartMultiple from "./LineGraphWidget"

const meta: Meta<typeof LineChartMultiple> = {
  title: "Components/LineChartMultiple",
  component: LineChartMultiple,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof LineChartMultiple>

const sampleData = [
  { month: "January", fecha1: 186, fecha2: 80 },
  { month: "February", fecha1: 305, fecha2: 200 },
  { month: "March", fecha1: 237, fecha2: 120 },
  { month: "April", fecha1: 73, fecha2: 190 },
  { month: "May", fecha1: 209, fecha2: 130 },
  { month: "June", fecha1: 214, fecha2: 140 },
]

const sampleConfig = {
  desktop: {
    label: "fecha1",
    color: "#8950FC",
  },
  mobile: {
    label: "Fecha2",
    color: "#F64E60",
  },
}


export const Default: Story = {
  args: {
    data: sampleData,
    config: sampleConfig,
    title: "Accidentes por alcoholismo",
    description: "2023 vs 2024",
    summary: "2.1% vs año pasado",
    accidents: "56, 799",
  },
}
