import api from "../api";
// src/services/update/putUpdateDisplayName.ts


export const putUpdateDisplayName = async (newDisplayName: string) => {
  const endpoint = '/users/display-name';
  try {
    const res = await api.put(endpoint, { displayName: newDisplayName });
    return res.data;
  } catch (err) {
    console.error('API error:', err);
    throw err;
  }
};
