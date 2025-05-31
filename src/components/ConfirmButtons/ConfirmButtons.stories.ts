import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ConfirmButtons from "./ConfirmButtons";

const meta: Meta<typeof ConfirmButtons> = {
  title: "Components/Buttons/ConfirmButtons",
  component: ConfirmButtons,
  tags: ["autodocs"],
  args: {
    variant: "registerNewUser",
    onClick: action("ConfirmButton clicked"),
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["registerNewUser", "changePassword", "login", "save"],
    },
    disabled: {
      control: "boolean",
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

export const DisabledSave: Story = {
  args: {
    variant: "save",
    disabled: true,
  },
};