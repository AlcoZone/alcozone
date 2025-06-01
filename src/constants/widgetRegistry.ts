// src/constants/widgetRegistry.ts
import React from "react";

import { ComparisonWidget } from "@/components/ComparisonWidget/ComparisonWidget";

import { BarChartWidget } from "@/components/BarChartWidget/BarChartWidget";
import { MapWidget } from "@/components/MapWidget/MapWidget";
import { RadialChartWidget } from "@/components/RadialChartWidget/RadialChartWidget";
import { DonutChartWidget } from "@/components/DonutChartWidget/DonutChartWidget";

interface RegistryEntry {
  component: (data: any, filters: any) => React.ReactNode;
}

export const widgetRegistry: Record<string, RegistryEntry> = {
  comparison: {
    component: () =>
      React.createElement(ComparisonWidget, {
        title: "Accidentes por Mes",
        data: [
          { month: "January", alcoholRelated: 120, nonAlcoholRelated: 200 },
          { month: "February", alcoholRelated: 160, nonAlcoholRelated: 230 },
          { month: "March", alcoholRelated: 110, nonAlcoholRelated: 220 },
          { month: "April", alcoholRelated: 90, nonAlcoholRelated: 170 },
          { month: "May", alcoholRelated: 130, nonAlcoholRelated: 210 },
          { month: "June", alcoholRelated: 150, nonAlcoholRelated: 200 },
        ],
        config: {
          alcoholRelated: { label: "Relacionado al alcohol", color: "#07E098" },
          nonAlcoholRelated: {
            label: "No relacionado al alcohol",
            color: "#0095FF",
          },
        },
        footer: "Enero - Junio 2024",
        chartHeight: 200,
      }),
  },
  "bar-chart": {
    component: () =>
      React.createElement(BarChartWidget, {
        title: "Incidentes causados por alcohol",
        description: "Comparación mensual por categoría",
        data: [
          {
            month: "January",
            "Causa: Alcohol": 400,
            "Otras causas": 300,
          },
          {
            month: "February",
            "Causa: Alcohol": 300,
            "Otras causas": 200,
          },
          { month: "March", "Causa: Alcohol": 500, "Otras causas": 450 },
          { month: "April", "Causa: Alcohol": 200, "Otras causas": 100 },
        ],
        categories: ["Causa: Alcohol", "Otras causas"],
        categoryColors: ["#0095FF", "#00E096"],
        chartHeight: 200,
      }),
  },
  // TODO: do we need predict variant?
  map: {
    component: () =>
      React.createElement(MapWidget, {
        variant: "clusterize",
        data: [
          { id: "1", latitude: 19.4326, longitude: -99.1332 },
          { id: "2", latitude: 19.4426, longitude: -99.1232 },
          { id: "3", latitude: 19.4526, longitude: -99.1432 },
          { id: "4", latitude: 19.4356, longitude: -99.1382 },
        ],
      }),
  },
  "radial-chart": {
    component: () =>
      React.createElement(RadialChartWidget, {
        title: "Tipos de accidente",
        description: "Porcentaje de accidentes",
        footer: "",
        data: [
          { percentage: 28.47, subType: "Choque con lesionados" },
          { percentage: 9.72, subType: "Motociclista" },
          { percentage: 9.43, subType: "Atropellado" },
        ],
      }),
  },
  donut: {
    component: () =>
      React.createElement(DonutChartWidget, {
        title: "Alcadías con más peligro",
        footer: "Datos del último mes disponibles",
        centerLabel: "Total accidentes",
        data: [
          { town: "Iztapalapa", total_accidents: "2747" },
          { town: "Gustavo A. Madero", total_accidents: "1846" },
        ],
      }),
  },
};
