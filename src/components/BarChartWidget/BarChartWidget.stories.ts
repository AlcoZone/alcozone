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
    title: "Incidentes causados por alcohol",
    description: "Comparación mensual por categoría",
    data: [
      { month: "January", "Causa: Alcohol": 400, "Otras causas": 300, "Otro": 150 },
      { month: "February", "Causa: Alcohol": 300, "Otras causas": 200, "Otro": 100 },
      { month: "March", "Causa: Alcohol": 500, "Otras causas": 450, "Otro": 200 },
      { month: "April", "Causa: Alcohol": 200, "Otras causas": 100, "Otro": 50 },
    ],
    categories: ["Causa: Alcohol", "Otras causas"],
    categoryColors: ["#0095FF", "#00E096", "#FF9900"],
  },
};


