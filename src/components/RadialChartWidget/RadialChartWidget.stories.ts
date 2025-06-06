import type { Meta, StoryObj } from "@storybook/react";
import { RadialChartWidget } from "./RadialChartWidget";

const meta: Meta<typeof RadialChartWidget> = {
  title: "Components/RadialChartWidget",
  component: RadialChartWidget,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RadialChartWidget>;

export const PorcentajePorTipoDeAccidente: Story = {
  args: {
    title: "Tipos de accidente",
    description: "Porcentaje de accidentes",
    footer: "",
    data: [
      {
        percentage: 28.47,
        subType: "Choque con lesionados",
      },
      {
        percentage: 9.72,
        subType: "Motociclista",
      },
      {
        percentage: 9.43,
        subType: "Atropellado",
      },
    ],
  },
};
