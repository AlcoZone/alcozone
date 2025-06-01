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
        description:
          "Distribución de accidentes según el medio utilizado para reportarlos",
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
          report: {
            label: "Reportes",
            color: "#0095FF",
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
          { date: "01-05-2025", accidents: 120 },
          { date: "02-05-2025", accidents: 95 },
          { date: "03-05-2025", accidents: 130 },
          { date: "04-05-2025", accidents: 655 },
          { date: "05-05-2025", accidents: 453 },
          { date: "06-05-2025", accidents: 123 },
          { date: "07-05-2025", accidents: 232 },
          { date: "08-05-2025", accidents: 213 },
          { date: "09-05-2025", accidents: 321 },
          { date: "10-05-2025", accidents: 130 },
          { date: "11-05-2025", accidents: 213 },
          { date: "12-05-2025", accidents: 768 },
          { date: "13-05-2025", accidents: 456 },
          { date: "14-05-2025", accidents: 546 },
          { date: "15-05-2025", accidents: 345 },
          { date: "16-05-2025", accidents: 234 },
          { date: "17-05-2025", accidents: 65 },
          { date: "18-05-2025", accidents: 345 },
          { date: "19-05-2025", accidents: 234 },
          { date: "20-05-2025", accidents: 243 },
        ],
        config: {
          desktop: {
            label: "Accidentes",
            color: "#8950FC",
          },
        },
      }),
  },
};
