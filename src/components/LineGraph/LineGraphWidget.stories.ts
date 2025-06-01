import type { Meta, StoryObj } from "@storybook/react";
import LineGraphWidget from "./LineGraphWidget";

const meta: Meta<typeof LineGraphWidget> = {
  title: "Components/LineChartMultiple",
  component: LineGraphWidget,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof LineGraphWidget>;

const sampleData = [
  { date: "2025-05-01", accidents: 120 },
  { date: "2025-05-02", accidents: 150 },
  { date: "2025-05-03", accidents: 110 },
  { date: "2025-05-04", accidents: 180 },
  { date: "2025-05-05", accidents: 90 },
];

const sampleConfig = {
  desktop: {
    label: "Accidentes",
    color: "#001391",
  },
};

export const Default: Story = {
  args: {
    data: sampleData,
    config: sampleConfig,
    title: "Accidentes diarios",
    description: "Total de accidentes reportados por día",
  },
};
