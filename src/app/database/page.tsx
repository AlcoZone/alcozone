"use client";

import { Banner } from "@/components/Banner/Banner";
import { Menu } from "@/components/Menu/Menu";
import { Table } from "@/components/Table/Table";
import React, { useState } from "react";

const data = [
  {
    fecha: "2024-05-01",
    hora: "10:00 AM",
    alcaldia: "Alcaldía A",
    colonia: "Colonia A",
    longitud: "-99.1332",
    latitud: "19.4326",
    incidente: "Accidente de tránsito",
  },
  {
    fecha: "2024-05-02",
    hora: "02:00 PM",
    alcaldia: "Alcaldía B",
    colonia: "Colonia B",
    longitud: "-99.1634",
    latitud: "19.4123",
    incidente: "Accidente vehicular",
  },
  {
    fecha: "2024-05-03",
    hora: "06:30 AM",
    alcaldia: "Alcaldía C",
    colonia: "Colonia C",
    longitud: "-99.1523",
    latitud: "19.4567",
    incidente: "Accidente en motocicleta",
  },
  {
    fecha: "2024-05-04",
    hora: "08:15 PM",
    alcaldia: "Alcaldía D",
    colonia: "Colonia D",
    longitud: "-99.1723",
    latitud: "19.4221",
    incidente: "Accidente peatonal",
  },
  {
    fecha: "2024-05-01",
    hora: "10:00 AM",
    alcaldia: "Alcaldía A",
    colonia: "Colonia A",
    longitud: "-99.1332",
    latitud: "19.4326",
    incidente: "Accidente de tránsito",
  },
  {
    fecha: "2024-05-02",
    hora: "02:00 PM",
    alcaldia: "Alcaldía B",
    colonia: "Colonia B",
    longitud: "-99.1634",
    latitud: "19.4123",
    incidente: "Accidente vehicular",
  },
  {
    fecha: "2024-05-03",
    hora: "06:30 AM",
    alcaldia: "Alcaldía C",
    colonia: "Colonia C",
    longitud: "-99.1523",
    latitud: "19.4567",
    incidente: "Accidente en motocicleta",
  },
  {
    fecha: "2024-05-04",
    hora: "08:15 PM",
    alcaldia: "Alcaldía D",
    colonia: "Colonia D",
    longitud: "-99.1723",
    latitud: "19.4221",
    incidente: "Accidente peatonal",
  },
  {
    fecha: "2024-05-01",
    hora: "10:00 AM",
    alcaldia: "Alcaldía A",
    colonia: "Colonia A",
    longitud: "-99.1332",
    latitud: "19.4326",
    incidente: "Accidente de tránsito",
  },
  {
    fecha: "2024-05-02",
    hora: "02:00 PM",
    alcaldia: "Alcaldía B",
    colonia: "Colonia B",
    longitud: "-99.1634",
    latitud: "19.4123",
    incidente: "Accidente vehicular",
  },
  {
    fecha: "2024-05-03",
    hora: "06:30 AM",
    alcaldia: "Alcaldía C",
    colonia: "Colonia C",
    longitud: "-99.1523",
    latitud: "19.4567",
    incidente: "Accidente en motocicleta",
  },
  {
    fecha: "2024-05-04",
    hora: "08:15 PM",
    alcaldia: "Alcaldía D",
    colonia: "Colonia D",
    longitud: "-99.1723",
    latitud: "19.4221",
    incidente: "Accidente peatonal",
  },
  {
    fecha: "2024-05-01",
    hora: "10:00 AM",
    alcaldia: "Alcaldía A",
    colonia: "Colonia A",
    longitud: "-99.1332",
    latitud: "19.4326",
    incidente: "Accidente de tránsito",
  },
  {
    fecha: "2024-05-02",
    hora: "02:00 PM",
    alcaldia: "Alcaldía B",
    colonia: "Colonia B",
    longitud: "-99.1634",
    latitud: "19.4123",
    incidente: "Accidente vehicular",
  },
  {
    fecha: "2024-05-03",
    hora: "06:30 AM",
    alcaldia: "Alcaldía C",
    colonia: "Colonia C",
    longitud: "-99.1523",
    latitud: "19.4567",
    incidente: "Accidente en motocicleta",
  },
  {
    fecha: "2024-05-04",
    hora: "08:15 PM",
    alcaldia: "Alcaldía D",
    colonia: "Colonia D",
    longitud: "-99.1723",
    latitud: "19.4221",
    incidente: "Accidente peatonal",
  },
  {
    fecha: "2024-05-01",
    hora: "10:00 AM",
    alcaldia: "Alcaldía A",
    colonia: "Colonia A",
    longitud: "-99.1332",
    latitud: "19.4326",
    incidente: "Accidente de tránsito",
  },
  {
    fecha: "2024-05-02",
    hora: "02:00 PM",
    alcaldia: "Alcaldía B",
    colonia: "Colonia B",
    longitud: "-99.1634",
    latitud: "19.4123",
    incidente: "Accidente vehicular",
  },
  {
    fecha: "2024-05-03",
    hora: "06:30 AM",
    alcaldia: "Alcaldía C",
    colonia: "Colonia C",
    longitud: "-99.1523",
    latitud: "19.4567",
    incidente: "Accidente en motocicleta",
  },
  {
    fecha: "2024-05-04",
    hora: "08:15 PM",
    alcaldia: "Alcaldía D",
    colonia: "Colonia D",
    longitud: "-99.1723",
    latitud: "19.4221",
    incidente: "Accidente peatonal",
  },
];
export default function DatabasePage() {
  const [menuHidden, setMenuHidden] = useState(false);

  return (
    <>
      <Banner />
      <Menu variant="user" onToggle={setMenuHidden}>
        <div
          className="bg-white shadow-xl rounded-xl p-6 space-y-4 transition-all duration-300"
          style={{
            marginTop: "50px",
            marginLeft: "-220px",
            marginRight: "30px",
            bottom: "50px",
            height: "calc(100vh - 175px)",
            width: menuHidden ? "calc(100vw - 150px)" : "calc(100vw - 300px)",
            overflowY: "auto"
          }}
        >
          <h1 className="text-2xl font-bold text-blue-850">Base de datos</h1>
          <div className="w-full max-w-full overflow-y-auto" style={{ maxHeight: "500px" }}>
            <Table
              variant="default"
              columns={[
                { header: "Fecha", accessor: "fecha" },
                { header: "Hora", accessor: "hora" },
                { header: "Alcaldía", accessor: "alcaldia" },
                { header: "Colonia", accessor: "colonia" },
                { header: "Longitud", accessor: "longitud" },
                { header: "Latitud", accessor: "latitud" },
                { header: "Incidente", accessor: "incidente" },
              ]}
              data={data}
            />
          </div>
        </div>
      </Menu>
    </>
  );
}
