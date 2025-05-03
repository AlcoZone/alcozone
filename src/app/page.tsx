import LineChartMultiple from "@/components/LineGraph/LineGraphWidget";
import AccidentesTable from "@/components/Table/AccidentCauseTableWidget";


const sampleData = [
  {
    img: "/icons/carro.png",
    type: "Automóvil",
    number: "86,850",
  },
  {
    img: "/icons/motorcycle.png",
    type: "Motocicleta",
    number: "34,580",
  },
  {
    img: "/icons/pedestrian.png",
    type: "Peatones",
    number: "14,009",
  },
  {
    img: "/icons/bike.png",
    type: "Bicicleta",
    number: "6,949",
  },
]

export default function Home() {
  return <div>
    <AccidentesTable 
    data = {sampleData} 
    ></AccidentesTable>
    </div>
}


