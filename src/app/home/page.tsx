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

// Componente reutilizable de carga con spinner
const LoadingWidget = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex justify-center items-center h-full">
    <div className="flex flex-col items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#001391] mb-2"></div>

      <p className="text-center text-xl font-sans">{message}</p>
    </div>
  </div>
);

const MainPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string | null } | null>(null);

  const [donutChartData, setDonutChartData] = useState<AccidenteDonut[]>([]);
  const [radialData, setRadialData] = useState<{ percentage: number; subType: string }[]>([]);
  const [comparisonData, setComparisonData] = useState<{ month_name: string; accidents: string }[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [barChartColors, setBarChartColors] = useState<Record<string, string>>({});
  const [accidentCauseData, setAccidentCauseData] = useState<Accidente[]>([]);

  const [loadingDonut, setLoadingDonut] = useState(true);
  const [loadingRadial, setLoadingRadial] = useState(true);
  const [loadingComparison, setLoadingComparison] = useState(true);
  const [loadingBar, setLoadingBar] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? { email: user.email } : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDonutData = async () => {
      try {
        setLoadingDonut(true);
        const response = await api.get<AccidenteDonut[]>('/widgets/dangerous-town');
        setDonutChartData(response.data);
      } catch (error) {
        console.error("Error cargando DonutChart:", error);
      } finally {
        setLoadingDonut(false);
      }
    };

    const fetchRadialData = async () => {
      try {
        setLoadingRadial(true);
        const radial = await getAccidentsPercentage();
        setRadialData(radial);
      } catch (error) {
        console.error("Error cargando RadialChart:", error);
      } finally {
        setLoadingRadial(false);
      }
    };

    const fetchBarData = async () => {
      try {
        setLoadingBar(true);
        const barData = await getDangerousTownPerMonth();
        setBarChartData(barData);
        const towns = barData.map((d: any) => d.town);
        setBarChartColors(generateColors(towns));
      } catch (error) {
        console.error("Error cargando BarChart:", error);
      } finally {
        setLoadingBar(false);
      }
    };

    const fetchComparisonData = async () => {
      try {
        setLoadingComparison(true);
        const comparison = await getMonthlyAccidents();
        setComparisonData(comparison);
      } catch (error) {
        console.error("Error cargando Comparison:", error);
      } finally {
        setLoadingComparison(false);
      }
    };

    const fetchTableData = async () => {
      try {
        setLoadingTable(true);
        const accidentCauses = await getAccidentsCount();
        setAccidentCauseData(accidentCauses);
      } catch (error) {
        console.error("Error cargando Table:", error);
      } finally {
        setLoadingTable(false);
      }
    };

    fetchDonutData();
    fetchRadialData();
    fetchBarData();
    fetchComparisonData();
    fetchTableData();
  }, []);

  return (
    <div className="flex flex-wrap h-screen overflow-auto px-4 pb-4 gap-4">
      {/* DonutChartWidget */}
      <div className="w-full md:w-[calc(33.33%-1rem)]">
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
          <CardContent className="flex-1 flex flex-col px-0">
            {loadingDonut ? (
              <LoadingWidget />
            ) : (
              <DonutChartWidget
                data={donutChartData}
                title="Alcaldías peligrosas"
                footer="Alcaldías con más accidentes"
                centerLabel="Accidentes"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* RadialChartWidget */}
      <div className="w-full md:w-[calc(66.66%-1rem)]">
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
          <CardContent className="flex-1 flex flex-col px-0">
            {loadingRadial ? (
              <LoadingWidget />
            ) : (
              <RadialChartWidget title="Causas de accidentes" data={radialData} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* BarChartWidget */}
      <div className="w-full md:w-[calc(33.33%-1rem)]">
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
          <CardContent className="flex-1 flex flex-col px-0">
            {loadingBar ? (
              <LoadingWidget />
            ) : (
              <BarChartWidget
                data={barChartData}
                title="Top 2 alcaldías con más accidentes por mes"
                description="Comparativa mensual de las alcaldías con más accidentes"
                colors={barChartColors}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* ComparisonWidget */}
      <div className="w-full md:w-[calc(33.33%-1rem)]">
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
          <CardContent className="flex-1 flex flex-col px-0">
            {loadingComparison ? (
              <LoadingWidget />
            ) : (
              <ComparisonWidget
                title="Accidentes por mes"
                data={comparisonData}
                footer="Año 2024"
                config={comparisonConfig}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* AccidentCauseTableWidget */}
      <div className="w-full md:w-[calc(33.33%-1rem)]">
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
          <CardContent className="flex-1 flex flex-col px-0">
            {loadingTable ? (
              <LoadingWidget />
            ) : (
              <AccidentCauseTableWidget
                data={accidentCauseData}
                title="Tipos de accidentes"
                subtitle="Año 2024"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainPage;
