'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { getAccidentsPercentage } from '@/services/widgets/getAccidentsPercentage';
import { getMonthlyAccidents } from '@/services/widgets/getMonthlyAccidents';
import { getDangerousTownPerMonth } from '@/services/widgets/getDangerousTownPerMonth';
import { getAccidentsCount } from '@/services/widgets/getAccidentsCount';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

import { DonutChartWidget } from '@/components/DonutChartWidget/DonutChartWidget';
import { RadialChartWidget } from '@/components/RadialChartWidget/RadialChartWidget';
import { BarChartWidget } from '@/components/BarChartWidget/BarChartWidget';
import { ComparisonWidget } from '@/components/ComparisonWidget/ComparisonWidget';
import { Card, CardContent } from '@/components/ui/card';
import AccidentCauseTableWidget from '@/components/Table/AccidentCauseTableWidget';

type Accidente = {
  subType?: string;
  accidentCount: number;
};

type AccidenteDonut = {
  town: string;
  total_accidents: string;
};

const comparisonConfig = {
  accidents: { label: "Accidentes", color: "#8884d8" },
};

const defaultColors = ["#0095FF", "#00E096", "#FF9900", "#FF6699", "#AA00FF", "#FF0066", "#00CC99"];

function generateColors(towns: string[]): Record<string, string> {
  const uniqueTowns = Array.from(new Set(towns));
  const colorsMap: Record<string, string> = {};

  uniqueTowns.forEach((town, index) => {
    colorsMap[town] = defaultColors[index % defaultColors.length];
  });

  return colorsMap;
}

const MainPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);

  const [donutChartData, setDonutChartData] = useState<AccidenteDonut[]>([]);
  const [radialData, setRadialData] = useState<{ percentage: number; subType: string }[]>([]);
  const [comparisonData, setComparisonData] = useState<{ month_name: string; accidents: string }[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [barChartColors, setBarChartColors] = useState<Record<string, string>>({});
  const [accidentCauseData, setAccidentCauseData] = useState<Accidente[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDonutData = async () => {
      try {
        const response = await api.get<AccidenteDonut[]>('/widgets/dangerous-town');
        setDonutChartData(response.data);
      } catch (error) {
        console.error('Error al obtener datos donut:', error);
      }
    };
    fetchDonutData();
  }, []);

  useEffect(() => {
    const fetchRadialData = async () => {
      try {
        const data = await getAccidentsPercentage();
        setRadialData(data);
      } catch (error) {
        console.error('Error fetching radial chart data:', error);
      }
    };
    fetchRadialData();
  }, []);

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const data = await getMonthlyAccidents();
        setComparisonData(data);
      } catch (error) {
        console.error("Error fetching comparison data: ", error);
      }
    };
    fetchComparisonData();
  }, []);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const data = await getDangerousTownPerMonth();
        setBarChartData(data);
        const towns = data.map((d: any) => d.town);
        setBarChartColors(generateColors(towns));
      } catch (error) {
        console.error("Error fetching bar chart data: ", error);
      }
    };
    fetchBarChartData();
  }, []);

  useEffect(() => {
    const fetchAccidentCauses = async () => {
      try {
        const data = await getAccidentsCount();
        setAccidentCauseData(data);
      } catch (error) {
        console.error("Error fetching accident causes:", error);
      }
    };
    fetchAccidentCauses();
  }, []);

  return (
<div className="flex flex-wrap h-screen overflow-auto px-4 pb-4 gap-4">
  {/* Card 1 - DonutChartWidget */}
  <div className="w-full md:w-[calc(33.33%-1rem)]">
    <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
      <CardContent className="flex-1 flex flex-col px-0">
        <DonutChartWidget
          data={donutChartData}
          title="Alcaldías peligrosas"
          footer="Alcaldías con más accidentes"
          centerLabel="Accidentes"
        />
      </CardContent>
    </Card>
  </div>

  {/* Card 2 - RadialChartWidget (ocupa 2 columnas) */}
  <div className="w-full md:w-[calc(66.66%-1rem)]">
    <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
      <CardContent className="flex-1 flex flex-col px-0">
        <RadialChartWidget title="Causas de accidentes" data={radialData} />
      </CardContent>
    </Card>
  </div>

  {/* Card 3 - BarChartWidget */}
  <div className="w-full md:w-[calc(33.33%-1rem)]">
    <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
      <CardContent className="flex-1 flex flex-col px-0">
        <BarChartWidget
          data={barChartData}
          title="Top 2 alcaldías con más accidentes por mes"
          description="Comparativa mensual de las alcaldías con más accidentes"
          colors={barChartColors}
        />
      </CardContent>
    </Card>
  </div>

  {/* Card 4 - ComparisonWidget */}
  <div className="w-full md:w-[calc(33.33%-1rem)]">
    <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
      <CardContent className="flex-1 flex flex-col px-0">
        <ComparisonWidget
          title="Accidentes por mes"
          data={comparisonData}
          footer="Año 2024"
          config={comparisonConfig}
        />
      </CardContent>
    </Card>
  </div>

  {/* Card 5 - AccidentCauseTableWidget */}
  <div className="w-full md:w-[calc(33.33%-1rem)]">
    <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
      <CardContent className="flex-1 flex flex-col px-0">
        <AccidentCauseTableWidget
          data={accidentCauseData}
          title="Tipos de accidentes"
          subtitle="Año 2024"
        />
      </CardContent>
    </Card>
  </div>
</div>
  );
};

export default MainPage;