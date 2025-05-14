"use client"

import "./globals.css";
import { useState } from "react"
import { Menu } from "@/components/Menu/Menu";
import { Banner } from "@/components/Banner/Banner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuHidden, setMenuHidden] = useState(false);

  return (
    <html lang="en">
      <body className="bg-[#F2F2F2]">
        <Menu variant="admin" onToggle={setMenuHidden}>
            <div
              className="bg-white shadow-xl rounded-xl p-6 space-y-4 transition-all duration-300"
              style={{
                marginTop: "50px",
                marginLeft: "-220px",
                marginRight: "30px",
                bottom: "50px",
                height: "calc(100vh - 175px)",
                width: menuHidden ? "calc(100vw - 150px)" : "calc(100vw - 300px)",
                overflowY: "auto"
              }}
            >
              {children}
            </div>
            <Banner />
        </Menu>
      </body>
    </html>
  );
}
