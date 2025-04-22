//import BarChartWidget from "@/components/BarChartWidget/BarChartWidget";
//import ComparisonWidget from "@/components/ComparisonWidget/ComparisonWidget";
//import DonutChartWidget from "@/components/DonutChartWidget/DonutChartWidget";
import RadialChartWidget from "@/components/RadialChartWidget/RadialChartWidget";

export default function Home() {
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <  RadialChartWidget />
    </div>
  );
}
