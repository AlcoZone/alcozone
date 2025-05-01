"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { TextInput } from '@/components/TextInput/TextInput';
import ConfirmButtons from '@/components/ConfirmButtons/ConfirmButtons';
import { Banner } from '@/components/Banner/Banner';
import { Icon } from "@/components/Icon/Icon";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gray-242 pb-20">
      {/* Layout en dos columnas */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-7xl items-stretch">
          {/* Columna izquiera con imagen de pantalla */}
          <div className="w-1/2 flex items-center justify-center p-6">
            <Image
              src="/pantalla.png"
              alt="Dashboard preview"
              width={550}
              height={550}
              className="object-contain"
            />
          </div>
          {/* Columna derecha */}
          <div className="w-[550px] h-[650px] border border-gray-500 rounded-2xl p-12 flex flex-col items-center justify-center">
            {/* Logo + texto */}
            <div className="flex items-center space-x-4 mb-10">
              <Icon variant="logo" width={100} height={100} />
              <h1 className="text-6xl font-extrabold text-blue-850">AlcoZone</h1>
            </div>
            {/* Inputs */}
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
            {/* Botón grande */}
            <div className="w-full h-14">
            <div className="w-full h-full scale-y-120 origin-top [&_button]:w-full [&_button]:h-full [&_button]:scale-y-[0.75]">
                <ConfirmButtons variant="login" onClick={() => console.log("Iniciar sesión")} />
            </div>
            </div>
            {/* Enlace */}
            <p className="mt-20 text-base text-gray-700 cursor-pointer hover:font-semibold">
              ¿Olvidaste tu contraseña?
            </p>
          </div>
        </div>
      </div>
      {/* Banner inferior */}
      <Banner />
    </div>
  );
};

export default LoginPage;