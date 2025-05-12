import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Car, Bike,LifeBuoy, User } from "lucide-react"

type Accidente = {
  type: string
  number: string
}

type AccidentesTableProps = {
  data: Accidente[]
  title?: string
  subtitle?: string
}

const AccidentCauseTableWidget = ({
  data,
  title = "Tipos de accidentes",
  subtitle = "Año 2024",
}: AccidentesTableProps) => {
  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case "vehiculo":
        return <Car className="w-6 h-6" />
      case "motocicleta":
        return <LifeBuoy className="w-6 h-6" />
      case "bicicleta":
        return <Bike className="w-6 h-6" />
      case "persona":
        return <User className="w-6 h-6" />
    }
  }
  return (
    <Card className="w-full max-w-md p-4 rounded-2xl shadow-md bg-white max-h-[350px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-2xl font-bold" style={{ color: "#001391" }}>{title}</p>
          <p className="text-sm" style={{ color: "#0636A7" }}>{subtitle}</p>
        </div>
      </div>

      <div className="max-h-[300px] overflow-y-auto">
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
                <TableCell className="text-right font-medium">{item.number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

export default AccidentCauseTableWidget
