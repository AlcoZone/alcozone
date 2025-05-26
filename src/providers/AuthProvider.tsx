"use client";

import { signOut } from "firebase/auth";
import { User, getIdToken, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { ROLE_MAP } from "@/utils/roleMap";
import { auth } from "@/lib/firebaseClient";
import api from "@/services/api"; 

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  idToken: string | null;
  role: string | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  idToken: null,
  role: null,
  logout: async () => {}, // función vacía por defecto
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const logout = async () => {
    try {
      await signOut(auth); // Cierra sesión en Firebase
      setUser(null);
      setIdToken(null);
      setRole(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const token = await getIdToken(firebaseUser);
          setIdToken(token);
          console.log("TOKEN OBTENIDO DE FIREBASE:", token);

          const res = await api.get("/user");
          const data = res.data;
          setRole(ROLE_MAP[data.role_id] || null);
        } catch (error) {
          setIdToken(null);
          setRole(null);
        }
      } else {
        setIdToken(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, idToken, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);