"use client";

import React, { useState } from "react";
import Menu from "@/components/Menu/Menu";

export default function DemoMenuPage() {
  const [variant, setVariant] = useState<"user" | "admin" | "hidden">("hidden");
  const [lastOpenVariant, setLastOpenVariant] = useState<"user" | "admin">("user");

  const handleUserClick = () => {
    setLastOpenVariant("user");
    setVariant("hidden");
  };

  const handleAdminClick = () => {
    setLastOpenVariant("admin");
    setVariant("hidden");
  };

  const toggleMenu = () => {
    if (variant === "hidden") {
      setVariant(lastOpenVariant);
    } else {
      setLastOpenVariant(variant);
      setVariant("hidden");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Menu variant={variant} onToggle={toggleMenu} />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Demo menú interactivo</h1>
        <div className="flex gap-4">
          <button onClick={handleUserClick} className="px-4 py-2 bg-blue-500 text-white rounded">Usuario</button>
          <button onClick={handleAdminClick} className="px-4 py-2 bg-green-500 text-white rounded">Admin</button>
          <button onClick={toggleMenu} className="px-4 py-2 bg-gray-500 text-white rounded">Toggle menú</button>
        </div>
      </div>
    </div>
  );
}
