"use client";

import React, { PropsWithChildren } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { Icon } from "@/components/Icon/Icon";
import TabSwitchButtons from "@/components/TabSwitchButtons/TabSwitchButtons";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { RoleType } from "@/types/Roles";
import { protectedRoutes } from "@/utils/protectedRoutes";

const allRoutes = [
  { path: "/home", variant: "home" },
  { path: "/dashboard", variant: "dashboard" },
  { path: "/database", variant: "database" },
  { path: "/users", variant: "users" },
  { path: "/map", variant: "map" },
  { path: "/account", variant: "account" },
  { path: "/upload", variant: "upload" },
  { path: "/download", variant: "download" },
];

export const Menu = () => {
  const { logout, role, name, user } = useAuth();

  if (user && !role) {
    return <div className="p-6 text-muted-foreground">Cargando menú...</div>;
  }

  const handleLogout = () => logout?.();

  if (user && role) {
    const allowedRoutes = protectedRoutes[role as RoleType];

    return (
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar className="w-56 fixed top-0 left-0 h-screen z-50 border-r bg-white text-black flex flex-col justify-between">
            <SidebarContent>
              <div className="flex items-center justify-center py-6">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <Icon variant="logo" width={80} height={80} />
                </div>
                <span
                  className="ml-2 text-xl font-bold"
                  style={{ color: "var(--color-blue-850)" }}
                >
                  AlcoZone
                </span>
              </div>
              <div className="px-4 mt-4">
                <p className="text-s font-semibold text-muted-foreground mt-1 mb-4">
                  MENÚ
                </p>
                <nav className="space-y-2">
                  {allRoutes
                    .filter(
                      ({ path }) =>
                        allowedRoutes.has(path) &&
                        !["/account", "/upload", "/download"].includes(path)
                    )
                    .map(({ path, variant }) => (
                      <Link href={path} key={path}>
                        <TabSwitchButtons variant={variant} />
                      </Link>
                    ))}
                </nav>

                <p className="text-s font-semibold text-muted-foreground mt-10 mb-4">
                  OTROS
                </p>
                <nav className="space-y-2">
                  {["/account", "/upload", "/download"]
                    .filter((path) => allowedRoutes.has(path))
                    .map((path) => {
                      const variant = path.replace("/", "") as Parameters<
                        typeof TabSwitchButtons
                      >[0]["variant"];
                      return (
                        <Link href={path} key={path}>
                          <TabSwitchButtons variant={variant} />
                        </Link>
                      );
                    })}
                  <TabSwitchButtons variant="logout" onClick={handleLogout} />
                </nav>
              </div>
            </SidebarContent>

            <div className="p-4 border-t text-sm text-muted-foreground flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <Icon variant="user" width={20} height={20} />
                <span className="text-sm font-medium text-gray-700">
                  {name || "Usuario"}
                </span>
              </div>
            </div>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
};
