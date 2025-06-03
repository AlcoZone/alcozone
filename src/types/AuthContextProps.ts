import { User } from "firebase/auth";

export interface AuthContextProps {
    user: User | null;
    loading: boolean;
    idToken: string | null;
    role: string | null;
    email: string | null;
    name: string | null;
    logout?: () => Promise<void>;
    refreshUser?: () => Promise<void>;
    updateFirebaseDisplayName?: (newName: string) => Promise<void>; 
  }