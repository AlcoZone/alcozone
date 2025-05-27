//export const protectedRoutes = new Set(["/home", "/database", "/users"]); 
// agregar las rutas de cada quien 
import { RoleType } from "@/types/Roles";

export const protectedRoutes: Record<RoleType, Set<string>> = {
  admin: new Set([
    "/home",
    "/account",
    "/dashboard",
    "/map",
    "/upload",
    "/download",
    "/database",
    "/users",
  ]),
  datamanager: new Set([
    "/home",
    "/account",
    "/dashboard",
    "/map",
    "/upload",
    "/download",
    "/database",
  ]),
  datavisualizer: new Set([
    "/home",
    "/account",
    "/dashboard",
    "/map",
  ]),
};