import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const accidentes = [
    {
      img: "Img",
      type: "Automovil",
      number: "86,850",
    },
    {
        img: "Img",
        type: "Motocicleta",
        number: "34,580",
    },
    {
        img: "Img",
        type: "Peatones",
        number: "14,009",
    },
    {
        img: "Img",
        type: "Bicicleta",
        number: "6,949",
    }
  ]
  
  export function TableDemo() {
    return (
      <Table>
        <TableHeader>Causa de Accidente </TableHeader>
        <TableBody>
          {accidentes.map((accidentes) => (
            <TableRow key={accidentes.img}>
              <TableCell className="font-medium">{accidentes.img}</TableCell>
              <TableCell>{accidentes.type}</TableCell>
              <TableCell>{accidentes.number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
export default TableDemo  