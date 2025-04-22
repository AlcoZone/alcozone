"use client";

import type { Meta, StoryObj } from "@storybook/react";
import ComparisonWidget from "./ComparisonWidget";

const meta: Meta<typeof ComparisonWidget> = {
  title: "Components/ComparisonWidget",
  component: ComparisonWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ComparisonWidget>;

export const Default: Story = {
  render: () => <ComparisonWidget />,
};
