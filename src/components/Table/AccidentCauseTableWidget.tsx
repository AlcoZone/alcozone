import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Car, Bike, LifeBuoy, User } from "lucide-react";

type Accidente = {
  subType?: string;
  accidentCount: number;
};

type AccidentesTableProps = {
  data: Array<Accidente>;
  title?: string;
  subtitle?: string;
  chartHeight?: number;
};

const AccidentCauseTableWidget = ({
  data,
  title = "Tipos de accidentes",
  subtitle = "Año 2024",
  chartHeight,
}: AccidentesTableProps) => {
  const defaultHeight = 220;

  const getIconForType = (type: string | undefined) => {
    if (!type || typeof type !== "string") {
      return <LifeBuoy className="w-6 h-6 text-gray-400" />;
    }

    const key = type.toLowerCase().trim();
    switch (key) {
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
    <Card className={`w-full ${chartHeight ? "h-full" : ""}`}>
      <CardHeader>
        <CardTitle className="text-1xl">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>

      <CardContent className={chartHeight ? "flex-1" : ""}>
        <div
          className="w-full overflow-y-auto"
          style={{
            height:
              chartHeight !== undefined ? chartHeight - 100 : defaultHeight,
          }}
        >
          <Table>
            <TableBody>
              {data.map((item, index) => {
                if (!item.subType) return null;
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
      </CardContent>
    </Card>
  );
};

export default AccidentCauseTableWidget;
