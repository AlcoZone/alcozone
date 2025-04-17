import type { Meta, StoryObj } from "@storybook/react";

import HamburgerButton from "./HamburgerButton";

const meta: Meta<typeof HamburgerButton> = {
  title: "Components/Buttons/HamburgerButton",
  component: HamburgerButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HamburgerButton>;

export const Default: Story = {};