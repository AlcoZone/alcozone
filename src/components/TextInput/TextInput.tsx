"use client";

import React from "react";
import { Input } from "@/components/ui/input";

type TextInputProps = {
  text: string;
};

export const TextInput = ({ text }: TextInputProps) => {
  return <Input placeholder={text} />;
};

export default TextInput;