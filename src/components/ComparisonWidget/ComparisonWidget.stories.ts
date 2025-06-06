import type { Meta, StoryObj } from "@storybook/react";
import { ComparisonWidget } from "./ComparisonWidget";

const meta: Meta<typeof ComparisonWidget> = {
  title: "Components/ComparisonWidget",
  component: ComparisonWidget,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ComparisonWidget>;

export const GeneralAccidents: Story = {
  args: {
    title: "Número de accidentes por mes",
    data: [
      { month_name: "January", accidents: "15432" },
      { month_name: "February", accidents: "16208" },
      { month_name: "March", accidents: "17021" },
      { month_name: "April", accidents: "14850" },
      { month_name: "May", accidents: "15200" },
    ],
    config: {
      accidents: {
        label: "Accidentes",
        color: "#8884d8",
      },
    },
    footer: "Datos totales sin distinguir alcaldía",
  },
};
