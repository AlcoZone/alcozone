"use client";

import React from "react";
import { Input } from "@/components/ui/input";

type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
