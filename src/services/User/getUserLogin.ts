import api from "../api";

export const getUserLogin = async () => {
  try {
    const res = await api.get("/user"); 
    return res.data; 
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    return null;
  }
};