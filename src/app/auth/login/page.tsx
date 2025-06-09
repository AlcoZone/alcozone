"use client";
import React, { useState } from "react";
import Image from "next/image";
import ConfirmButtons from "@/components/ConfirmButtons/ConfirmButtons";
import { TextInput } from "@/components/TextInput/TextInput";
import { Icon } from "@/components/Icon/Icon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const router = useRouter();
  
  const handleLogin = async () => {
    setError("");
  
    if (!email.trim() || !password.trim()) {
      setError("Por favor, completa ambos campos.");
      return;
    }
  
    setLoadingLogin(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error: any) {
      console.log(error.code)
      switch (error.code) {
        case "auth/user-disabled":
          setError("Tu cuenta ha sido deshabilitada. Contacta al administrador");
          break;
        case "auth/invalid-email":
          setError("El formato del correo es inválido");
          break;
        case "auth/invalid-credential":
            setError("El correo o la contraseña son incorrectos. Por favor, verifica tus datos e inténtalo de nuevo.");
          break;
        default:
          setError("Error al iniciar sesión. Intenta más tarde");
          break;
      }
    } finally {
      setLoadingLogin(false);
    }
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
                testId="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                type="email"
                data-testid="input-txtinput-email"
              />
              <div className="relative w-full">
                <TextInput
                  testId="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  type="password"
                  showPasswordToggle
                  data-testid="input-txtinput-password"
                />
              </div>
            </div>

            <div className="w-full h-14">
              <div className="w-full h-full scale-y-120 origin-top [&_button]:w-full [&_button]:h-full [&_button]:scale-y-[0.75]">
                <ConfirmButtons
                  testId="btn-login"
                  variant="login"
                  onClick={handleLogin}
                  disabled={loadingLogin}
                  data-testid="btn-login"
                />
              </div>
              {error && (
                <p data-testid= "login-error"
                   className="text-red-600 font-medium text-sm mt-2 text-center">
                  {error}
                </p>
              )}
              {loadingLogin && (
                <p data-testid= "login-loading"
                className="text-blue-700 text-center mt-2">Ingresando...</p>
              )}
            </div>
            <p
              data-testid="forgot-password-link"
              className="mt-20 text-base text-gray-700 cursor-pointer hover:font-semibold"
              onClick={() => router.push("/auth/forgotPassword")}
            >
              ¿Olvidaste tu contraseña?
            </p>
            <p
              data-testid="privacy-link"
              className="mt-4 text-base text-gray-700 cursor-pointer hover:font-semibold"
              onClick={() => router.push("/privacy")}
            >
              Aviso de privacidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;