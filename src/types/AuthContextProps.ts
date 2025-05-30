import { User } from "firebase/auth";

export interface AuthContextProps {
    user: User | null;
    loading: boolean;
    idToken: string | null;
    role: string | null;
    email: string | null;
  }