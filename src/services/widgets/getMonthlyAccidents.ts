// es para la comparison widget 
import api from "../api";

export const getMonthlyAccidents = async () => {
  const endpoint = '/widgets/monthly-accidents';
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};