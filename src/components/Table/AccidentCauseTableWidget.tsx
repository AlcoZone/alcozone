import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
type Accidente = {
  img: string
  type: string
  number: string
}

type AccidentesTableProps = {
  data: Accidente[]
}
function AccidentesTable({ data }: AccidentesTableProps) {
  return (
    <Card className="w-full max-w-md p-4 rounded-2xl shadow-md bg-white max-h-[350px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-2xl" style={{ color: "#001391" }}>Causa de accidente</p>
          <p className="text-s" style={{ color: "#0636A7" }}>Año 2024</p>
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
                      className="w-10 h-10 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: "#c4c4c4" }}
                    >
                      <img src={item.img} alt={item.type} className="w-10 h-10" />
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

export default AccidentesTable