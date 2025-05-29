"use client";

import { User, getIdToken, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { ROLE_MAP } from "@/utils/roleMap";
import { auth } from "@/lib/firebaseClient";
import { getUserLogin } from "@/services/User/getUserLogin";
import type { AuthContextProps } from "@/types/AuthContextProps";

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  idToken: null,
  role: null,
  email: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const token = await getIdToken(firebaseUser);
          setIdToken(token);
          
          const userLogin = await getUserLogin();

          if (!userLogin?.role_id || !ROLE_MAP[userLogin.role_id]) {
            console.warn("roleId inválido o no mapeado:", userLogin?.role_id);
            setRole(null);
          } else {
            setRole(ROLE_MAP[userLogin.role_id]);
          }
          
          setEmail(userLogin.email || null);

        } catch (error) {
          console.error("Error obteniendo userLogin:", error);
          setIdToken(null);
          setRole(null);
          setEmail(null);
        }
      } else {
        setIdToken(null);
        setRole(null);
        setEmail(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, idToken, role, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);