import type { Meta, StoryObj } from "@storybook/react";
import WidgetSelectionDialog from "./WidgetSelectionDialog";
import { WidgetDetail } from "@/types/WidgetDetail";
import { ComparisonWidget } from "@/components/ComparisonWidget/ComparisonWidget";
import { GeneralAccidents as ComparisonWidgetStory } from "@/components/ComparisonWidget/ComparisonWidget.stories";
import { action } from "@storybook/addon-actions";



import React, { useState } from "react";

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
    uuid: "widget-1",
    name: "AccidentesMensuales",
    title: "Accidentes por Mes",
    description: "Comparación mensual de accidentes.",
    minWidth: 4,
    minHeight: 2,
    preview: (<ComparisonWidget {...ComparisonWidgetStory.args as React.ComponentProps<typeof ComparisonWidget>} />),
  },
];

export const Default: Story = {
  render: () => {
    const [added, setAdded] = useState<string[]>([]);

    return (
      <WidgetSelectionDialog
        widgets={exampleComparisonWidget}
        addedWidgetUuids={added}
        onAddWidget={(widget) => {
          action("Widget agregado")(widget);
          setAdded((prev) => [...prev, widget.uuid]);
        }}
      />
    );
  },
};
