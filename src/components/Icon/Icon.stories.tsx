import React from "react";
import { Icon } from "./Icon";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    variant: {
      control: "select",
      options: ["user", "lock", "logo"],
      description: "Icon variant to display",
    },
    width: {
      control: "number",
      description: "Width of the icon in pixels",
    },
    height: {
      control: "number",
      description: "Height of the icon in pixels",
    },
  },
};

export const UserIcon = () => <Icon variant="user" width={32} height={32} />;
export const LockIcon = () => <Icon variant="lock" width={32} height={32} />;
export const LogoIcon = () => <Icon variant="logo" width={200} height={200} />;
