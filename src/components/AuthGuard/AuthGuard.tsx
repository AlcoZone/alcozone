"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import Spinner from "@/components/Spinner/Spinner";
import { protectedRoutes } from "@/utils/protectedRoutes";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, role } = useAuth();

  useEffect(() => {
    // NO hacemos nada hasta que loading sea false
    if (loading) return;

    // Si la ruta es protegida y no hay usuario, redirige a login
    if (protectedRoutes.has(pathname) && !user) {
      if (pathname !== "/auth/login" && pathname !== "/login") {
        router.push("/auth/login"); // O "/login" según tu ruta real
      }
      return;
    }

    // Si el usuario ya está logueado y trata de ir a login, redirige a home
    if (user && (pathname === "/auth/login" || pathname === "/login" || pathname === "/register")) {
      router.push("/home"); // O la ruta default para logueados
      return;
    }

    // Poner la logica de roles despues 
    // if (user && routeRoles[pathname] && (!role || !routeRoles[pathname].includes(role))) {
    //   router.push("/auth/login");
    //   return;
    // }
  }, [user, loading, pathname, router, role]);

  // Sólo muestra el spinner si loading es true (previene loops)
  if (loading) return <Spinner />;

  // Si el usuario no está logueado en una ruta protegida, no renderices nada (ya redirige el useEffect)
  if (protectedRoutes.has(pathname) && !user) return null;

  return <>{children}</>;
}