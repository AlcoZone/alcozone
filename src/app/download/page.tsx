"use client";

import { useEffect, useState } from "react";
import { Menu } from "@/components/Menu/Menu";
import { Table } from "@/components/Table/Table";
import { getRevisionCsv } from "@/services/csv/getRevisionCSV";
import { getRevisionCsvList } from "@/services/csv/getRevisionCSVlist"; 
import type { DatasetItem } from "@/types/DataSetItem";

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
      <Menu variant="admin">
        <div
          className="bg-white shadow-xl rounded-xl p-6 space-y-4 transition-all duration-300"
          style={{
            marginTop: "50px",
            marginLeft: "-220px",
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