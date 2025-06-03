"use client"

import api from "@/services/api";
import dynamic from "next/dynamic";
import { useMemo, useEffect, useState } from "react";


const MapPage = () => {
    const [clusters, setClusters] = useState({})

    const PoCReactMap = useMemo(() => dynamic(
        () => import('@/components/PoCReactMap/PoCReactMap.tsx'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    const getClusters = async () => {
        await api.get("/revision/predict")
        .then( (response) => {
            setClusters(response.data)
        })
    }

    useEffect(() => {
        getClusters()
    }, [])

    return (
        <>  
            <div className="h-full flex flex-col">
                <div className="basis-[6%]">
                    <h1 className="text-2xl font-bold text-blue-850">Mapa Interactivo</h1>
                </div>
                <div className="basis-[6%]">
                    TODO: Instert Filters
                </div>
                <div className="basis-[88%]">
                    //TODO Fix error while fetching data
                    {/* <PoCReactMap coordinates={[19.4326, -99.1332]} circles={clusters.sunday} /> */}
                </div>
            </div>
        </>
    )
}

export default MapPage