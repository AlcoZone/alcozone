"use client";

import { Banner } from "@/components/Banner/Banner";
import { Menu } from "@/components/Menu/Menu";
import { Table } from "@/components/Table/Table";
import React, { useState } from "react";

// Datos de ejemplo
const data = [
  {
    name: "Dataset accidentes mayo",
    data_quantity: 320,
    date: "2024-05-01",
    csvContent: `id,date,incidente\n1,2024-05-01,"Accidente de tránsito"\n2,2024-05-01,"Accidente de motocicleta"`,
  },
  {
    name: "Dataset infracciones abril",
    data_quantity: 180,
    date: "2024-04-17",
    csvContent: `id,date,incidente\n1,2024-04-17,"Infracción velocidad"\n2,2024-04-17,"Infracción luz roja"`,
  },
];

// Función utilitaria para descargar CSV
function downloadCSV(name: string, contenido: string) {
  const blob = new Blob([contenido], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export default function CsvPage() {
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
            overflowY: "auto",
          }}
        >
          <h1 className="text-2xl font-bold text-blue-850">Descargar Archivos en CSV</h1>
          <div className="w-full max-w-full overflow-y-auto" style={{ maxHeight: "500px" }}>
            <Table
              variant="withActions"
              columns={[
                { header: "Archivo", accessor: "name" },
                { header: "Registros", accessor: "data_quantity" },
                { header: "Fecha de carga", accessor: "date" },
              ]}
              data={data}
              actions={[
                {
                  label: "Descargar",
                  onClick: (row) => downloadCSV(row.name, row.csvContent),
                  className: "text-blue-850 font-semibold", 
                },
              ]}
            />
          </div>
        </div>
      </Menu>
    </>
  );
}