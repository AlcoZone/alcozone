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
import LineChartMultiple from '@/components/LineGraph/LineGraphWidget';
import AccidentesTable from '@/components/Table/AccidentCauseTableWidget';
import AccidentsBarChart from '@/components/BarWidget/AccidentsBarWidget';

const sampleConfig = {
  desktop: {
    label: "fecha1",
    color: "#8950FC",
  },
  mobile: {
    label: "Fecha2",
    color: "#F64E60",
  },
}

const data = [
  { month: "January", month1: 20, month2: 30 },
  { month: "February", month1: 25, month2: 35 },
  { month: "March", month1: 30, month2: 40 },
]
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
  { month: 'Enero', Autos: 30, Motos: 20 },
  { month: 'Febrero', Autos: 45, Motos: 25 },
  { month: 'Marzo', Autos: 40, Motos: 30 },
];

const barCategories = ['Autos', 'Motos'];
const barColors = ['#60a5fa', '#facc15'];

const comparisonData = [
  { month: 'Enero', alcoholRelated: 20, nonAlcoholRelated: 50 },
  { month: 'Febrero', alcoholRelated: 25, nonAlcoholRelated: 55 },
  { month: 'Marzo', alcoholRelated: 15, nonAlcoholRelated: 60 },
];

const comparisonConfig = {
  alcoholRelated: { label: 'Alcohol', color: '#f87171' },
  nonAlcoholRelated: { label: 'No alcohol', color: '#60a5fa' },
};

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [menuHidden, setMenuHidden] = useState(false);
  const accidentesData = [
    { type: 'Vehiculo', number: '400' },
    { type: 'Motocicleta', number: '200' },
    { type: 'Bicicleta', number: '50' },
    { type: 'Persona', number: '300' },
  ];

  const lineChartData = [
    { month: 'Enero', fecha1: 20, fecha2: 25 },
    { month: 'Febrero', fecha1: 30, fecha2: 35 },
    { month: 'Marzo', fecha1: 40, fecha2: 45 },
  ];

  return (
    <Menu>
      <div
        className="p-4 w-full"
        style={{
          width: menuHidden ? 'calc(100vw - 150px)' : 'calc(100vw - 300px)', marginLeft: "-220px",
        }}
      >
        {/* Select de fechas */}
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

        {/* Contenedor de widgets */}
        <div className="w-full overflow-y-auto" style={{ maxHeight: "680px", maxWidth: "1040px" }}>

          {/* Dos widgets siempre en dos columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="w-full">
              <DonutChartWidget
                title="Accidentes"
                footer="Accidentes causados por alcohol vs. otras causas"
                centerLabel=""
                data={donutChartData}
              />
            </div>
            <div className="w-full">
              <RadialChartWidget
                title="Causa de accidentes"
                footer=""
                data={radialChartData}
              />
            </div>
          </div>
          {/* Tres widgets de abajo en tres columnas flexibles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="w-full h-full">
              <AccidentesTable data={accidentesData} />
            </div>
            <div className="w-full h-full">
              <LineChartMultiple
                data={lineChartData}
                config={sampleConfig}
                title="Accidentes por alcoholismo"
                description="2023 vs 2024"
                summary="2.1% vs año pasado"
                accidents="56, 799"
              />
            </div>

            <div className="w-full h-[00px]">
              <AccidentsBarChart
                data={data}
                config={{}}
                title="Accidentes por Mes"
                subtitle="Comparación entre dos periodos"
                description="Tendencia creciente"
              />
            </div>
          </div>
        </div>

        <Banner />
      </div>
    </Menu>
  );
};
export default MainPage;