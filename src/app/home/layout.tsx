"use client"

import "../globals.css";
import { useState } from "react"
import { Menu } from "@/components/Menu/Menu";
import { Banner } from "@/components/Banner/Banner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuHidden, setMenuHidden] = useState(false);

  return (
      <div
      >
        {children}
      </div>

  );
}