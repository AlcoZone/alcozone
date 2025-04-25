"use client"

import React, { useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import * as d3 from "d3";
import "leaflet/dist/leaflet.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Cluster = {
  id?: string;
  latitude: number;
  longitude: number;
};

type Variant = "clusterize" | "predict";

interface MapWidgetProps {
  variant: Variant;
  data: Cluster[] | Record<string, Cluster[]>;
}

export const MapWidget: React.FC<MapWidgetProps> = ({ variant, data }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const [day, setDay] = useState("saturday");
  const [startHour, setStartHour] = useState("0");
  const [endHour, setEndHour] = useState("23");

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView([19.4326, -99.1332], 12);
    mapRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 18,
      minZoom: 11,
    }).addTo(map);

    L.svg().addTo(map);
    const svg = d3.select(map.getPanes().overlayPane).select("svg");
    const g = svg.append("g").attr("class", "leaflet-zoom-hide");

    const colorMap = new Map<string, string>();
    const getColor = (id?: string) => {
      if (!id) return "#999";
      if (!colorMap.has(id)) {
        const color = d3.schemeCategory10[colorMap.size % 10];
        colorMap.set(id, color);
      }
      return colorMap.get(id)!;
    };

    const draw = () => {
      g.selectAll("*").remove();
      const zoom = map.getZoom();

      if (variant === "clusterize" && Array.isArray(data)) {
        data.forEach((cluster) => {
          const point = map.latLngToLayerPoint([cluster.latitude, cluster.longitude]);
          g.append("circle")
            .attr("cx", point.x)
            .attr("cy", point.y)
            .attr("r", zoom < 13 ? 4 : 6)
            .attr("fill", getColor(cluster.id))
            .attr("opacity", 0.4)
            .attr("stroke", "#000")
            .attr("stroke-width", 0.2);
        });
      }

      if (variant === "predict" && data && !Array.isArray(data) && data[day]) {
        data[day].forEach((cluster: Cluster) => {
          const point = map.latLngToLayerPoint([cluster.latitude, cluster.longitude]);
          g.append("circle")
            .attr("cx", point.x)
            .attr("cy", point.y)
            .attr("r", zoom < 13 ? 4 : 6)
            .attr("fill", "red")
            .attr("opacity", 0.4)
            .attr("stroke", "#000")
            .attr("stroke-width", 0.2);
        });
      }
    };

    draw();
    map.on("zoomend moveend", draw);

    return () => map.remove();
  }, [variant, data, day, startHour, endHour]);

  return (
    <Card className="w-[600px] h-[500px]">
      <CardHeader>
        <CardTitle>
          {variant === "predict"
            ? "Predicción de Puntos de Reten (Alcoholímetros)"
            : "Resumen de choques"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {variant === "predict" && (
          <div className="flex items-center gap-4">
            <div>
              <Label htmlFor="day">Día</Label>
              <select
                id="day"
                className="border rounded-md p-1"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="monday">Lunes</option>
                <option value="tuesday">Martes</option>
                <option value="wednesday">Miércoles</option>
                <option value="thursday">Jueves</option>
                <option value="friday">Viernes</option>
                <option value="saturday">Sábado</option>
                <option value="sunday">Domingo</option>
              </select>
            </div>
            <div>
              <Label htmlFor="start">Desde hora</Label>
              <Input
                id="start"
                type="number"
                min="0"
                max="23"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="end">Hasta hora</Label>
              <Input
                id="end"
                type="number"
                min="0"
                max="23"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
              />
            </div>
          </div>
        )}
        <div
          id="map"
          ref={mapContainerRef}
          className="h-[360px] w-full rounded-md border"
        />
      </CardContent>
    </Card>
  );
};
