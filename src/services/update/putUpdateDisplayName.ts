import api from "../api";

export const putUpdateDisplayName = async () => {
  const endpoint = '/users/display-name';
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};