"use client";
import React, { useState } from "react";
import Image from "next/image";
import ConfirmButtons from "@/components/ConfirmButtons/ConfirmButtons";
import { TextInput } from "@/components/TextInput/TextInput";
import { Banner } from "@/components/Banner/Banner";
import { Icon } from "@/components/Icon/Icon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const router = useRouter();
  
  const handleLogin = async () => {
    setError("");
    setLoadingLogin(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === "auth/user-disabled") {
        setError("Tu cuenta está deshabilitada.");
      } else {
        setError("Error al iniciar sesión.");
      }
    }
    setLoadingLogin(false);
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gray-242 pb-20">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-7xl items-stretch">
          <div className="w-1/2 flex items-center justify-center p-6">
            <Image
              src="/images/pantalla.png"
              alt="Dashboard preview"
              width={550}
              height={550}
              className="object-contain"
            />
          </div>

          <div className="w-[550px] h-[650px] border border-gray-500 rounded-2xl p-12 flex flex-col items-center justify-center">
            <div className="flex items-center space-x-4 mb-10">
              <Icon variant="logo" width={100} height={100} />
              <h1 className="text-6xl font-extrabold text-blue-850">AlcoZone</h1>
            </div>

            <div className="w-full space-y-6 mb-8 text-lg [&_input]:h-14 [&_input]:w-full [&_input]:text-lg">
              <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                type="email"
              />
              <div className="relative w-full">
                <TextInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  type="password"
                  showPasswordToggle
                />
              </div>
            </div>

            <div className="w-full h-14">
              <div className="w-full h-full scale-y-120 origin-top [&_button]:w-full [&_button]:h-full [&_button]:scale-y-[0.75]">
                <ConfirmButtons
                  variant="login"
                  onClick={loadingLogin ? () => {} : handleLogin}
                />
              </div>
              {error && (
                <p className="text-red-600 font-medium text-sm mt-2 text-center">
                  {error}
                </p>
              )}
              {loadingLogin && (
                <p className="text-blue-700 text-center mt-2">Ingresando...</p>
              )}
            </div>
            <p
              className="mt-20 text-base text-gray-700 cursor-pointer hover:font-semibold"
              onClick={() => router.push("/auth/forgotPassword")}
            >
              ¿Olvidaste tu contraseña?
            </p>
            <p
              className="mt-4 text-base text-gray-700 cursor-pointer hover:font-semibold"
              onClick={() => router.push("/legal/privacy")}
            >
              Aviso de privacidad
            </p>
          </div>
        </div>
      </div>
      <Banner />
    </div>
  );
};

export default LoginPage;