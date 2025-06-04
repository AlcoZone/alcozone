import type { Meta, StoryObj } from "@storybook/react";
import ReportChannelWidget from "./ReportChannelWidget";

const meta: Meta<typeof ReportChannelWidget> = {
  title: "Components/ReportChannelWidget",
  component: ReportChannelWidget,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ReportChannelWidget>;

const sampleData = [
  { report_source: "LLAMADA DEL 911", total_accidents: 12845 },
  { report_source: "RADIO", total_accidents: 914 },
  { report_source: "REDES", total_accidents: 35 },
  { report_source: "BOTÓN DE AUXILIO", total_accidents: 866 },
  { report_source: "CÁMARA", total_accidents: 43 },
  { report_source: "APLICATIVOS", total_accidents: 30 },
  { report_source: "LLAMADA APP911", total_accidents: 46 },
];

const sampleConfig = {
  total_accidents: {
    label: "Accidentes",
    color: "#0095FF",
  },
};

export const Default: Story = {
  args: {
    data: sampleData,
    config: sampleConfig,
    title: "Canales de reporte",
    description: "Distribución de reportes por canal",
    chartHeight: 400,
  },
};
