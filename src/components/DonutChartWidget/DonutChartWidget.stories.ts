"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { DonutChartWidget } from "./DonutChartWidget"

const meta: Meta<typeof DonutChartWidget> = {
  title: "Widgets/DonutChartWidget",
  component: DonutChartWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof DonutChartWidget>

export const Default: Story = {
  args: {
    title: "Accidentes",
    footer: "Causados por alcohol vs otras causas",
    centerLabel: "Accidentes",
    chartData: [
      { category: "Alcohol", visitors: 430, fill: "#C7CEFF" },
      { category: "Other", visitors: 695, fill: "#5A6ACF" },
    ],
  },
}

