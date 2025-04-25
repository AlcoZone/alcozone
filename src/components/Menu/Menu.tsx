"use client";

import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { Icon } from "@/components/Icon/Icon";
import HamburgerButton from "@/components/HamburgerButton/HamburgerButton"
import TabSwitchButtons from "@/components/TabSwitchButtons/TabSwitchButtons";
import Link from "next/link";

type MenuProps = {
  variant?: "user" | "admin" | "hidden";
  onToggle?: () => void;
};

export const Menu = ({ variant = "user", onToggle }: MenuProps) => {
  const isHidden = variant === "hidden";
  const isAdmin = variant === "admin";

  return (
    <SidebarProvider>
      <Sidebar
        className={`${
          isHidden ? "w-20" : "w-56"
        } bg-white text-black flex flex-col justify-between border-r transition-all duration-300`}>
        <SidebarContent>
          {/* Botón hamburguesa */}
          <div className="p-5 relative z-50">
            <HamburgerButton onClick={onToggle} />
          </div>
          {/* Logo y nombre */}
          <div className="flex items-center justify-center py-2">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Icon variant="logo" width={80} height={80} />
          </div>
          {!isHidden && (
          <span
          className="ml-2 text-xl font-bold"
          style={{ color: "var(--color-blue-850)" }}>AlcoZone
        </span>        
          )}
        </div>
          {/* Menú principal */}
          <div className="px-4 mt-4">
            {!isHidden && (
              <>
                <p className="text-s font-semibold text-muted-foreground mt-1 mb-4">MENÚ</p>
                <nav className="space-y-2">
                  <Link href="/home">
                    <TabSwitchButtons variant="home" />
                  </Link>
                  <Link href="/dashboard">
                    <TabSwitchButtons variant="dashboard" />
                  </Link>
                  <Link href="/database">
                    <TabSwitchButtons variant="database" />
                  </Link>
                  {isAdmin && (
                    <Link href="/users">
                      <TabSwitchButtons variant="users" />
                    </Link>
                  )}
                  <Link href="/map">
                    <TabSwitchButtons variant="map" />
                  </Link>
                </nav>
                <p className="text-s font-semibold text-muted-foreground mt-10 mb-4">OTROS</p>
                <nav className="space-y-2">
                  <Link href="/account">
                    <TabSwitchButtons variant="account" />
                  </Link>
                  <Link href="/upload">
                    <TabSwitchButtons variant="upload" />
                  </Link>
                  <Link href="/download">
                    <TabSwitchButtons variant="download" />
                  </Link>
                  <Link href="/logout">
                    <TabSwitchButtons variant="logout" />
                  </Link>
                </nav>
              </>
            )}
          </div>
        </SidebarContent>
        {/* Footer */}
        <div className="p-4 border-t text-sm text-muted-foreground flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <Icon variant="user" width={20} height={20} />
          {!isHidden && (
            <span className="text-sm font-medium text-gray-700">Usuario prueba</span>
          )}
        </div>
      </div>
      </Sidebar>
    </SidebarProvider>
  );
}