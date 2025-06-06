//este es utilizado para el donut widget
import api from "../api";

export const getDangerousTownPerMonth = async () => {
  const endpoint = '/widgets/dangerous-town-month';
  try {
    const res = await api.get(endpoint, { timeout: 10000 });
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};

