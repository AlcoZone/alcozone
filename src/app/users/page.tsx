"use client";

import { Banner } from "@/components/Banner/Banner";
import ConfirmButtons from "@/components/ConfirmButtons/ConfirmButtons";
import { Menu } from "@/components/Menu/Menu";
import { Table } from "@/components/Table/Table";
import { InputWithLabel } from "@/components/TableInputs/tableInputs";
import React, { useState } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

const data = [
  { name: "Usuario Prueba", email: "Prueba@gmail.com", password: "Prueba123", role: "Data Manager" },
  { name: "Marcela", email: "Marcela@gmail.com", password: "Marcela123", role: "Data Visualizer" },
  { name: "Jose", email: "Jose@gmail.com", password: "Jose123", role: "Administrador" },
  { name: "Mariana", email: "Mariana@gmail.com", password: "Mariana123", role: "Data Visualizer" },
  { name: "Alondra", email: "Alondra@gmail.com", password: "Alondra123", role: "Data Manager" },
  { name: "Diego", email: "Diego@gmail.com", password: "Diego123", role: "Data Visualizer" },
  { name: "Luis", email: "Luis@gmail.com", password: "Luis123", role: "Administrador" },
  { name: "Montserrat", email: "Montserrat@gmail.com", password: "Montserrat123", role: "Administrador" },
  { name: "Ricardo", email: "Ricardo@gmail.com", password: "Ricardo123", role: "Data Visualizer" },
  { name: "Diego", email: "Diego@gmail.com", password: "Diego123", role: "Data Visualizer" },
  { name: "Luis", email: "Luis@gmail.com", password: "Luis123", role: "Administrador" },
  { name: "Montserrat", email: "Montserrat@gmail.com", password: "Montserrat123", role: "Administrador" },
  { name: "Ricardo", email: "Ricardo@gmail.com", password: "Ricardo123", role: "Data Visualizer" },
];

const users = [
  { user: "", email: "", password: "", role: "" },
];

export default function DatabasePage() {
  const [menuHidden, setMenuHidden] = useState(false);
  const [newUser, setNewUser] = useState({ user: "", email: "", password: "", role: "" });
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!newUser.user || !newUser.email || !newUser.password || !newUser.role) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
      const user = userCredential.user;
      alert("Usuario registrado exitosamente");
      setNewUser({ user: "", email: "", password: "", role: "" });
    } catch (error: any) {
      setError(`Error al registrar el usuario: ${error.message}`);
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
              data={data}
              actions={actions}
            />
          </div>

          <h1 className="text-1xl font-bold text-gray-600 text-center">Registrar nuevo usuario</h1>

          <div className="mt-4 flex justify-center">
            <InputWithLabel
              label="Usuario"
              type="text"
              id="user"
              value={newUser.user}
              onChange={handleInputChange}
              placeholder="Nombre de usuario"
            />
            <InputWithLabel
              label="Correo electrónico"
              type="email"
              id="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <InputWithLabel
              label="Contraseña"
              type="password"
              id="password"
              value={newUser.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
            />
            <InputWithLabel
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
        </div>
      </Menu>
    </>
  );
}
