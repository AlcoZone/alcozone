import type { Meta, StoryObj } from "@storybook/react";

import ConfirmButtons from "./ConfirmButtons";

const meta: Meta<typeof ConfirmButtons> = {
  title: "Components/Buttons/ConfirmButtons",
  component: ConfirmButtons,
  tags: ["autodocs"],
  args: {
    variant: "registerNewUser",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["registerNewUser", "changePassword", "login", "save"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmButtons>;

export const Default: Story = {};


export const ChangePassword: Story = {
  args: {
    variant: "changePassword",
  },
};
