'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

import { Banner } from '@/components/Banner/Banner';
import { Menu } from '@/components/Menu/Menu';
import { DonutChartWidget } from '@/components/DonutChartWidget/DonutChartWidget';
import { RadialChartWidget } from '@/components/RadialChartWidget/RadialChartWidget';
import { BarChartWidget } from '@/components/BarChartWidget/BarChartWidget';
import { ComparisonWidget } from '@/components/ComparisonWidget/ComparisonWidget';

const donutChartData = [
  { category: 'Accidentes por otras causas', visitors: 75, fill: '#8884d8' },
  { category: 'Accidentes causados por alcohol', visitors: 25, fill: '#82ca9d' },
];

const radialChartData = [
  { label: 'Peatonal', value: 15, fill: '#4ade80' },
  { label: 'Automotriz', value: 50, fill: '#60a5fa' },
  { label: 'Motociclistas', value: 35, fill: '#facc15' },
];

const barChartData = [
  { month: "January", "Causa: Alcohol": 400, "Otras causas": 300, "Otro": 150 },
  { month: "February", "Causa: Alcohol": 300, "Otras causas": 200, "Otro": 100 },
  { month: "March", "Causa: Alcohol": 500, "Otras causas": 450, "Otro": 200 },
  { month: "April", "Causa: Alcohol": 200, "Otras causas": 100, "Otro": 50 },
];

const BarCategories = ["Causa: Alcohol", "Otras causas"];
const BarColors = ["#0095FF", "#00E096", "#FF9900"];

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

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [menuHidden, setMenuHidden] = useState(false);

  return (
    <Menu>
      <div
        className="p-4 w-full ml-[-220px]"
        style={{
          width: menuHidden ? 'calc(100vw - 150px)' : 'calc(100vw - 300px)',
        }}
      >
        <div className="mb-4 w-full max-w-sm">
          <Select onValueChange={(value) => setSelectedOption(value)} value={selectedOption}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar rango de fechas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="client1">Enero - Junio 2024</SelectItem>
              <SelectItem value="client2">Julio - Diciembre 2024</SelectItem>
              <SelectItem value="client3">Julio - Diciembre 2023</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* primeros dos widgets de arriba */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="w-[500px] m-0 p-0">
            <DonutChartWidget
              title="Accidentes"
              footer="Accidentes causados por alcohol vs. otras causas"
              centerLabel=""
              data={donutChartData}
            />
          </div>
          <div className="w-[750px] m-0 p-0">
            <RadialChartWidget
              title="Causa de accidentes"
              footer=""
              data={radialChartData}
            />
          </div>
        </div>

        {/* tres widgets de abajo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-1">
          <div className="w-full">
            <BarChartWidget
              title="Incidentes causados por alcohol"
              description="Comparación mensual por categoría"
              data={barChartData}
              categories={BarCategories}
              categoryColors={BarColors}
            />
          </div>

          <div className="w-full">
            <ComparisonWidget
              title="Accidentes por Mes"
              data={comparisonData}
              config={comparisonConfig}
              footer="Enero - Junio 2024"
            />
          </div>

          <div className="w-full">
            widget 5 

          </div>
        </div>

        <Banner />
      </div>
    </Menu>
  );
};

export default MainPage;













