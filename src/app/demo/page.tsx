"use client";

import React, { useState } from "react";
import Menu from "@/components/Menu/Menu";

export default function DemoMenuPage() {
  const [variant, setVariant] = useState<"user" | "admin" | "hidden">("user");
  const [lastOpenVariant, setLastOpenVariant] = useState<"user" | "admin">("user");

  const toggleMenu = () => {
    console.log("Toggling menu...");
    if (variant === "hidden") {
      setVariant(lastOpenVariant);
    } else {
      setLastOpenVariant(variant);
      setVariant("hidden");
    }
  };
  console.log("Pasando onToggle al menú ");
  
  return (
    <div className="flex min-h-screen">
      <Menu variant={variant} onToggle={toggleMenu} />
    </div>
  );
}