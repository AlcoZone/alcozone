"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { BarChartWidget } from "./BarChartWidget"

const meta: Meta<typeof BarChartWidget> = {
  title: "Widgets/BarChartWidget",
  component: BarChartWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof BarChartWidget>

export const Default: Story = {
  args: {},
}
