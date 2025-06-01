"use client"

import {useEffect, useState} from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { MapConfig } from "@/types/MapConfig";
import {RevisionMetadata} from "@/types/RevisionMetadata";
import api from "@/services/api";

export default function MapConfigModal({
   open,
   onOpenChange,
   mapConfig,
   setMapConfig,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void
    mapConfig: MapConfig;
    setMapConfig: (config: MapConfig) => void;
}) {
    const [revisions, setRevisions] = useState<RevisionMetadata[]>([]);
    const [selectedDate, setSelectedDate] = useState("");

    const handleTypeChange = (type: string) => {
        setMapConfig({ ...mapConfig, type });
    };

    const handleDataSourceChange = (data_source: string) => {
        setMapConfig({ ...mapConfig, data_source });
    };

    const handleRevisionSetChange = (revision: string) => {
        setMapConfig({ ...mapConfig, revision });
    };

    const getRevisions = async () => {
        try {
            const response = await api.get("/revision/list");
            setRevisions(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getRevisions()
    }, [mapConfig]);

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
                    <span className="font-medium min-w-[120px]">Tipo de Datos</span>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="hotspot"
                            checked={mapConfig.type === "hotspot"}
                            onChange={() => handleTypeChange("hotspot")}
                            className="form-radio text-blue-600"
                        />
                        Puntos Calientes
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="predictive"
                            checked={mapConfig.type === "predictive"}
                            onChange={() => handleTypeChange("predictive")}
                            className="form-radio text-blue-600"
                        />
                        Predictivo
                    </label>
                </div>

                <div className="mt-4 flex items-center gap-6">
                    <span className="font-medium min-w-[120px]">Fuente de Datos</span>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="revision"
                            checked={mapConfig.data_source === "revision"}
                            onChange={() => handleDataSourceChange("revision")}
                            className="form-radio text-blue-600"
                        />
                        Revision
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="date-range"
                            checked={mapConfig.data_source === "date-range"}
                            onChange={() => handleDataSourceChange("date-range")}
                            className="form-radio text-blue-600"
                        />
                        Rango de fechas
                    </label>
                </div>

                {mapConfig.data_source === "revision" && (
                    <div className="mt-4 flex items-center gap-4">
                        <label htmlFor="revision-select" className="min-w-[120px] font-medium">
                            Selecciona una revisión
                        </label>
                        <select
                            id="revision-select"
                            value={mapConfig.revision}
                            onChange={(e) => handleRevisionSetChange(e.target.value)}
                            className="border rounded px-3 py-1"
                        >
                            <option value="" disabled>
                                -- Selecciona --
                            </option>
                            {revisions.map((revision) => (
                                <option key={revision.uuid} value={revision.uuid}>
                                    {revision.name} ({revision.dataQuantity} Datos)
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {mapConfig.data_source === "date-range" && (
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
