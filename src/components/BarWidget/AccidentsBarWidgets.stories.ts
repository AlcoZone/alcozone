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
  { month: "Enero", month1: 186, month2: 80 },
  { month: "Febrero", month1: 305, month2: 200 },
  { month: "Marzo", month1: 237, month2: 120 },
  { month: "Abril", month1: 73, month2: 190 },
  { month: "Mayo", month1: 209, month2: 130 },
  { month: "Junio", month1: 214, month2: 140 },
  { month: "Julio", month1: 230, month2: 300 },
  { month: "Agosto", month1: 200, month2: 50 },
  { month: "Septiembre", month1: 214, month2: 140 },
  { month: "Octubre", month1: 214, month2: 69 },
  { month: "Noviembre", month1: 200, month2: 57 },
  { month: "Diciembre", month1: 214, month2: 140 },
]

const sampleConfig = {
  mes1: {
    label: "2022",
    color: "#00E096", 
  },
  mes2: {
    label: "2021",
    color: "#0095FF",
  },
}

  
export const Default: Story = {
  args: {
    data: sampleData,
    config: sampleConfig,
    title: "Accidentes por alcoholismo",
    subtitle: "2.1% vs el año pasado",
    description: "2023 vs 2024",
  },
}

