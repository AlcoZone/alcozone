"use client";

import { Banner } from "@/components/Banner/Banner";
import ConfirmButtons from "@/components/ConfirmButtons/ConfirmButtons";
import { Menu } from "@/components/Menu/Menu";
import { Table } from "@/components/Table/Table";
import { TableInput } from "@/components/TableInputs/tableInputs";
import React, { useState, useEffect } from "react";

const roleMap: { [key: string]: number } = {
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
  const [newUser, setNewUser] = useState({ user: "", email: "", password: "", role: "" });
  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [id]: value }));
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/all");
      if (!response.ok) throw new Error("No se pudo obtener usuarios");

      const users = await response.json();
      const translatedUsers = users.map((user: any) => ({
        name: user.username,
        email: user.email,
        password: user.password,
        role: Object.keys(roleMap).find((key) => roleMap[key] === user.role_id) || "Desconocido",
      }));

      setUserData(translatedUsers);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const handleSubmit = async () => {
    setError("");

    if (!newUser.user || !newUser.email || !newUser.password || !newUser.role) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const roleId = roleMap[newUser.role];
    if (!roleId) {
      setError("Rol inválido. Usa: Administrador, Data Visualizer o Data Manager.");
      return;
    }

    const payload = {
      username: newUser.user,
      email: newUser.email,
      password: newUser.password,
      role_id: roleId,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar.");
      }

      alert("Usuario registrado exitosamente en backend.");
      setNewUser({ user: "", email: "", password: "", role: "" });
      await fetchUsers();
    } catch (error: any) {
      setError(`Error al registrar el usuario: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
          <h1 className="text-3xl font-bold text-blue-850">Base de datos</h1>

          <div className="w-full max-w-full overflow-y-auto" style={{ maxHeight: "320px" }}>
            <Table
              variant="withActions"
              columns={[
                { header: "Name", accessor: "name" },
                { header: "Email", accessor: "email" },
                { header: "Password", accessor: "password" },
                { header: "Role", accessor: "role" },
              ]}
              data={userData}
              actions={actions}
            />
          </div>

          <h1 className="text-1xl font-bold text-gray-600 text-center">Registrar nuevo usuario</h1>

          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          <div className="mt-4 flex justify-center flex-wrap gap-4">
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
              placeholder="Administrador / Data Visualizer / Data Manager"
            />
          </div>

          <div className="mt-4 flex justify-center">
            <ConfirmButtons variant="registerNewUser" onClick={handleSubmit} />
          </div>
        </div>
      </Menu>
    </>
  );
}
