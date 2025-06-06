import api from "../api";

export const deleteRevision = async (uuid: string) => {
  const endpoint = `/revision/${uuid}`;
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("API error: ", error);
    throw error;
  }
};
