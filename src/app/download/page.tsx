"use client";

import { useEffect, useState } from "react";
import { Table } from "@/components/Table/Table";
import { getRevisionCsv } from "@/services/csv/getRevisionCSV";
import { getRevisionCsvList } from "@/services/csv/getRevisionCSVlist";
import type { DatasetItem } from "@/types/DataSetItem";
import { deleteRevision } from "@/services/csv/deleteRevision";
import { ToastContainer, toast } from "react-toastify";
import { RevisionUploadDialog } from "@/components/RevisionUploadDialog/RevisionUploadDialog";
import api from "@/services/api";

export default function CsvPage() {
    const [datasets, setDatasets] = useState<DatasetItem[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCreateRevision = async ({revisionName, file}) => {
        try {
            const formData = new FormData();
            formData.append("name", revisionName);
            formData.append("file", file);

            const res = await api.post("/revision", formData, {
                headers: {"Content-Type": "multipart/form-data"},
            })

            if (!res.status === 200) {
                throw new Error(`Error ${res.status}: ${await res.text()}`);
            }

            toast.success("Revisión subida con éxito");

            // Refresca la tabla
            const updated = await getRevisionCsvList();
            setDatasets(updated);
        } catch (err) {
            console.error(err);
            toast.error("Error al crear la revisión");
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            const data = await getRevisionCsvList();
            setDatasets(data);
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-blue-850">Revisiones</h1>
                <button
                    onClick={() => setDialogOpen(true)}
                    className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    + Añadir Revisión
                </button>
            </div>
            <div className="w-full max-w-full overflow-y-auto" style={{maxHeight: "500px"}}>
                <Table
                    variant="withActions"
                    columns={[
                        {header: "Archivo", accessor: "name"},
                        {header: "Registros", accessor: "dataQuantity"},
                        {header: "Fecha de carga", accessor: "date"},
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
            <ToastContainer/>
            <RevisionUploadDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleCreateRevision}
            />
        </>
    );
}