"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { MapConfig } from "@/types/MapConfig";
import { RevisionMetadata } from "@/types/RevisionMetadata";
import api from "@/services/api";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import CalendarWithEnabledDates from "@/components/CalendarWithEnabledDates/CalendarWithEnabledDates";

export default function MapConfigModal({
                                           open,
                                           onOpenChange,
                                           mapConfig,
                                           setMapConfig,
                                       }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mapConfig: MapConfig;
    setMapConfig: (config: MapConfig) => void;
}) {
    const [revisions, setRevisions] = useState<RevisionMetadata[]>([]);
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [type, setType] = useState(mapConfig.type);
    const [data_source, setDataSource] = useState(mapConfig.data_source);
    const [revision, setRevision] = useState<string>(mapConfig.revision ?? "");
    const [dateRange, setDateRange] = useState<Date[] | null>(() => {
        if (mapConfig.from && mapConfig.to) {
            return [new Date(mapConfig.from), new Date(mapConfig.to)];
        }
        return null;
    });

    const handleSave = () => {
        setMapConfig({
            type,
            data_source,
            revision: revision ?? "",
            from: dateRange?.[0]?.toISOString() ?? null,
            to: dateRange?.[1]?.toISOString() ?? null,
        });
        onOpenChange(false);
    };

    const getRevisions = async () => {
        try {
            const response = await api.get("/revision/list");
            setRevisions(response.data);
            if (mapConfig.revision === "latest" && response.data.length > 0) {
                setRevision(response.data[response.data.length - 1].uuid);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getAvailableDates = async () => {
        try {
            const response = await api.get("/crashes/availableDates");
            setAvailableDates(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getRevisions();
        getAvailableDates();
    }, [mapConfig]);

    const formatRangeString = (range: Date[] | null) => {
        if (!range || range.length !== 2 || !range[0] || !range[1]) return "";
        return `${format(range[0], "dd-MM-yyyy")} → ${format(range[1], "dd-MM-yyyy")}`;
    };

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
                        Revisión
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
                            value={revision}
                            onChange={(e) => setRevision(e.target.value)}
                            className="border rounded px-3 py-1"
                        >
                            {revisions.map((rev) => (
                                <option key={rev.uuid} value={rev.uuid}>
                                    {rev.name} ({rev.dataQuantity} Datos)
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {data_source === "date-range" && (
                    <div className="mt-4 flex items-center gap-3">
                        <span className="min-w-[120px] font-medium">Rango de Fechas</span>

                        <Popover>
                            <PopoverTrigger asChild>
                                <input
                                    id="date-range-input"
                                    readOnly
                                    className="border rounded px-3 py-1 cursor-pointer w-full max-w-xs"
                                    value={formatRangeString(dateRange)}
                                    placeholder="Selecciona rango"
                                />
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <CalendarWithEnabledDates
                                    value={dateRange}
                                    onChange={setDateRange}
                                    onClose={() => {}}
                                    enabledDateStrings={availableDates}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}

                <DialogClose asChild>
                    <button className="mt-6 btn-secondary" onClick={handleSave}>
                        Guardar
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
