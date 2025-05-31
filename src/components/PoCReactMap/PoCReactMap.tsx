"use client"

import { LatLngExpression, LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Circle } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface MapProps {
    coordinates: LatLngExpression | LatLngTuple,
    zoom?: number,
    circleRadius?: number
    circles: Array<Object>
}

const defaults = {
    zoom: 13,
    cirleRadius: 100
}

const PoCReactMap = (Map: MapProps) => {
    const { 
        zoom = defaults.zoom, 
        circleRadius = defaults.cirleRadius, 
        circles,
        coordinates 
    } = Map

    return (
        <MapContainer
            center={coordinates}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"/>
            {circles.map((circle) => (
            <Circle
                center={[circle.latitude, circle.longitude]} // Replace with circle-specific coordinates if available
                radius={circleRadius}
                color="green"
            />
        ))}
        </MapContainer>
    )
}

export default PoCReactMap