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
import { ComparisonWidget } from '@/components/ComparisonWidget/ComparisonWidget';
import LineChartMultiple from '@/components/LineGraph/LineGraphWidget'
import AccidentesTable from '@/components/Table/AccidentCauseTableWidget';
import Card from '@mui/material/Card';

const accidentesData = [
  { type: 'Vehiculo', number: '120' },
  { type: 'Motocicleta', number: '80' },
  { type: 'Bicicleta', number: '45' },
  { type: 'Persona', number: '60' },
];
const lineChartData = [
  { month: 'Enero', fecha1: 40, fecha2: 35 },
  { month: 'Febrero', fecha1: 45, fecha2: 38 },
  { month: 'Marzo', fecha1: 50, fecha2: 42 },
];

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

  return (
    <Menu>
      <div
        className="p-4 w-full ml-[-220px]"
        style={{
          width: menuHidden ? 'calc(100vw - 150px)' : 'calc(100vw - 300px)',
        }}
      >

        <div className="width: 500px;">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="w-full">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
          <div className="w-full">
            <LineChartMultiple
              data={lineChartData}
              config={sampleConfig}
              title="Accidentes por alcoholismo"
              description="2023 vs 2024"
              summary="2.1% vs año pasado"
              accidents="56,799"
            />
          </div>

          <div className="w-full">
            <AccidentesTable
              title="Tipos de accidentes"
              subtitle="Año 2024"
              data={accidentesData}
            />
          </div>

          <div className="w-full">
            <Card className="h-full p-4 flex items-center justify-center rounded-2xl shadow-md">
              Widget 5
            </Card>
          </div>
        </div>


        <Banner />
      </div>
    </Menu>
  );
};

export default MainPage;