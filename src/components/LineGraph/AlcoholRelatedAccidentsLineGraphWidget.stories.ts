import type { Meta, StoryObj } from "@storybook/react"
import LineChartMultiple from "./AlcoholRelatedAccidentsLineGraphWidget"

const meta: Meta<typeof LineChartMultiple> = {
  title: "Components/LineChartMultiple",
  component: LineChartMultiple,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof LineChartMultiple>

const sampleData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const sampleConfig = {
  desktop: {
    label: "Desktop",
    color: "#8950FC",
  },
  mobile: {
    label: "Mobile",
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
