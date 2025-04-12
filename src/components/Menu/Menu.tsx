// src/components/Menu/Menu.tsx
"use client";

import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { User } from "lucide-react";
import Link from "next/link";

type MenuProps = {
  variant?: "user" | "admin" | "hidden";
  onToggle?: () => void;
};

export const Menu = ({ variant = "user", onToggle }: MenuProps) => {
  const isHidden = variant === "hidden";
  const isAdmin = variant === "admin";

  console.log(
    "ONTOGGLE prop en Menu.tsx:",
    onToggle,
    "window:",
    typeof window !== "undefined"
  );

  return (
    <SidebarProvider>
      <Sidebar
        className={`${
          isHidden ? "w-20" : "w-56"
        } bg-white text-black flex flex-col justify-between border-r transition-all duration-300`}
      >
        <SidebarContent>
          {/* Botón hamburguesa */}
          <div className="p-4 relative z-50">
          <button onClick={onToggle} className="hover:bg-gray-100 rounded">
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
          {/* Logo y nombre */}
          <div className="flex items-center justify-center py-2">
            <img src="/link/logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
            {!isHidden && (
              <span className="ml-2 text-xl font-bold text-blue-800">AlcoZone</span>
            )}
          </div>

          {/* Menú principal */}
          <div className="px-4 mt-4">
            {!isHidden && (
              <>
                <p className="text-s font-semibold text-muted-foreground mt-10 mb-4">MENÚ</p>
                <nav className="space-y-2">
                  <Link href="/home" className="block text-sm hover:text-blue-600">Inicio</Link>
                  <Link href="/dashboard" className="block text-sm hover:text-blue-600">Dashboard</Link>
                  <Link href="/database" className="block text-sm hover:text-blue-600">Base de datos</Link>
                  {isAdmin && (
                    <Link href="/users" className="block text-sm hover:text-blue-600">Base de datos usuarios</Link>
                  )}
                  <Link href="/map" className="block text-sm hover:text-blue-600">Mapa interactivo</Link>
                </nav>

                <p className="text-s font-semibold text-muted-foreground mt-10 mb-4">OTROS</p>
                <nav className="space-y-2">
                  <Link href="/account" className="block text-sm hover:text-blue-600">Mi cuenta</Link>
                  <Link href="/upload" className="block text-sm hover:text-blue-600">Cargar archivo</Link>
                  <Link href="/download" className="block text-sm hover:text-blue-600">Descargar archivos</Link>
                  <Link href="/logout" className="block text-sm hover:text-blue-600">Cerrar sesión</Link>
                </nav>
              </>
            )}
          </div>
        </SidebarContent>

        {/* Footer */}
        <div className="p-4 border-t text-sm text-muted-foreground flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-500" />
            {!isHidden && (
              <span className="text-sm font-medium text-gray-700">Usuario prueba</span>
            )}
          </div>
        </div>
      </Sidebar>
    </SidebarProvider>
  );
}
