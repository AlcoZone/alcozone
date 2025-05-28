"use client"

import { LatLngExpression, LatLngTuple } from 'leaflet';
import { RoadblockData } from "@/types/RoadblockData";
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

//TODO There is a bug in the circle coloring that its not working correctly

interface MapProps {
    coordinates: LatLngExpression | LatLngTuple;
    zoom?: number;
    circleRadius?: number;
    circles: Array<RoadblockData>;
    loading: boolean;
}

const defaults = {
    zoom: 13,
    circleRadius: 100,
    loading: true
};

// Convert score (1–10) to color using HSL interpolation
function getColorFromScore(score: number): string {
    const clamped = Math.min(Math.max(Math.round(score), 1), 10); // round score to nearest int first
    let hue: number;

    if (clamped <= 5) {
        // 1 (green 120°) → 5 (yellow 60°)
        hue = 120 - ((clamped - 1) / 4) * 60;
    } else {
        // 6 (yellow 60°) → 10 (red 0°)
        hue = 60 - ((clamped - 6) / 4) * 60;
    }

    return `hsl(${hue}, 70%, 45%)`;  // keep saturation and lightness from your last version
}

const InteractiveMap = (props: MapProps) => {
    const {
        zoom = defaults.zoom,
        circleRadius = defaults.circleRadius,
        circles,
        coordinates,
        loading,
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

                {!loading &&
                    circles.map((circle, index) => {
                        const color = getColorFromScore(circle.score)
                        return (
                            <Circle
                                key={index}
                                center={[circle.latitude, circle.longitude]}
                                radius={circleRadius}
                                color="transparent"
                                weight={0}
                                fillColor={color}
                                fillOpacity={0.5}
                            >
                                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                                    <div style={{ fontSize: "12px" }}>
                                        <div><strong>Choques Predichos:</strong> {circle.predictedCrashes}</div>
                                        <div><strong>Score:</strong> {circle.score}</div>
                                    </div>
                                </Tooltip>
                            </Circle>
                        )
                    })}
            </MapContainer>

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
                        background:
                            "linear-gradient(to top, hsl(0,70%,45%), hsl(60,70%,45%), hsl(120,70%,45%))",
                        borderRadius: "4px",
                        margin: "0 auto",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "5",
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
                            bottom: "0",
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
        </div>
    )
}

export default InteractiveMap
