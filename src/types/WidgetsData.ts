export type ComparisonData = {
  month_name: string;
  accidents: string;
};

export type Accidente = {
  subType?: string;
  accidentCount: number;
};

export type LineGraphData = {
  accident_date: string;
  total_accidents: number;
};

export type RadialChartData = {
  percentage: number;
  subType: string;
};

export type ReportChannelData = {
  report_source: string;
  total_accidents: number;
};
