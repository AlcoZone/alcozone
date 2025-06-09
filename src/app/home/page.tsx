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

import Spinner from '@/components/Spinner/Spinner';

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

  
  const [errorDonut, setErrorDonut] = useState(false);
  const [errorRadial, setErrorRadial] = useState(false);
  const [errorComparison, setErrorComparison] = useState(false);
  const [errorBar, setErrorBar] = useState(false);
  const [errorTable, setErrorTable] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? { email: user.email } : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDonutData = async () => {
      setLoadingDonut(true);
      setErrorDonut(false);
      try {
        const response = await api.get<AccidenteDonut[]>('/widgets/dangerous-town');
        setDonutChartData(response.data);
      } catch (error) {
        console.error("Error cargando DonutChart:", error);
        setErrorDonut(true);
      } finally {
        setLoadingDonut(false);
      }
    };

    const fetchRadialData = async () => {
      setLoadingRadial(true);
      setErrorRadial(false);
      try {
        const radial = await getAccidentsPercentage();
        setRadialData(radial);
      } catch (error) {
        console.error("Error cargando RadialChart:", error);
        setErrorRadial(true);
      } finally {
        setLoadingRadial(false);
      }
    };

    const fetchBarData = async () => {
      setLoadingBar(true);
      setErrorBar(false);
      try {
        const barData = await getDangerousTownPerMonth();
        setBarChartData(barData);
        const towns = barData.map((d: any) => d.town);
        setBarChartColors(generateColors(towns));
      } catch (error) {
        console.error("Error cargando BarChart:", error);
        setErrorBar(true);
      } finally {
        setLoadingBar(false);
      }
    };

    const fetchComparisonData = async () => {
      setLoadingComparison(true);
      setErrorComparison(false);
      try {
        const comparison = await getMonthlyAccidents();
        setComparisonData(comparison);
      } catch (error) {
        console.error("Error cargando Comparison:", error);
        setErrorComparison(true);
      } finally {
        setLoadingComparison(false);
      }
    };

    const fetchTableData = async () => {
      setLoadingTable(true);
      setErrorTable(false);
      try {
        const accidentCauses = await getAccidentsCount();
        setAccidentCauseData(accidentCauses);
      } catch (error) {
        console.error("Error cargando Table:", error);
        setErrorTable(true);
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
      <div className="w-full md:w-[calc(33.33%-1rem)]" data-testid="donut-widget-container">
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
          <CardContent className="flex-1 flex flex-col px-0">
            {loadingDonut ? (
              <Spinner />
            ) : errorDonut ? (
              <div data-testid="error-message">No se pudo cargar el widget</div>
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
      <div className="w-full md:w-[calc(66.66%-1rem)]" data-testid="radial-widget-container">
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
          <CardContent className="flex-1 flex flex-col px-0">
            {loadingRadial ? (
              <Spinner />
            ) : errorRadial ? (
              <div data-testid="error-message">No se pudo cargar el widget</div>
            ) : (
              <RadialChartWidget title="Causas de accidentes" data={radialData} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* BarChartWidget */}
      <div className="w-full md:w-[calc(33.33%-1rem)]" data-testid="bar-widget-container">
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
          <CardContent className="flex-1 flex flex-col px-0">
            {loadingBar ? (
              <Spinner />
            ) : errorBar ? (
              <div data-testid="error-message">No se pudo cargar el widget</div>
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
      <div className="w-full md:w-[calc(33.33%-1rem)]" data-testid="comparison-widget-container">
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
          <CardContent className="flex-1 flex flex-col px-0">
            {loadingComparison ? (
              <Spinner />
            ) : errorComparison ? (
              <div data-testid="error-message">No se pudo cargar el widget</div>
            ) : (
              <ComparisonWidget
                title="Accidentes por mes"
                data={comparisonData}
                footer=""
                config={comparisonConfig}
                data-testid="comparison-widget"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* AccidentCauseTableWidget */}
      <div className="w-full md:w-[calc(33.33%-1rem)]" data-testid="table-widget-container">
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col pt-3 pb-0">
          <CardContent className="flex-1 flex flex-col px-0">
            {loadingTable ? (
              <Spinner />
            ) : errorTable ? (
              <div data-testid="error-message">No se pudo cargar el widget</div>
            ) : (
              <AccidentCauseTableWidget data={accidentCauseData} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainPage;

