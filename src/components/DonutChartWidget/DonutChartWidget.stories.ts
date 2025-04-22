"use client";

import type { Meta, StoryObj } from "@storybook/react";
import DonutChartWidget from "./DonutChartWidget";

const meta: Meta<typeof DonutChartWidget> = {
  title: "Components/DonutChartWidget",
  component: DonutChartWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof DonutChartWidget>;

export const Default: Story = {
  render: () => < DonutChartWidget />,
};
