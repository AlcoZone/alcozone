import api from "../api";

export const putUpdatePassword = async (newPassword: string) => {
  const endpoint = '/users/password';
  try {
    const res = await api.put(endpoint, { password: newPassword });
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};
