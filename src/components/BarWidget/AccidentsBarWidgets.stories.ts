import type { Meta, StoryObj } from "@storybook/react"
import AccidentsBarChart from "./AccidentsBarWidget"

const meta: Meta<typeof AccidentsBarChart> = {
  title: "Components/AccidentsBarChart",
  component: AccidentsBarChart,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof AccidentsBarChart>

const sampleData = [
  { month: "Enero", desktop: 186, mobile: 80 },
  { month: "Febrero", desktop: 305, mobile: 200 },
  { month: "Marzo", desktop: 237, mobile: 120 },
  { month: "Abril", desktop: 73, mobile: 190 },
  { month: "Mayo", desktop: 209, mobile: 130 },
  { month: "Junio", desktop: 214, mobile: 140 },
  { month: "Julio", desktop: 230, mobile: 300 },
  { month: "Agosto", desktop: 200, mobile: 50 },
  { month: "Septiembre", desktop: 214, mobile: 140 },
  { month: "Octubre", desktop: 214, mobile: 69 },
  { month: "Noviembre", desktop: 200, mobile: 57 },
  { month: "Diciembre", desktop: 214, mobile: 140 },
]

const sampleConfig = {
  desktop: {
    label: "2022",
    color: "#00E096", 
  },
  mobile: {
    label: "2021",
    color: "#0095FF",
  },
}
export const Default: Story = {
  args: {
    data: sampleData,
    config: sampleConfig,
  },
}
