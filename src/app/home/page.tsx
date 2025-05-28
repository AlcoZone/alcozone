"use client";

import { Bike, Car, LifeBuoy, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { Banner } from "@/components/Banner/Banner";
import { BarChartWidget } from "@/components/BarChartWidget/BarChartWidget";
import { ComparisonWidget } from "@/components/ComparisonWidget/ComparisonWidget";
import { DonutChartWidget } from "@/components/DonutChartWidget/DonutChartWidget";
import { Menu } from "@/components/Menu/Menu";
import { RadialChartWidget } from "@/components/RadialChartWidget/RadialChartWidget";
import api from "@/services/api";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

type Accidente = {
  type: string;
  number: string;
};

type AccidentesTableProps = {
  data: Accidente[];
  title?: string;
  subtitle?: string;
};

type AccidenteDonut = {
  town: string;
  total_accidents: string; // this will be a number in string form
};

type DonutChartProps = {
  title: string;
  footer: string;
  centerLabel: string;
  data: AccidenteDonut[];
};

// Poner en otro componente
const AccidentCauseTableWidget = ({
  data,
  title = "Tipos de accidentes",
  subtitle = "Año 2024",
}: AccidentesTableProps) => {
  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case "vehiculo":
        return <Car className="w-6 h-6" />;
      case "motocicleta":
        return <LifeBuoy className="w-6 h-6" />;
      case "bicicleta":
        return <Bike className="w-6 h-6" />;
      case "persona":
        return <User className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full h-full p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-2xl font-bold" style={{ color: "#001391" }}>
            {title}
          </p>
          <p className="text-sm" style={{ color: "#0636A7" }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="h-[calc(100%-80px)] overflow-y-auto">
        <Table>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden"
                      style={{ backgroundColor: "#c4c4c4" }}
                    >
                      {getIconForType(item.type)}
                    </div>
                    <span>{item.type}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {item.number}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

//aqui irian las apis?
//aqui falta cambiarle el nombre
const accidentData: Accidente[] = [
  { type: "Vehiculo", number: "120" },
  { type: "Motocicleta", number: "85" },
  { type: "Bicicleta", number: "34" },
  { type: "Persona", number: "18" },
];

const donutChartData: AccidenteDonut[] = [
  { town: "Iztapalapa", total_accidents: "2747" },
  { town: "Alvaro Obregon", total_accidents: "1846" },
];

//este ya esta bien
const radialChartData = [
  { percentage: 28.47, subType: "Choque con lesionados" },
  { percentage: 9.72, subType: "Motociclista" },
  { percentage: 9.43, subType: "Atropellado" },
];

//este aun falta

const defaultColors = [
  "#0095FF",
  "#00E096",
  "#FF9900",
  "#FF6699",
  "#AA00FF",
  "#FF0066",
  "#00CC99",
];

function generateColors(towns: string[]): Record<string, string> {
  const uniqueTowns = Array.from(new Set(towns));
  const colorsMap: Record<string, string> = {};

  uniqueTowns.forEach((town, index) => {
    colorsMap[town] = defaultColors[index % defaultColors.length];
  });

  return colorsMap;
}

const barChartData = [
  { month_name: "February", town: "Iztapalapa", total_accidents: 2747 },
  { month_name: "February", town: "Gustavo A. Madero", total_accidents: 1846 },
  { month_name: "March", town: "Iztapalapa", total_accidents: 2900 },
  { month_name: "March", town: "Benito Juárez", total_accidents: 1700 },
  { month_name: "April", town: "Gustavo A. Madero", total_accidents: 2200 },
  { month_name: "April", town: "Coyoacán", total_accidents: 1800 },
];

const townsList = barChartData.map((d) => d.town);
const colors = generateColors(townsList);

//este ya esta bien
const comparisonData = [
  { month_name: "January", accidents: "1600" },
  { month_name: "February", accidents: "16208" },
  { month_name: "March", accidents: "17500" },
  { month_name: "April", accidents: "16000" },
  { month_name: "May", accidents: "13000" },
  { month_name: "June", accidents: "11000" },
];

const comparisonConfig = {
  accidents: { label: "Accidentes", color: "#8884d8" },
};

const MainPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [menuHidden, setMenuHidden] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  // const [donutChartData, setDonutChartData] = useState<AccidenteDonut[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Para donut chart
  useEffect(() => {}, []);

  return (
    <div className="p-4 h-[calc(100vh-80px)] w-[calc(100vw-16rem)] overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[1fr_2fr] gap-4 max-h-1/2">
        {/* Card 1 */}
        <Card className="bg-transparent shadow-none border-none h-full flex flex-col">
          <CardContent className="p-0 flex-1 flex flex-col">
            <DonutChartWidget
              data={donutChartData}
              title={"Alcaldías peligrosas"}
              footer={"Alcaldías con más accidentes"}
              centerLabel={"example"}
            />
          </CardContent>
        </Card>

        {/* Card 2 - ocupa dos columnas */}
        <Card className="md:col-span-2 bg-transparent shadow-none border-none h-full flex flex-col">
          <CardContent className="p-0 flex-1 flex flex-col">
            <RadialChartWidget
              title={"Causas de accidentes"}
              data={radialChartData}
            />
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="shadow-none bg-transparent border-none h-full flex flex-col">
          <CardContent className="h-full p-0 flex flex-col">
            <BarChartWidget
              data={barChartData}
              title="Top 2 alcaldías con más accidentes por mes"
              description="Comparativa mensual de las alcaldías con más accidentes"
              colors={colors}
            />
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="shadow-none bg-transparent border-none h-full flex flex-col">
          <CardContent className="h-full p-0 flex flex-col">
            <ComparisonWidget
              title={"Accidentes por mes"}
              data={comparisonData}
              footer="Año 2024"
              config={comparisonConfig}
            />
          </CardContent>
        </Card>

        {/* Card 5 */}
        <Card className="shadow-none bg-transparent border-none h-full flex flex-col">
          <CardContent className="h-full p-0 flex flex-col">
            <AccidentCauseTableWidget data={accidentData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainPage;
