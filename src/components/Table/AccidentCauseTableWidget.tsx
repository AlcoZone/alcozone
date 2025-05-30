import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Car, Bike, LifeBuoy, User } from "lucide-react";

type Accidente = {
  subType?: string;  // ahora es opcional para evitar errores
  accidentCount: number;
};

type AccidentesTableProps = {
  data: Array<Accidente>;
  title?: string;
  subtitle?: string;
};

const AccidentCauseTableWidget = ({
  data,
  title = "Tipos de accidentes",
  subtitle = "Año 2024",
}: AccidentesTableProps) => {
  const getIconForType = (type: string | undefined) => {
    if (!type || typeof type !== "string") {
      return <LifeBuoy className="w-6 h-6 text-gray-400" />;
    }

    const key = type.toLowerCase().trim();
    console.log(key)
    switch (key.toLocaleLowerCase()) {
      case "choque con lesionados":
        return <Car className="w-6 h-6 text-gray-600" />;
      case "motociclista":
        return <LifeBuoy className="w-6 h-6 text-gray-600" />;
      case "atropellado":
        return <User className="w-6 h-6 text-gray-600" />;
      case "ciclista":
        return <Bike className="w-6 h-6 text-gray-600" />;
      default:
        return <LifeBuoy className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <Card className="w-full max-w-md p-4 rounded-2xl shadow-md bg-white max-h-[350px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-m font-bold" style={{ color: "#001391" }}>
            {title}
          </p>
          <p className="text-sm" style={{ color: "#0636A7" }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        <Table>
          <TableBody>
            {data.map((item, index) => {
              if (!item.subType) return null; // evita renderizar si subType es undefined o vacío
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden"
                        style={{ backgroundColor: "#c4c4c4" }}
                      >
                        {getIconForType(item.subType)}
                      </div>
                      <span>{item.subType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.accidentCount}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AccidentCauseTableWidget;
