"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

// 🚨 NOTE TO PAGE OWNER:
// This page is currently used to validate Firebase login and token presence.
// If the token is invalid or missing, the user is redirected to /auth/login.
// Right now it shows a placeholder message ("Login funcionando yayyy!!").
// Please replace this content with the actual dashboard or landing content.
// This validation ensures only authenticated users can access this route.


const home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        await api.get("/auth/login"); 
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    };

    validateToken();
  }, [router]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Login funcionando yayyy!!</h1>
    </div>
  );
};

export default home;