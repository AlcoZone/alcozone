// src/constants/widgetRegistry.ts
import React from "react";

import { ComparisonWidget } from "@/components/ComparisonWidget/ComparisonWidget";

import { BarChartWidget } from "@/components/BarChartWidget/BarChartWidget";
import { RadialChartWidget } from "@/components/RadialChartWidget/RadialChartWidget";
import { DonutChartWidget } from "@/components/DonutChartWidget/DonutChartWidget";
import AccidentCauseTableWidget from "@/components/Table/AccidentCauseTableWidget";
import ReportChannelWidget from "@/components/ReportChannelWidget/ReportChannelWidget";
import LineGraphWidget from "@/components/LineGraph/LineGraphWidget";

interface RegistryEntry {
  title: string;
  component: (data: any, filters: any) => React.ReactNode;
}

export const widgetRegistry: Record<string, RegistryEntry> = {
  comparison: {
    title: "Accidentes por mes",
    component: () =>
      React.createElement(ComparisonWidget, {
        title: "Accidentes por mes",
        data: [
          { month_name: "January", accidents: "15432" },
          { month_name: "February", accidents: "16208" },
          { month_name: "March", accidents: "17021" },
          { month_name: "April", accidents: "14850" },
          { month_name: "May", accidents: "15200" },
        ],
        config: {
          accidents: {
            label: "Accidentes",
            color: "#8884d8",
          },
        },
        footer: "Datos totales sin distinguir alcaldía",
        chartHeight: 200,
      }),
  },
  "bar-chart": {
    title: "Top 2 alcaldías con más accidentes por mes",
    component: () =>
      React.createElement(BarChartWidget, {
        title: "Top 2 alcaldías con más accidentes por mes",
        description: "Comparativa mensual de las alcaldías con más accidentes",
        data: [
          { month_name: "Enero", town: "Cuauhtémoc", total_accidents: 25 },
          { month_name: "Enero", town: "Benito Juárez", total_accidents: 18 },
          { month_name: "Febrero", town: "Cuauhtémoc", total_accidents: 20 },
          { month_name: "Febrero", town: "Benito Juárez", total_accidents: 22 },
          { month_name: "Marzo", town: "Cuauhtémoc", total_accidents: 40 },
          { month_name: "Marzo", town: "Benito Juárez", total_accidents: 26 },
        ],
        colors: {
          Cuahutemoc: "#0095FF",
          "Benito Juárez": "#00E096",
        },
      }),
  },
  "radial-chart": {
    title: "Causas de accidentes",
    component: () =>
      React.createElement(RadialChartWidget, {
        title: "Causas de accidentes",
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
    title: "Alcaldías peligrosas",
    component: () =>
      React.createElement(DonutChartWidget, {
        title: "Alcaldías peligrosas",
        footer: "Alcaldías con más accidentes",
        centerLabel: "Total accidentes",
        data: [
          { town: "Iztapalapa", total_accidents: "2747" },
          { town: "Gustavo A. Madero", total_accidents: "1846" },
        ],
      }),
  },
  "accident-cause-table": {
    title: "Tipos de accidentes",
    component: () =>
      React.createElement(AccidentCauseTableWidget, {
        title: "Tipos de accidentes",
        subtitle: "Datos totales sin distinguir alcaldía",
        data: [
          {
            subType: "Choque con lesionados",
            accidentCount: 4614,
          },
          {
            subType: "Motociclista",
            accidentCount: 1576,
          },
          {
            subType: "Atropellado",
            accidentCount: 1528,
          },
          {
            subType: "Ciclista",
            accidentCount: 232,
          },
        ],
      }),
  },

  "report-channel": {
    title: "Canales de reporte",
    component: () =>
      React.createElement(ReportChannelWidget, {
        title: "Canales de reporte",
        description: "Accidentes según canal de reporte",
        chartHeight: 330,
        data: [
          { report_source: "LLAMADA DEL 911", total_accidents: 12845 },
          { report_source: "RADIO", total_accidents: 914 },
          { report_source: "REDES", total_accidents: 120 },
          { report_source: "BOTÓN DE AUXILIO", total_accidents: 866 },
          { report_source: "CÁMARA", total_accidents: 430 },
          { report_source: "APLICATIVOS", total_accidents: 50 },
          { report_source: "LLAMADA APP911", total_accidents: 78 },
        ],
        config: {
          total_accidents: {
            label: "Accidentes",
            color: "#8884d8",
          },
        },
      }),
  },

  "line-graph": {
    title: "Tendencia diaria de accidentes",
    component: () =>
      React.createElement(LineGraphWidget, {
        title: "Tendencia diaria de accidentes",
        description: "Número de accidentes registrados por día",
        data: [
          { accident_date: "2025-05-01", total_accidents: 120 },
          { accident_date: "2025-05-02", total_accidents: 95 },
          { accident_date: "2025-05-03", total_accidents: 130 },
          { accident_date: "2025-05-04", total_accidents: 655 },
          { accident_date: "2025-05-05", total_accidents: 453 },
          { accident_date: "2025-05-06", total_accidents: 123 },
          { accident_date: "2025-05-07", total_accidents: 232 },
          { accident_date: "2025-05-08", total_accidents: 213 },
          { accident_date: "2025-05-09", total_accidents: 321 },
          { accident_date: "2025-05-10", total_accidents: 130 },
          { accident_date: "2025-05-11", total_accidents: 213 },
          { accident_date: "2025-05-12", total_accidents: 768 },
          { accident_date: "2025-05-13", total_accidents: 456 },
          { accident_date: "2025-05-14", total_accidents: 546 },
          { accident_date: "2025-05-15", total_accidents: 345 },
          { accident_date: "2025-05-16", total_accidents: 234 },
          { accident_date: "2025-05-17", total_accidents: 65 },
          { accident_date: "2025-05-18", total_accidents: 345 },
          { accident_date: "2025-05-19", total_accidents: 234 },
          { accident_date: "2025-05-20", total_accidents: 243 },
        ],
        config: {
          total_accidents: {
            label: "Accidentes",
            color: "#8950FC",
          },
        },
      }),
  },
};
