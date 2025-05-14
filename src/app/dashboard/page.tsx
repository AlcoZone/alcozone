"use client";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import AccidentsBarWidget from "@/components/BarWidget/AccidentsBarWidget";
import { BarChartWidget } from "@/components/BarChartWidget/BarChartWidget";
import { ComparisonWidget } from "@/components/ComparisonWidget/ComparisonWidget";
import { useState } from "react";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardPage() {
  const BAR_CHART_CONFIG = {
    id: "bar-chart",
    position: { x: 0, y: 0 },
    dimensions: {
      width: 4,
      minWidth: 3,
      height: 5,
      minHeight: 5,
    },
  };

  const ACCIDENTS_BAR_CONFIG = {
    id: "accidents-bar",
    position: { x: 4, y: 0 },
    dimensions: {
      width: 4,
      minWidth: 3,
      height: 4,
      minHeight: 3,
    },
  };

  const COMPARISON_CHART_CONFIG = {
    id: "comparison",
    position: { x: 8, y: 0 },
    dimensions: {
      width: 4,
      minWidth: 3,
      height: 3,
      minHeight: 3,
    },
  };

  const [layout, setLayout] = useState([
    {
      i: BAR_CHART_CONFIG.id,
      x: BAR_CHART_CONFIG.position.x,
      y: BAR_CHART_CONFIG.position.y,
      w: BAR_CHART_CONFIG.dimensions.width,
      minW: BAR_CHART_CONFIG.dimensions.minWidth,
      h: BAR_CHART_CONFIG.dimensions.height,
      minH: BAR_CHART_CONFIG.dimensions.minHeight,
    },
    {
      i: ACCIDENTS_BAR_CONFIG.id,
      x: ACCIDENTS_BAR_CONFIG.position.x,
      y: ACCIDENTS_BAR_CONFIG.position.y,
      w: ACCIDENTS_BAR_CONFIG.dimensions.width,
      minW: ACCIDENTS_BAR_CONFIG.dimensions.minWidth,
      h: ACCIDENTS_BAR_CONFIG.dimensions.height,
      minH: ACCIDENTS_BAR_CONFIG.dimensions.minHeight,
    },
    {
      i: COMPARISON_CHART_CONFIG.id,
      x: COMPARISON_CHART_CONFIG.position.x,
      y: COMPARISON_CHART_CONFIG.position.y,
      w: COMPARISON_CHART_CONFIG.dimensions.width,
      minW: COMPARISON_CHART_CONFIG.dimensions.minWidth,
      h: COMPARISON_CHART_CONFIG.dimensions.height,
      minH: COMPARISON_CHART_CONFIG.dimensions.minHeight,
    },
  ]);

  const accidentsBarData = [
    { month: "Enero", month1: 186, month2: 80 },
    { month: "Febrero", month1: 305, month2: 200 },
    { month: "Marzo", month1: 237, month2: 120 },
    { month: "Abril", month1: 73, month2: 190 },
    { month: "Mayo", month1: 209, month2: 130 },
    { month: "Junio", month1: 214, month2: 140 },
    { month: "Julio", month1: 230, month2: 300 },
    { month: "Agosto", month1: 200, month2: 50 },
    { month: "Septiembre", month1: 214, month2: 140 },
    { month: "Octubre", month1: 214, month2: 69 },
    { month: "Noviembre", month1: 200, month2: 57 },
    { month: "Diciembre", month1: 214, month2: 140 },
  ];

  const accidentsBarConfig = {
    mes1: { label: "2022", color: "#00E096" },
    mes2: { label: "2021", color: "#0095FF" },
  };

  const comparisonData = [
    { month: "January", alcoholRelated: 120, nonAlcoholRelated: 200 },
    { month: "February", alcoholRelated: 160, nonAlcoholRelated: 230 },
    { month: "March", alcoholRelated: 110, nonAlcoholRelated: 220 },
    { month: "April", alcoholRelated: 90, nonAlcoholRelated: 170 },
    { month: "May", alcoholRelated: 130, nonAlcoholRelated: 210 },
    { month: "June", alcoholRelated: 150, nonAlcoholRelated: 200 },
  ];

  const comparisonConfig = {
    alcoholRelated: { label: "Relacionado al alcohol", color: "#07E098" },
    nonAlcoholRelated: { label: "No relacionado al alcohol", color: "#0095FF" },
  };

  const barChartData = [
    { month: "January", "Causa: Alcohol": 400, "Otras causas": 300, Otro: 150 },
    {
      month: "February",
      "Causa: Alcohol": 300,
      "Otras causas": 200,
      Otro: 100,
    },
    { month: "March", "Causa: Alcohol": 500, "Otras causas": 450, Otro: 200 },
    { month: "April", "Causa: Alcohol": 200, "Otras causas": 100, Otro: 50 },
  ];

  const rowHeight: number = 100;

  const barChartCategories = ["Causa: Alcohol", "Otras causas"];
  const barChartColors = ["#0095FF", "#00E096", "#FF9900"];

  const barChartItem = layout.find((item) => item.i === "bar-chart");
  const barChartHeight = barChartItem ? barChartItem.h * rowHeight : 300;

  const accidentsBarItem = layout.find((item) => item.i === "accidents-bar");
  const accidentsBarHeight = accidentsBarItem
    ? accidentsBarItem.h * rowHeight
    : 300;

  const comparisonItem = layout.find((item) => item.i === "comparison");
  const comparisonHeight = comparisonItem ? comparisonItem.h * rowHeight : 300;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        onLayoutChange={(newLayout) => {
          setLayout(newLayout);
        }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 2 }}
        rowHeight={rowHeight}
        isResizable
        isDraggable
      >
        <div
          key="accidents-bar"
          className="widget"
          style={{ width: "100%", height: "100%" }}
        >
          <AccidentsBarWidget
            title="Accidentes por alcoholismo"
            subtitle="2.1% vs el año pasado"
            description="2023 vs 2024"
            data={accidentsBarData}
            config={accidentsBarConfig}
            chartHeight={accidentsBarHeight}
          />
        </div>

        <div
          key="bar-chart"
          className="widget"
          style={{ width: "100%", height: "100%" }}
        >
          <BarChartWidget
            title="Incidentes causados por alcohol"
            description="Comparación mensual por categoría"
            data={barChartData}
            categories={barChartCategories}
            categoryColors={barChartColors}
            chartHeight={barChartHeight}
          />
        </div>

        <div
          key="comparison"
          className="widget"
          style={{ width: "100%", height: "100%" }}
        >
          <ComparisonWidget
            title="Accidentes por Mes"
            data={comparisonData}
            config={comparisonConfig}
            footer="Enero - Junio 2024"
            chartHeight={comparisonHeight}
          />
        </div>
      </ResponsiveGridLayout>
    </main>
  );
}
