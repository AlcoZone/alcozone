"use client";

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
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  idToken: null,
  role: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        console.log("=== [AUTH] Firebase user en AuthProvider:", firebaseUser);

      if (firebaseUser) {
        try {
          const token = await getIdToken(firebaseUser);
          setIdToken(token);

          // Axios ya agrega el token automáticamente por el interceptor
          const res = await api.get("/user"); // no se si se quedará o usare el que haga alondra
          const data = res.data;
          setRole(ROLE_MAP[data.role_id] || null);

        } catch (error) {
          console.error(error);
          setIdToken(null);
          setRole(null);
          setUser(null);
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
    <AuthContext.Provider value={{ user, loading, idToken, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);