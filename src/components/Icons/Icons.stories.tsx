import React from "react";
import { Icons } from "./Icons";

export default {
  title: "Components/Icons",
  component: Icons,
};

export const UserIcon = () => <Icons variant="user" />;
export const LockIcon = () => <Icons variant="lock" />;
export const CustomIcon = () => <Icons variant="custom" />;
