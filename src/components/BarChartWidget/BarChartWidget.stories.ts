// BarChartWidget.stories.ts
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { BarChartWidget } from "./BarChartWidget";

const meta: Meta<typeof BarChartWidget> = {
  title: "Components/BarChartWidget",
  component: BarChartWidget,
  tags: ["autodocs"],
  args: {
    title: "Accidentes mensuales",
    description: "Las dos alcaldías con más incidentes por mes",
    data: [
      { month_name: "Enero", town: "Cuauhtémoc", total_accidents: 25 },
      { month_name: "Enero", town: "Benito Juárez", total_accidents: 18 },
      { month_name: "Febrero", town: "Cuauhtémoc", total_accidents: 20 },
      { month_name: "Febrero", town: "Benito Juárez", total_accidents: 22 },
      { month_name: "Marzo", town: "Cuauhtémoc", total_accidents: 30 },
      { month_name: "Marzo", town: "Benito Juárez", total_accidents: 26 },
    ],
    colors: {
      Cuauhtémoc: "#8884d8",
      "Benito Juárez": "#82ca9d",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BarChartWidget>;

export const Default: Story = {};


