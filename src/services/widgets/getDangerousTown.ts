//este es utilizado para el donut widget
import api from "../api";

export const getDangerousTown = async (startDate?: string, endDate?: string) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate)

  const endpoint = `/widgets/dangerous-town?${params.toString()}`;
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};




