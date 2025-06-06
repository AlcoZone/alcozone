// es para la comparison widget 
import api from "../api";

export const getMonthlyAccidents = async (town?: string) => {
  const endpoint = town
    ? `/widgets/monthly-accidents?town=${encodeURIComponent(town)}`
    : "/widgets/monthly-accidents";
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};
