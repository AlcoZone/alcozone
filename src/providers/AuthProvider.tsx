"use client";

import {
  User,
  getIdToken,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { ROLE_MAP } from "@/utils/roleMap";
import { auth } from "@/lib/firebaseClient";
import { getUserLogin } from "@/services/User/getUserLogin";
import type { AuthContextProps } from "@/types/AuthContextProps";

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  idToken: null,
  role: null,
  name: null,
  email: null,
  logout: async () => {},
  refreshUser: async () => {},
  updateFirebaseDisplayName: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIdToken(null);
      setRole(null);
      setEmail(null);
      setName(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const updateFirebaseDisplayName = async (newName: string) => {
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setName(newName);
    } catch (error) {
      console.error("Error actualizando displayName en Firebase:", error);
    }
  };

  const refreshUser = useCallback(async () => {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return;

    try {
      const token = await getIdToken(firebaseUser);
      setIdToken(token);

      const userLogin = await getUserLogin();
      setEmail(userLogin.email || null);
      setRole(
        userLogin?.role_id && ROLE_MAP[userLogin.role_id]
          ? ROLE_MAP[userLogin.role_id]
          : null
      );

      setName(firebaseUser.displayName || null); 
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await refreshUser();
      } else {
        setIdToken(null);
        setRole(null);
        setEmail(null);
        setName(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        idToken,
        role,
        name,
        email,
        logout,
        refreshUser,
        updateFirebaseDisplayName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);