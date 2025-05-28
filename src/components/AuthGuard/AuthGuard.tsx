"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import Spinner from "@/components/Spinner/Spinner";
import { protectedRoutes } from "@/utils/protectedRoutes";
import { RoleType } from "@/types/Roles"; 

function isValidRole(role: string): role is RoleType {
  return ["admin", "datamanager", "datavisualizer"].includes(role);
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

    if (allProtectedRoutes.has(pathname) && !user) {
      router.push("/auth/login");
      return;
    }

    if (user && ["/auth/login", "/users"].includes(pathname)) {
      router.push("/home");
      return;
    }

    if (user && role && allProtectedRoutes.has(pathname)) {
      if (isValidRole(role)) {
        const allowedRoutes = protectedRoutes[role];
        if (!allowedRoutes.has(pathname)) {
          router.push("/home");
          return;
        }
      } else {
        console.warn("Rol no reconocido:", role);
        router.push("/home");
        return;
      }
    }

    setAuthorized(true);
  }, [user, loading, pathname, router, role]);

  if (loading || !authorized) return <Spinner />;

  return <>{children}</>;
}