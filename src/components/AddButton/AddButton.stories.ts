import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AddButton from "./AddButton";

const meta: Meta<typeof AddButton> = {
  title: "Components/Buttons/AddButton",
  component: AddButton,
  tags: ["autodocs"],
  args: {
    onClick: action("AddButton clicked"),
  },
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const Default: Story = {};
