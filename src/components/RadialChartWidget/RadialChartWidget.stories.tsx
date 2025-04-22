"use client"

import type { Meta, StoryObj } from "@storybook/react"
import RadialChartWidget from "./RadialChartWidget"

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
  args: {},
}
