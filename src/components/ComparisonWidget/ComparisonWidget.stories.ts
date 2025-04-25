import type { Meta, StoryObj } from "@storybook/react"
import { ComparisonWidget } from "./ComparisonWidget"

const meta: Meta<typeof ComparisonWidget> = {
  title: "Widgets/ComparisonWidget",
  component: ComparisonWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof ComparisonWidget>

export const Default: Story = {
  args: {
    title: "Accidentes por Mes",
    chartData: [
      { month: "January", alcoholRelated: 120, nonAlcoholRelated: 200 },
      { month: "February", alcoholRelated: 160, nonAlcoholRelated: 230 },
      { month: "March", alcoholRelated: 110, nonAlcoholRelated: 220 },
      { month: "April", alcoholRelated: 90, nonAlcoholRelated: 170 },
      { month: "May", alcoholRelated: 130, nonAlcoholRelated: 210 },
      { month: "June", alcoholRelated: 150, nonAlcoholRelated: 200 },
    ],
    chartConfig: {
      alcoholRelated: { label: "Relacionado al alcohol", color: "#07E098" },
      nonAlcoholRelated: { label: "No relacionado al alcohol", color: "#0095FF" },
    },
    footer: "Enero - Junio 2024",
  },
}
