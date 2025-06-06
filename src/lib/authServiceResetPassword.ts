import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export async function resetPassword(email: string): Promise<void> {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
}
