//este es para el widget de alondra 
import api from "../api";

export const getAccidentsCount = async (town?: string) => {
  const endpoint = town
    ? `/widgets/accidents-count?town=${encodeURIComponent(town)}`
    : "/widgets/accidents-count";
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};