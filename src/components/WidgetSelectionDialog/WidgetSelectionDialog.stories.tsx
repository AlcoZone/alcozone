import type { Meta, StoryObj } from "@storybook/react";
import WidgetSelectionDialog from "./WidgetSelectionDialog";
import { WidgetDetail } from "@/types/WidgetDetail";
import { ComparisonWidget } from "@/components/ComparisonWidget/ComparisonWidget";
import { Default as ComparisonWidgetStory } from "@/components/ComparisonWidget/ComparisonWidget.stories";
import { BarChartWidget } from "@/components/BarChartWidget/BarChartWidget";
import { Default as BarChartWidgetStory } from "@/components/BarChartWidget/BarChartWidget.stories";


const meta: Meta<typeof WidgetSelectionDialog> = {
  title: "Components/WidgetSelectionDialog",
  component: WidgetSelectionDialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WidgetSelectionDialog>;

const exampleComparisonWidget: WidgetDetail[] = [
    {
      id: 1,
      name: "Accidentes por Mes",
      description: "Comparación mensual de accidentes.",
      preview: (<ComparisonWidget {...ComparisonWidgetStory.args as React.ComponentProps<typeof ComparisonWidget>} />),
    },
];

const exampleMultipleWidgets: WidgetDetail[] = [
    {
      id: 1,
      name: "Accidentes por Mes",
      description: "Comparación mensual de accidentes.",
      preview: (<ComparisonWidget {...ComparisonWidgetStory.args as React.ComponentProps<typeof ComparisonWidget>} />),
    },

    {
      id: 2,
      name: "Accidentes Relacionados con el Alcohol frente a Otras Causas",
      description: "Comparación entre los accidentes relacionados con el alcohol y aquellos causados por otros factores.",
      preview: (<BarChartWidget {...BarChartWidgetStory.args as React.ComponentProps<typeof BarChartWidget>} />),
    },
];

export const Default: Story = {
  args: {
    widgets: exampleComparisonWidget,
  },
};

export const MultipleWidgets: Story = {
  args: {
    widgets: exampleMultipleWidgets,
  },
};