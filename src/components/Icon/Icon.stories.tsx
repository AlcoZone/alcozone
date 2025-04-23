import React from "react";
import { Icon } from "./Icon";

export default {
  title: "Components/Icon",
  component: Icon,
};

export const UserIcon = () => <Icon variant="user" />;
export const LockIcon = () => <Icon variant="lock" />;
export const CustomIcon = () => <Icon variant="logo" />;
