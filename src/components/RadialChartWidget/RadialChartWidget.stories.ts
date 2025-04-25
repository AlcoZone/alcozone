import type { Meta, StoryObj } from "@storybook/react"
import { RadialChartWidget } from "./RadialChartWidget"

const meta: Meta<typeof RadialChartWidget> = {
  title: "Widgets/RadialChartWidget",
  component: RadialChartWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof RadialChartWidget>

export const Default: Story = {
  args: {
    title: "Causa de accidentes",
    footer: "Porcentaje de accidentes",
    data: [
      { label: "Peatonal", value: 15, fill: "#8884d8" },
      { label: "Automovilístico", value: 50, fill: "#82ca9d" },
      { label: "Motociclista", value: 35, fill: "#ffc658" },
    ],
  },
}
