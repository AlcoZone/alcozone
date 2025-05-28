"use client";

import "./globals.css";

import { Banner } from "@/components/Banner/Banner";
import { Menu } from "@/components/Menu/Menu";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
