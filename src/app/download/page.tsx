"use client";

import { useEffect, useState } from "react";
import { Banner } from "@/components/Banner/Banner";
import { Menu } from "@/components/Menu/Menu";
import { Table } from "@/components/Table/Table";
import api from "@/services/api";

interface DatasetItem {
  uuid: string;
  name: string;
  dataQuantity: number;
  date: string;
}

export default function CsvPage() {
  const [menuHidden, setMenuHidden] = useState(false);
  const [datasets, setDatasets] = useState<DatasetItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/revision/csv/list");
        setDatasets(data);
      } catch (error) {
        console.error("Error al obtener la lista de revisiones:", error);
      }
    };

    fetchData();
  }, []);

  const downloadCSV = async (name: string, uuid: string) => {
    try {
      const response = await api.get(`http://localhost:8080/api/v1/revision/csv?uuid=${uuid}&withData=true`, {
        responseType: "blob",
        headers: {
          Accept: "text/csv", 
        },
      });

      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar CSV:", error);
      alert("No se pudo descargar el archivo.");
    }
  };

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
                { header: "Registros", accessor: "dataQuantity" },
                { header: "Fecha de carga", accessor: "date" },
              ]}
              data={datasets}
              actions={[
                {
                  label: "Descargar",
                  onClick: (row) => downloadCSV(row.name, row.uuid),
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