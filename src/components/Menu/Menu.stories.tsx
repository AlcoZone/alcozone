import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "@/components/Menu/Menu";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Usuario: Story = {
  args: {
    variant: "user",
  },
};

export const Administrator: Story = {
  args: {
    variant: "admin",
  },
};