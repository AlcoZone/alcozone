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
    const [type, setType] = useState(mapConfig.type);
    const [data_source, setDataSource] = useState(mapConfig.data_source);
    const [revision, setRevision] = useState();

    const handleSave = () => {
        setMapConfig({
            type: type,
            data_source: data_source,
            revision: revision,
        })
    }

    const getRevisions = async () => {
        try {
            const response = await api.get("/revision/list");
            setRevisions(response.data);
            if(mapConfig.revision === "latest") {
                setRevision(response.data?.at(-1)?.uuid);
            }
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
                            checked={type === "hotspot"}
                            onChange={() => setType("hotspot")}
                            className="form-radio text-blue-600"
                        />
                        Puntos Calientes
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="predictive"
                            checked={type === "predictive"}
                            onChange={() => setType("predictive")}
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
                            checked={data_source === "revision"}
                            onChange={() => setDataSource("revision")}
                            className="form-radio text-blue-600"
                        />
                        Revision
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="date-range"
                            checked={data_source === "date-range"}
                            onChange={() => setDataSource("date-range")}
                            className="form-radio text-blue-600"
                        />
                        Rango de fechas
                    </label>
                </div>

                {data_source === "revision" && (
                    <div className="mt-4 flex items-center gap-4">
                        <label htmlFor="revision-select" className="min-w-[120px] font-medium">
                            Selecciona una revisión
                        </label>
                        <select
                            id="revision-select"
                            defaultValue={revision}
                            onChange={(e) => setRevision(e.target.value)}
                            className="border rounded px-3 py-1"
                        >
                            {revisions.map((revision) => (
                                <option key={revision.uuid} value={revision.uuid}>
                                    {revision.name} ({revision.dataQuantity} Datos)
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {data_source === "date-range" && (
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
                    <button className="mt-6 btn-secondary" onClick={handleSave}>Guardar</button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
