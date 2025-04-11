// src/components/Menu/Menu.stories.tsx
// variants
import type { Meta, StoryObj } from "@storybook/react";
import Menu from "./Menu";

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

export const Colapsado: Story = {
  args: {
    variant: "hidden",
  },
};