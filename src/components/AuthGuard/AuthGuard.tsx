"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import Spinner from "@/components/Spinner/Spinner";
import { protectedRoutes } from "@/utils/protectedRoutes";
import { RoleType } from "@/types/Roles";

function isValidRole(role: string | null): role is RoleType {
  return ["admin", "datamanager", "datavisualizer", "anonymus"].includes(role ?? "");
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, role } = useAuth();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    const allProtectedRoutes = new Set(
      Object.values(protectedRoutes).flatMap((routes) => Array.from(routes))
    );

    const isProtected = allProtectedRoutes.has(pathname);

    if (user && role === null) {
      return;
    }

    if (isProtected && !user) {
      router.push("/auth/login");
      return;
    }

    if (user && ["/auth/login"].includes(pathname)) {
      router.push("/home");
      return;
    }

    if (user && isProtected) {
      if (!isValidRole(role)) {
        console.warn("Rol no válido:", role);
        router.push("/home");
        return;
      }

      const allowedRoutes = protectedRoutes[role];
      if (!allowedRoutes.has(pathname)) {
        console.warn("Ruta no permitida para este rol:", pathname);
        router.push("/home");
        return;
      }
    }

    setAuthorized(true);
  }, [user, loading, pathname, router, role]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}