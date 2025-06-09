import { RoleType } from "@/types/Roles";

export const protectedRoutes: Record<RoleType, Set<string>> = {
  admin: new Set([
    "/home",
    "/account",
    "/dashboard",
    "/map",
    "/revisions",
    "/database",
    "/users",
  ]),
  datamanager: new Set([
    "/home",
    "/account",
    "/dashboard",
    "/map",
    "/revisions",
    "/database",
  ]),
  datavisualizer: new Set([
    "/home",
    "/account",
    "/dashboard",
    "/map",
  ])
};