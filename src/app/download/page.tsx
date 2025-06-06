"use client";

import { useEffect, useState } from "react";
import { Table } from "@/components/Table/Table";
import { getRevisionCsv } from "@/services/csv/getRevisionCSV";
import { getRevisionCsvList } from "@/services/csv/getRevisionCSVlist";
import type { DatasetItem } from "@/types/DataSetItem";
import { deleteRevision } from "@/services/csv/deleteRevision";
import { ToastContainer, toast } from "react-toastify";


export default function CsvPage() {
  const [datasets, setDatasets] = useState<DatasetItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRevisionCsvList();
      setDatasets(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className="bg-gray-242 shadow-xl rounded-xl p-6 space-y-4 transition-all duration-300"
        style={{
          marginTop: "50px",
          marginRight: "30px",
          bottom: "50px",
          height: "calc(100vh - 100px)",
          width: "calc(100vw - 300px)",
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
                onClick: (row) => getRevisionCsv(row.uuid, row.name),
                className: "text-blue-850 font-semibold cursor-pointer",
              },
              {
                label: "Eliminar",
                onClick: async (row) => {
                  const confirmed = window.confirm(
                    `¿Seguro que deseas borrar el dashboard "${row.name}"?`
                  );
                  if (!confirmed) return;
                  
                  try {
                    await deleteRevision(row.uuid);
                    toast.success("Revisión eliminada correctamente");
                    setDatasets((prev) => prev.filter((item) => item.uuid !== row.uuid));
                  } catch (error) {
                    toast.error("Error al eliminar la revisión");
                  }
                },
                className: "ml-5 text-red-700 font-semibold cursor-pointer",
              },
            ]}
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}