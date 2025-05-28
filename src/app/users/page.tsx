"use client";

import { Banner } from "@/components/Banner/Banner";
import ConfirmButtons from "@/components/ConfirmButtons/ConfirmButtons";
import { Menu } from "@/components/Menu/Menu";
import { Table } from "@/components/Table/Table";
import { TableInput } from "@/components/TableInputs/tableInputs";
import api from "@/services/api";
import React, { useState, useEffect } from "react";

type Role = "Administrador" | "Data Visualizer" | "Data Manager";

interface UserRow {
  name: string;
  email: string;
  password: string;
  role: Role | "Desconocido";
}

interface NewUser {
  user: string;
  email: string;
  password: string;
  role: string;
}

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
    onClick: (row: any) => alert(`Eliminar: ${row.name}`),
    className: "text-red-500 hover:underline cursor-pointer font-medium",
  },
];

export default function DatabasePage() {
  const [menuHidden, setMenuHidden] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({ user: "", email: "", password: "", role: "" });
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<UserRow[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/user/all");
      const users = response.data;

      const mappedUsers: UserRow[] = users.map((user: any) => ({
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

  useEffect(() => {
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
      const response = await api.post("/user/register", payload);
      alert("Usuario registrado exitosamente.");
      setNewUser({ user: "", email: "", password: "", role: "" });
      await fetchUsers();
    } catch (error: any) {
      setError(`Error al registrar el usuario: ${error?.response?.data?.message || error.message}`);
    }
  };

  return (
    <>
      <Banner />
      <Menu variant="admin" onToggle={setMenuHidden}>
        <div
          className="bg-white shadow-xl rounded-xl p-6 space-y-4 transition-all duration-300"
          style={{
            marginTop: "50px",
            marginLeft: "-220px",
            marginRight: "30px",
            bottom: "50px",
            height: "calc(100vh - 175px)",
            width: menuHidden ? "calc(100vw - 150px)" : "calc(100vw - 300px)",
            overflowY: "auto",
          }}
        >
          <h1 className="text-3xl font-bold text-blue-850">Usuarios</h1>

          <div className="w-full max-w-full overflow-y-auto" style={{ maxHeight: "320px" }}>
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

          <h1 className="text-1xl font-bold text-gray-600 text-center">Registrar nuevo usuario</h1>

          <div className="mt-4 flex justify-center">
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

          <div className="mt-4 flex justify-center">
            <ConfirmButtons variant="registerNewUser" onClick={handleSubmit} />
          </div>

          {error && (
            <div className="mt-4 text-red-600 text-center font-semibold">
              {error}
            </div>
          )}
        </div>
      </Menu>
    </>
  );
}

