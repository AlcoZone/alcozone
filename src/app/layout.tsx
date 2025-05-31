"use client"

import { AuthGuard } from "@/components/AuthGuard/AuthGuard";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider"
import { protectedRoutes } from "@/utils/protectedRoutes";
import { Menu } from "@/components/Menu/Menu";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = protectedRoutes.public.has(pathname);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthGuard>
            {isPublicRoute ? (
              <>{children}</>
            ) : (
              <Menu>
                {children}
              </Menu>
            )}
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}