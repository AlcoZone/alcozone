import type { Meta, StoryObj } from "@storybook/react";
import { BarChartWidget } from "./BarChartWidget";

const meta: Meta<typeof BarChartWidget> = {
  title: "Widgets/BarChartWidget",
  component: BarChartWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof BarChartWidget>;

export const Default: Story = {
  args: {
    title: "Ventas Mensuales",
    description: "Datos de ventas por mes",
    chartData: [
      { month: "January", "Causa: Alcohol": 400, "Otras causas": 300 },
      { month: "February", "Causa: Alcohol": 300, "Otras causas": 200 },
      { month: "March", "Causa: Alcohol": 500, "Otras causas": 450 },
      { month: "April", "Causa: Alcohol": 200, "Otras causas": 100 },
    ],
  },
};


