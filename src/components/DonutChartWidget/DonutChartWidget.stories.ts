import type { Meta, StoryObj } from "@storybook/react";
import { DonutChartWidget } from "./DonutChartWidget";

const meta: Meta<typeof DonutChartWidget> = {
  title: "Components/DonutChartWidget",
  component: DonutChartWidget,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DonutChartWidget>;

export const AccidentesPorAlcaldía: Story = {
  args: {
    title: "Alcadías con más peligro",
    footer: "Datos del último mes disponibles",
    centerLabel: "Total accidentes",
    data: [
      {
        town: "Iztapalapa",
        total_accidents: "2747",
      },
      {
        town: "Gustavo A. Madero",
        total_accidents: "1846",
      },
    ],
  },
};
