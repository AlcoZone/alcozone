import api from "../api";

export const getAccidentsCount = async (town?: string, startDate?: string,  endDate?: string) => {
  const params = new URLSearchParams();
  if (town) params.append("town", town);
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate)
  const endpoint = `/widgets/accidents-count?${params.toString()}`
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};

