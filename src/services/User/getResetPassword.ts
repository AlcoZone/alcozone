import api from "../api";

export const getResetPassword = async (email: string): Promise<boolean> => {
  try {
    const res = await api.get(`auth/email-exists?email=${encodeURIComponent(email)}`);
    return res.data;
  } catch (error) {
    console.error("Error verifying if the email exists:", error);
    throw new Error("Error verifying the email.");
  }
};
