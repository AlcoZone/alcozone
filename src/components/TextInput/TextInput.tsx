"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  showPasswordToggle?: boolean;
  testId: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
  showPasswordToggle = false,
  testId,
  ...props
}: TextInputProps) => {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";
  const inputType = showPasswordToggle && isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <Input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pr-10"
        data-testid={testId}
        {...props}
      />
      {showPasswordToggle && isPassword && (
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          data-testid="toggle-password-visibility"
        >
          {show ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
        </button>
      )}
    </div>
  );
};
