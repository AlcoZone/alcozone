import api from "../api";

export const getAccidentsByReportSource = async (town?: string) => {
  const endpoint = town
    ? `/widgets/accidents-by-report-source?town=${encodeURIComponent(town)}`
    : "/widgets/accidents-by-report-source";
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};
