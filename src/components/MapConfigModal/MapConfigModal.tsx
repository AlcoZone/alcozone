"use client"

import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

export default function MapConfigModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    // const [mapType, setMapType] = useState("revision");
    const [dataSource, setDataSource] = useState("revision");
    const [selectedRevision, setSelectedRevision] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const revisionsPlaceholder = [
        { label: "Revision 1", value: "revision-1" },
        { label: "Revision 2", value: "revision-2" },
        { label: "Revision 3", value: "revision-3" },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <button className="btn-primary">Editar Mapa</button>
            </DialogTrigger>
            <DialogContent className="max-w-lg sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Configuración de Mapa</DialogTitle>
                </DialogHeader>

                <div className="mt-4 flex items-center gap-6">
                    <span className="font-medium min-w-[120px]">Fuente de Datos</span>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="data-source"
                            value="revision"
                            checked={dataSource === "revision"}
                            onChange={() => setDataSource("revision")}
                            className="form-radio text-blue-600"
                        />
                        Revision
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="data-source"
                            value="rango-fechas"
                            checked={dataSource === "rango-fechas"}
                            onChange={() => setDataSource("date-range")}
                            className="form-radio text-blue-600"
                        />
                        Rango de fechas
                    </label>
                </div>

                {dataSource === "revision" && (
                    <div className="mt-4 flex items-center gap-4">
                        <label htmlFor="revision-select" className="min-w-[120px] font-medium">
                            Selecciona una revisión
                        </label>
                        <select
                            id="revision-select"
                            value={selectedRevision}
                            onChange={(e) => setSelectedRevision(e.target.value)}
                            className="border rounded px-3 py-1"
                        >
                            <option value="" disabled>
                                -- Selecciona --
                            </option>
                            {revisionsPlaceholder.map((rev) => (
                                <option key={rev.value} value={rev.value}>
                                    {rev.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {dataSource === "date-range" && (
                    <div className="mt-4 flex items-center gap-4">
                        <label htmlFor="date-select" className="min-w-[120px] font-medium">
                            Selecciona una fecha
                        </label>
                        <input
                            type="date"
                            id="date-select"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="border rounded px-3 py-1"
                        />
                    </div>
                )}

                <DialogClose asChild>
                    <button className="mt-6 btn-secondary">Cerrar</button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
