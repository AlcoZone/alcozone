"use client";

import React from "react";
import { Input } from "@/components/ui/input";

type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string; 
};

export const TextInput = ({ value, onChange, placeholder, type = "text" }: TextInputProps) => {
  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
