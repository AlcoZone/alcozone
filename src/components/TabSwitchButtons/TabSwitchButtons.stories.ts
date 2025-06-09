import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";


import TabSwitchButtons from "./TabSwitchButtons";

const meta: Meta<typeof TabSwitchButtons> = {
  title: "Components/Buttons/TabSwitchButtons",
  component: TabSwitchButtons,
  tags: ["autodocs"],
  args: {
    variant: "home",
    color: "default",
    onClick: action("TabSwitchButton clicked"),
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "home",
        "dashboard",
        "database",
        "users",
        "map",
        "account",
        "revisions",
        "logout",
      ],
    },
    color: {
      control: "select",
      options: ["default", "active"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabSwitchButtons>;

export const Default: Story = {};

export const ActiveDashboard: Story = {
  args: {
    variant: "dashboard",
    color: "active",
  },
};

export const DefaultMap: Story = {
  args: {
    variant: "map",
    color: "default",
  },
};

