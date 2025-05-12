import type { Meta, StoryObj } from "@storybook/react"
import AccidentesTable from "./AccidentCauseTableWidget"
import React from "react"

const meta: Meta<typeof AccidentesTable> = {
  title: "Components/AccidentesTable",
  component: AccidentesTable,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof AccidentesTable>

const sampleData = [
  {
    img: "/icons/carro.png",
    type: "Automóvil",
    number: "86,850",
  },
  {
    img: "/icons/motorcycle.png",
    type: "Motocicleta",
    number: "34,580",
  },
  {
    img: "/icons/pedestrian.png",
    type: "Peatones",
    number: "14,009",
  },
  {
    img: "/icons/bike.png",
    type: "Bicicleta",
    number: "6,949",
  },
]

export const Default: Story = {
  args: {
    data: sampleData,
  },
}
