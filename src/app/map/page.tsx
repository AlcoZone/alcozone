//TODO Implement Spinner when loading data for map
"use client"

import api from "@/services/api";
import dynamic from "next/dynamic";
import { useMemo, useEffect, useState } from "react";
import MapConfigModal from "@/components/MapConfigModal/MapConfigModal";
import {MapConfig} from "@/types/MapConfig";
import {ClusterData} from "@/types/ClusterData";

const MapPage = () => {
    const [roadblocks, setRoadblocks] = useState({});
    const [clusters, setClusters] = useState<Array<ClusterData>>();
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState("monday");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mapConfig, setMapConfig] = useState<MapConfig>({
        type: "predictive",
        data_source: "revision",
        revision: "latest",
    });

    const InteractiveMap = useMemo(() => dynamic(
        () => import('@/components/InteractiveMap/InteractiveMap'),
        {
            loading: () => <p></p>,
            ssr: false,
        }
    ), []);

    const getPredictions = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/predict?revision=${mapConfig.revision}`);
            setRoadblocks(response.data);
        } finally {
            setLoading(false);
        }
    };

    const getClusters = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/clusterize?revision=${mapConfig.revision}`);
            setClusters(response.data.clusters);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(mapConfig.type == "predictive"){
            getPredictions();
        } else {
            getClusters()
        }
    }, [mapConfig]);

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
                    <h1 className="text-2xl font-bold text-blue-850">
                        Mapa Interactivo ({
                        mapConfig?.type === 'predictive' ? 'Predictivo'
                        : 'Puntos Calientes'
                    })
                    </h1>
                    <MapConfigModal
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        mapConfig={mapConfig}
                        setMapConfig={setMapConfig}
                    />
                </div>

                <div className="basis-[6%] flex items-center gap-4">
                    { mapConfig.type === "predictive" &&
                        <>
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
                        </>
                    }
                </div>

                <div className="basis-[88%] z-0">
                    <InteractiveMap
                        coordinates={[19.4326, -99.1332]}
                        loading={loading}
                        roadblocks={roadblocks[selectedDay] || []}
                        clusters={clusters}
                        mapMode={mapConfig.type}
                    />
                </div>
            </div>
        </>
    );
};

export default MapPage;
