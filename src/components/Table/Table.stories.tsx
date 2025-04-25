"use client";

import React from "react";
import { Table } from "./Table";

export default {
  title: "Components/Table",
  component: Table,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "withActions"],
      description: "Choose table variant for static or interactive behavior",
      defaultValue: "default",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A flexible table component that supports both read-only and interactive data display. Use `variant` to toggle action columns.",
      },
    },
  },
};

const data = [
  {
    name: "Usuario Prueba",
    email: "Prueba@gmail.com",
    password: "Prueba123",
    role: "Data Manager",
  },
  {
    name: "Marcela",
    email: "Marcela@gmail.com",
    password: "Marcela123",
    role: "Data Visualizer",
  },
  {
    name: "Jose",
    email: "Jose@gmail.com",
    password: "Jose123",
    role: "Administrador",
  },
  {
    name: "Mariana",
    email: "Mariana@gmail.com",
    password: "Mariana123",
    role: "Data Visualizer",
  },
  {
    name: "Alondra",
    email: "Alondra@gmail.com",
    password: "Alondra123",
    role: "Data Manager",
  },
  {
    name: "Diego",
    email: "Diego@gmail.com",
    password: "Diego123",
    role: "Data Visualizer",
  },
  {
    name: "Brayan",
    email: "Brayan@gmail.com",
    password: "Brayan123",
    role: "Administrador",
  },
  {
    name: "Montserrat",
    email: "Montserrat@gmail.com",
    password: "Montserrat123",
    role: "Administrador",
  },
  {
    name: "Ricardo",
    email: "Ricardo@gmail.com",
    password: "Ricardo123",
    role: "Data Visualizer",
  },
];

const actions = [
  {
    label: "Modificar",
    onClick: (row: any) => alert(`Modificar: ${row.name}`),
  },
  {
    label: "Eliminar",
    onClick: (row: any) => alert(`Eliminar: ${row.name}`),
    className: "text-red-500",
  },
];

export const Default = () => (
  <Table
    variant="default"
    columns={[
      { header: "Usuario", accessor: "name" },
      { header: "Correo electrónico", accessor: "email" },
      { header: "Contraseña", accessor: "password" },
      { header: "Rol", accessor: "role" },
    ]}
    data={data}
  />
);

export const WithActions = () => (
  <Table
    variant="withActions"
    columns={[
      { header: "Usuario", accessor: "name" },
      { header: "Correo electrónico", accessor: "email" },
      { header: "Contraseña", accessor: "password" },
      { header: "Rol", accessor: "role" },
    ]}
    data={data}
    actions={actions}
  />
);
