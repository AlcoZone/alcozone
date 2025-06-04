export type Role = "Administrador" | "Data Visualizer" | "Data Manager";

export interface UserRow {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role | "Desconocido";
}

export interface NewUser {
  user: string;
  email: string;
  password: string;
  role: string;
}
