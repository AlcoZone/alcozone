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
  { month: "Enero", mes1: 186, mes2: 80 },
  { month: "Febrero", mes1: 305, mes2: 200 },
  { month: "Marzo", mes1: 237, mes2: 120 },
  { month: "Abril", mes1: 73, mes2: 190 },
  { month: "Mayo", mes1: 209, mes2: 130 },
  { month: "Junio", mes1: 214, mes2: 140 },
  { month: "Julio", mes1: 230, mes2: 300 },
  { month: "Agosto", mes1: 200, mes2: 50 },
  { month: "Septiembre", mes1: 214, mes2: 140 },
  { month: "Octubre", mes1: 214, mes2: 69 },
  { month: "Noviembre", mes1: 200, mes2: 57 },
  { month: "Diciembre", mes1: 214, mes2: 140 },
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

