"use client";

import { AuthGuard } from "@/components/AuthGuard/AuthGuard";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { Menu } from "@/components/Menu/Menu";
import { usePathname } from "next/navigation";
import { publicRoutes } from "@/utils/publicRoutes";
import { Banner } from "@/components/Banner/Banner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.has(pathname);

  return (
    <html lang="en">
      <body className="bg-[#F2F2F2]">
        <AuthProvider>
          <AuthGuard>
            {isPublicRoute ? (
              <>
                {children}
                <Banner />
              </>
            ) : (
              <div className="flex">
                <Menu />
                <div className="bg-white shadow-xl rounded-xl p-6 space-y-4 transition-all duration-300 m-6 h-[94vh] w-full overflow-y-auto">
                  {children}
                </div>
              </div>
            )}
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
