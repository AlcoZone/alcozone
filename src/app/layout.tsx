"use client"

import { AuthGuard } from "@/components/AuthGuard/AuthGuard";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider"
import { Menu } from "@/components/Menu/Menu";
import { usePathname } from "next/navigation";
import { publicRoutes } from "@/utils/publicRoutes";
import { Banner } from "@/components/Banner/Banner";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.has(pathname);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthGuard>
            {isPublicRoute ? (
              <>
                {children}
                <Banner/>
              </>
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