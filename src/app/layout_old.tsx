"use client"

import "./globals.css";
import { useState } from "react"
import { Menu } from "@/components/Menu/Menu";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuHidden, setMenuHidden] = useState(false);

  return (
    <html lang="en">
      <body className="bg-[#F2F2F2]">
        <Menu variant="admin" onToggle={setMenuHidden}>
          {children}
        </Menu>
      </body>
    </html>
  );
}
