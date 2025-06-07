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
  { accident_date: "2025-05-01", total_accidents: 180 },
  { accident_date: "2025-05-02", total_accidents: 150 },
  { accident_date: "2025-05-03", total_accidents: 200 },
  { accident_date: "2025-05-04", total_accidents: 210 },
  { accident_date: "2025-05-05", total_accidents: 90 },
];

const sampleConfig = {
  total_accidents: {
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
