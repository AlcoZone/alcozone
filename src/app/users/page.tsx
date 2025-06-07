"use client";

import ConfirmButtons from "@/components/ConfirmButtons/ConfirmButtons";
import { Table } from "@/components/Table/Table";
import { TableInput } from "@/components/TableInputs/tableInputs";
import api from "@/services/api";
import React, { useState} from "react";
import {Role, UserRow, NewUser } from "@/types/User";

const roleMap: Record<Role, number> = {
  "Administrador": 1,
  "Data Visualizer": 2,
  "Data Manager": 3,
};
const actions = [
  {
    label: "Modificar",
    onClick: (row: any) => alert(`Modificar: ${row.name}`),
    className: "text-blue-600 hover:underline cursor-pointer font-medium",
  },
  {
    label: "Eliminar",
    onClick: async (row: UserRow) => {
      const confirmed = window.confirm(`¿Estás seguro de eliminar a ${row.name}?`);
      if (!confirmed) return;

      try {
        await api.delete(`/users/delete/${row.id}`);
        alert("Usuario eliminado exitosamente.");
        await fetchUsers();
      } catch (error: any) {
        alert(`Error al eliminar el usuario: ${error?.response?.data?.message || error.message}`);
      }
    },
    className: "text-red-500 hover:underline cursor-pointer font-medium",
  },
];

let fetchUsers: () => Promise<void>;

export default function DatabasePage() {
  const [newUser, setNewUser] = useState<NewUser>({ user: "", email: "", password: "", role: "" });
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<UserRow[]>([]);

  fetchUsers = async () => {
    try {
      const response = await api.get("/user/all");
      const users = response.data;

      const mappedUsers: UserRow[] = users
        .filter((user: any) => user.deleted === false)  
        .map((user: any) => ({
          id: user.id,
          name: user.username,
          email: user.email,
          password: "***************",
          role: (Object.keys(roleMap) as Role[]).find(key => roleMap[key] === user.role_id) || "Desconocido",
        }));

      setData(mappedUsers);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [id]: value }));
  };

  const handleSubmit = async () => {
    setError("");
  
    if (!newUser.user || !newUser.email || !newUser.password || !newUser.role) {
      setError("Por favor, complete todos los campos.");
      return;
    }
  
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(newUser.email)) {
      setError("Correo electrónico inválido.");
      return;
    }
  
    if (newUser.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
  
    const emailExists = data.some(user => user.email === newUser.email);
    if (emailExists) {
      setError("El correo electrónico ya está en uso.");
      return;
    }
  
    const roleId = roleMap[newUser.role as Role];
    if (!roleId) {
      setError("El rol ingresado no es válido. Usa: Administrador, Data Visualizer o Data Manager.");
      return;
    }
  
    const payload = {
      username: newUser.user,
      email: newUser.email,
      password: newUser.password,
      role_id: roleId,
    };
  
    try {
      await api.post("/user/register", payload);
      alert("Usuario registrado exitosamente.");
      setNewUser({ user: "", email: "", password: "", role: "" });
      await fetchUsers();
    } catch (error: any) {
      setError(`Error al registrar el usuario: ${error?.response?.data?.message || error.message}`);
    }
  };
  
  return (
    <div className="h-[screen-40px]">
          <h1 className="text-3xl font-bold text-blue-850 mb-4">Usuarios</h1>

          <div className="w-full max-w-full overflow-y-auto" style={{ maxHeight: "400px" }}>
            <Table
              variant="withActions"
              columns={[
                { header: "Name", accessor: "name" },
                { header: "Email", accessor: "email" },
                { header: "Password", accessor: "password" },
                { header: "Role", accessor: "role" },
              ]}
              data={data}
              actions={actions}
            />
          </div>
          <div className="mt-10">
            <h1 style={{ fontSize: "1.375rem" }} className=" font-bold text-gray-600 text-center mb-4">Registrar nuevo usuario</h1>
            <div className="mt- flex justify-center">
              <TableInput
                label="Usuario"
                type="text"
                id="user"
                value={newUser.user}
                onChange={handleInputChange}
                placeholder="Nombre de usuario"
              />
              <TableInput
                label="Correo electrónico"
                type="email"
                id="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <TableInput
                label="Contraseña"
                type="password"
                id="password"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder="Contraseña"
              />
              <TableInput
                label="Rol"
                type="text"
                id="role"
                value={newUser.role}
                onChange={handleInputChange}
                placeholder="Rol"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <ConfirmButtons variant="registerNewUser" onClick={handleSubmit} />
          </div>

          {error && (
            <div className="mt-4 text-red-600 text-center font-semibold">
              {error}
            </div>
          )}
    </div>
  );
}
