

"use client"

import "../globals.css";
import { useState } from "react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuHidden, setMenuHidden] = useState(false);

  return (
    <div
    className="bg-white shadow-xl rounded-xl p-6 space-y-4 transition-all duration-300"
    style={{
    marginTop: "50px",
    marginLeft: "100px",
    marginRight: "70px",
    bottom: "50px",
    height: "calc(100vh - 175px)",
    width: menuHidden ? "calc(100vw - 150px)" : "calc(100vw - 300px)",
    overflowY: "auto"
    }}
    >
        {children}
    </div>
  );
}