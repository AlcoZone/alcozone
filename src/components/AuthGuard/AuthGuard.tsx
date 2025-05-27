"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import Spinner from "@/components/Spinner/Spinner";
import { protectedRoutes } from "@/utils/protectedRoutes";
import { RoleType } from "@/types/Roles"; 

// Type guard para verificar que role sea válido
function isValidRole(role: string): role is RoleType {
  return ["admin", "datamanager", "datavisualizer"].includes(role);
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, role } = useAuth();

  useEffect(() => {
    if (loading) return;

    const allProtectedRoutes = new Set(
      Object.values(protectedRoutes).flatMap((routes) => Array.from(routes))
    );

    // Si la ruta es protegida y el usuario no está logueado
    if (allProtectedRoutes.has(pathname) && !user) {
      router.push("/auth/login");
      return;
    }

    // Si el usuario ya está logueado y entra a /login o /register, lo redirige a /home
    if (user && ["/auth/login", "/register"].includes(pathname)) {
      router.push("/home");
      return;
    }

    // Si está logueado y hay rol, pero no tiene acceso a la ruta
    if (user && role && allProtectedRoutes.has(pathname)) {
      if (isValidRole(role)) {
        const allowedRoutes = protectedRoutes[role];
        if (!allowedRoutes.has(pathname)) {
          router.push("/unauthorized");
          return;
        }
      } else {
        // Rol no válido o desconocido
        console.warn("Rol no reconocido:", role);
        router.push("/unauthorized");
        return;
      }
    }
  }, [user, loading, pathname, router, role]);

  // Mientras carga, muestra spinner
  if (loading) return <Spinner />;

  const allProtectedRoutes = new Set(
    Object.values(protectedRoutes).flatMap((routes) => Array.from(routes))
  );

  // Si aún no está logueado y la ruta es protegida, no renderiza nada
  if (allProtectedRoutes.has(pathname) && !user) return null;

  // Si todo está bien, renderiza el contenido
  return <>{children}</>;
}