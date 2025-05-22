import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import AccidentCauseTableWidget from "./AccidentCauseTableWidget"


const meta: Meta<typeof AccidentCauseTableWidget> = {
  title: "Components/AccidentesTable",
  component: AccidentCauseTableWidget,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    data: { control: "object" },
  },
}

export default meta
type Story = StoryObj<typeof AccidentCauseTableWidget>

export const Default: Story = {
  args: {
    title: "Tipos de accidentes",
    subtitle: "Año 2024",
    data: [
      { type: "Vehiculo", number: "120" },
      { type: "Motocicleta", number: "85" },
      { type: "Bicicleta", number: "34" },
      { type: "Persona", number: "18" },
    ],
  },
}

export const EmptyData: Story = {
  args: {
    title: "Tipos de accidentes",
    subtitle: "Sin datos",
    data: [],
  },
}

export const CustomTitleAndSubtitle: Story = {
  args: {
    title: "Reporte mensual de incidentes",
    subtitle: "Abril 2024",
    data: [
      { type: "Vehiculo", number: "45" },
      { type: "Persona", number: "12" },
    ],
  },
}
