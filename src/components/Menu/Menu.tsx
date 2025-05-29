"use client";

import React, { useState, useEffect, useRef, PropsWithChildren } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { Icon } from "@/components/Icon/Icon";
import { useRouter } from "next/navigation";
import HamburgerButton from "@/components/HamburgerButton/HamburgerButton";
import TabSwitchButtons from "@/components/TabSwitchButtons/TabSwitchButtons";
import Link from "next/link";

type MenuProps = {
  variant?: "user" | "admin";
  onToggle?: (isHidden: boolean) => void;
} & PropsWithChildren;

export const Menu = ({ variant = "user", onToggle, children }: MenuProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const isAdmin = variant === "admin";

  const handleToggle = () => {
    setIsHidden((prev) => !prev);
  };

  const router = useRouter();
  
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    onToggle?.(isHidden);
  }, [isHidden, onToggle]);

  return (
    <SidebarProvider>
      {/* TODO el layout se maneja desde el Menu */}
      <div className="flex min-h-screen">
        {/* Menú fijo */}
        <Sidebar
          className={`${
            isHidden ? "w-20" : "w-56"
          } fixed top-0 left-0 h-screen z-50 border-r bg-white text-black flex flex-col justify-between transition-all duration-300`}
        >
          <SidebarContent>
            <div className="p-5 relative z-50">
              <HamburgerButton onClick={handleToggle} />
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Icon variant="logo" width={80} height={80} />
              </div>
              {!isHidden && (
                <span
                  className="ml-2 text-xl font-bold"
                  style={{ color: "var(--color-blue-850)" }}
                >
                  AlcoZone
                </span>
              )}
            </div>
            <div className="px-4 mt-4">
              {!isHidden && (
                <>
                  <p className="text-s font-semibold text-muted-foreground mt-1 mb-4">
                    MENÚ
                  </p>
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
                  <p className="text-s font-semibold text-muted-foreground mt-10 mb-4">
                    OTROS
                  </p>
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
                    <TabSwitchButtons variant="logout" onClick={handleLogout} />
                  </nav>
                </>
              )}
            </div>
          </SidebarContent>
          <div className="p-4 border-t text-sm text-muted-foreground flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <Icon variant="user" width={20} height={20} />
              {!isHidden && (
                <span className="text-sm font-medium text-gray-700">
                  Usuario prueba
                </span>
              )}
            </div>
          </div>
        </Sidebar>
        {/* Espaciador */}
        <div
          className={`transition-all duration-300 ${
            isHidden ? "w-20" : "w-56"
          } shrink-0`}
          aria-hidden="true"
        />
        {/* Contenido principal */}
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
};