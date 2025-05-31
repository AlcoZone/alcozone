import api from "../api";

export const putUpdatePassword = async () => {
  const endpoint = '/users/display-password';
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};