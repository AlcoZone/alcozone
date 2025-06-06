"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/authServiceResetPassword";
import { getResetPassword } from "@/services/User/getResetPassword";
import { TextInput } from "@/components/TextInput/TextInput";
import ConfirmButtons from "@/components/ConfirmButtons/ConfirmButtons";
import { Icon } from "@/components/Icon/Icon";
import { FirebaseError } from "firebase/app";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string>("");
  const [loadingResetEmail, setLoadingResetEmail] = useState(false);
  const router = useRouter();

  const handleSendResetEmail = async () => {
    setError("");
    setStatus("idle");

    if (!email.trim()) {
      setError("Por favor, completa el campo.");
      return;
    }

    setLoadingResetEmail(true);

    try {
      await resetPassword(email);

      const exists = await getResetPassword(email);
      if (!exists) {
        setError("No se encontró un usuario con ese correo.");
        return;
      }

      setStatus("success");
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-email":
            setError("El formato del correo es inválido.");
            break;
          default:
            setError("Ocurrió un error al enviar el correo.");
        }
      } else {
        setError("Error inesperado.");
      }
    } finally {
      setLoadingResetEmail(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col justify-between bg-gray-242 pb-20">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-[550px] h-[650px] border border-gray-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <Icon variant="lock" width={80} height={80} />
          <h2 className="text-xl font-semibold mt-6">¿Tienes problemas para iniciar sesión?</h2>
          <p className="text-base text-gray-700 mt-2 mb-8">
            Ingresa tu correo electrónico y te enviaremos un enlace seguro de restablecimiento.
          </p>

          <div className="w-full space-y-6 mb-8 [&_input]:h-14 [&_input]:w-full [&_input]:text-lg">
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              type="email"
            />
          </div>

          <div className="w-full h-14">
            <div className="w-full h-full scale-y-120 origin-top [&_button]:w-full [&_button]:h-full [&_button]:scale-y-[0.75]">
              <ConfirmButtons
                variant="resetPassword"
                onClick={handleSendResetEmail}
                disabled={loadingResetEmail}
              />
            </div>

            {error && (
              <p className="text-red-600 font-medium text-sm mt-2 text-center">{error}</p>
            )}
            {status === "success" && (
              <p className="text-green-600 font-medium text-sm mt-2 text-center">
                Correo enviado correctamente. Revisa tu bandeja de entrada.
              </p>
            )}
            {loadingResetEmail && (
              <p className="text-blue-700 text-center mt-2">Enviando...</p>
            )}
          </div>

          <p
            className="mt-20 text-base text-gray-700 cursor-pointer hover:font-semibold"
            onClick={() => router.push("/auth/login")}
          >
            Regresar al inicio de sesión
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;