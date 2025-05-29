"use client"

import api from "@/services/api";
import dynamic from "next/dynamic";
import { useMemo, useEffect, useState } from "react";
import MapConfigModal from "@/components/MapConfigModal/MapConfigModal";
import {MapConfig} from "@/types/MapConfig";

const MapPage = () => {
    const [mapConfig, setMapConfig] = useState<MapConfig>();
    const [clusters, setClusters] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState("monday");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const InteractiveMap = useMemo(() => dynamic(
        () => import('@/components/InteractiveMap/InteractiveMap'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false,
        }
    ), []);

    const getClusters = async () => {
        setLoading(true);
        try {
            const response = await api.get("/revision/predict");
            setClusters(response.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const defaultProperties = {
            type: "Predictivo",
            data_source: ""
        }

        setMapConfig(defaultProperties)
        getClusters();
    }, []);

    const dayOptions = [
        { label: "Lunes", value: "monday" },
        { label: "Martes", value: "tuesday" },
        { label: "Miércoles", value: "wednesday" },
        { label: "Jueves", value: "thursday" },
        { label: "Viernes", value: "friday" },
        { label: "Sábado", value: "saturday" },
        { label: "Domingo", value: "sunday" },
    ];

    return (
        <>
            <div className="h-full flex flex-col">
                <div className="basis-[6%] flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-blue-850">Mapa Interactivo ({mapConfig?.type})</h1>
                    <MapConfigModal open={isDialogOpen} onOpenChange={setIsDialogOpen} />
                </div>

                <div className="basis-[6%] flex items-center gap-4">
                    <label htmlFor="day-filter" className="text-sm font-medium">Selecciona un día:</label>
                    <select
                        id="day-filter"
                        className="border px-3 py-1 rounded"
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                    >
                        {dayOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="basis-[88%] z-0">
                    <InteractiveMap
                        coordinates={[19.4326, -99.1332]}
                        loading={loading}
                        circles={clusters[selectedDay] || []}
                    />
                </div>
            </div>
        </>
    );
};

export default MapPage;
