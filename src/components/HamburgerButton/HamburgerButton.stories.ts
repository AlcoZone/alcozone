import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import HamburgerButton from "./HamburgerButton";

const meta: Meta<typeof HamburgerButton> = {
  title: "Components/Buttons/HamburgerButton",
  component: HamburgerButton,
  tags: ["autodocs"],
  args: {
    onClick: action("HamburgerButton clicked"),
  },
};

export default meta;
type Story = StoryObj<typeof HamburgerButton>;

export const Default: Story = {};
