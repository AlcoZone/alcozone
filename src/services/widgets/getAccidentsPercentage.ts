//este es para el radial widget
import api from "../api";

export const getAccidentsPercentage = async () => {
  const endpoint = '/widgets/accidents-percentage';
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};