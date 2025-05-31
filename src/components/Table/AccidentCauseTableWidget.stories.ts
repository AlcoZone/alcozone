import type { Meta, StoryObj } from "@storybook/react";
import AccidentCauseTableWidget from "./AccidentCauseTableWidget";

const meta: Meta<typeof AccidentCauseTableWidget> = {
  title: "Components/AccidentCauseTableWidget",
  component: AccidentCauseTableWidget,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AccidentCauseTableWidget>;

export const TablaDeCausasDeAccidente: Story = {
  args: {
    title: "Tipos de accidentes",
    subtitle: "",
    data: [
      {
        subType: "Choque con lesionados",
        accidentCount: 4614,
      },
      {
        subType: "Motociclista",
        accidentCount: 1576,
      },
      {
        subType: "Atropellado",
        accidentCount: 1528,
      },
      {
        subType: "Ciclista",
        accidentCount: 232,
      },
    ],
  },
};
