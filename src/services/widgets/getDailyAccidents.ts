import api from "../api";

export const getDailyAccidents = async (town?: string) => {
  const endpoint = town
    ? `/widgets/daily-accidents?town=${encodeURIComponent(town)}`
    : "/widgets/daily-accidents";
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};
