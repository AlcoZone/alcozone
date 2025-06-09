"use client"

import { LatLngExpression, LatLngTuple } from 'leaflet';
import { RoadblockData } from "@/types/RoadblockData";
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import {ClusterData} from "@/types/ClusterData";

interface MapProps {
    coordinates: LatLngExpression | LatLngTuple;
    zoom?: number;
    circleRadius?: number;
    roadblocks?: Array<RoadblockData>;
    clusters?: Array<ClusterData>;
    loading: boolean;
    mapMode: string;
}

const defaults = {
    zoom: 13,
    circleRadius: 125,
    loading: true
};

function getColorFromScore(score: number): string {
    const clamped = Math.min(Math.max(score, 1), 10);
    const hue = 120 - ((clamped - 1) / 9) * 120;
    return `hsl(${hue}, 70%, 45%)`;
}

function getRandomColor(): string {
    const hue = Math.floor(Math.random() * 360);      // All hues
    const saturation = Math.floor(60 + Math.random() * 40); // 60–100%
    const lightness = Math.floor(35 + Math.random() * 30);  // 35–65%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


const InteractiveMap = (props: MapProps) => {
    const {
        zoom = defaults.zoom,
        circleRadius = defaults.circleRadius,
        roadblocks,
        clusters,
        coordinates,
        loading,
        mapMode,
    } = props

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <MapContainer
                center={coordinates}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

                {!loading && mapMode === "predictive" &&
                    roadblocks?.map((circle) => {
                        const color = getColorFromScore(circle.score)
                        return (
                            <Circle
                                key={`${circle.latitude}-${circle.longitude}-${circle.score}`}
                                center={[circle.latitude, circle.longitude]}
                                radius={circleRadius}
                                color="transparent"
                                weight={0}
                                fillColor={color}
                                fillOpacity={0.6}
                            >
                                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                                    <div style={{ fontSize: "12px" }}>
                                        <div><strong>Choques Predichos:</strong> {circle.predictedCrashes}</div>
                                        <div><strong>Nivel de Peligro:</strong> {circle.score}/10</div>
                                    </div>
                                </Tooltip>
                            </Circle>
                        )
                    })
                }
                {!loading && mapMode === "hotspot" &&
                    clusters?.map((circle) => {
                        const color = getRandomColor()
                        return (
                            <Circle
                                key={`${circle.latitude}-${circle.longitude}-${circle.count}`}
                                center={[circle.latitude, circle.longitude]}
                                radius={circleRadius}
                                color="transparent"
                                weight={0}
                                fillColor={color}
                                fillOpacity={0.6}
                            >
                                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                                    <div style={{ fontSize: "12px" }}>
                                        <div><strong>Choques:</strong> {circle.count}</div>
                                    </div>
                                </Tooltip>
                            </Circle>
                        )
                    })
                }
            </MapContainer>


            {mapMode === "predictive" && (
                <div
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        background: "white",
                        padding: "40px 12px 40px 12px",
                        borderRadius: "8px",
                        boxShadow: "0 0 8px rgba(0,0,0,0.2)",
                        fontSize: "12px",
                        zIndex: 1000,
                        textAlign: "center",
                        userSelect: "none",
                        width: "60px",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            height: "150px",
                            width: "20px",
                            background: "linear-gradient(to top, hsl(0,70%,45%), hsl(60,70%,45%), hsl(120,70%,45%))",
                            borderRadius: "4px",
                            margin: "0 auto",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 5,
                                left: "50%",
                                transform: "translate(-50%, -100%)",
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                        >
                            Menor Riesgo
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                transform: "translate(-50%, 100%)",
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                        >
                            Mayor Riesgo
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default InteractiveMap
