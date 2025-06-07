"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import ConfirmButtons from "@/components/ConfirmButtons/ConfirmButtons";

const PrivacyPage = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-850 mb-4">
              Política de Privacidad de AlcoZone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introducción</h2>
              <p className="mb-4">
                Bienvenido a AlcoZone, una plataforma dedicada a la prevención y
                análisis de accidentes relacionados con el consumo de alcohol.
                Al acceder y utilizar este servicio, usted acepta estar sujeto a
                los siguientes términos y condiciones.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. Propósito del Servicio
              </h2>
              <p className="mb-4">
                AlcoZone es una herramienta de análisis y visualización de datos
                que tiene como objetivo:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Proporcionar información sobre accidentes relacionados con el
                  consumo de alcohol
                </li>
                <li>
                  Analizar patrones y tendencias de incidentes en diferentes
                  zonas
                </li>
                <li>
                  Ayudar en la prevención de accidentes mediante la
                  visualización de datos
                </li>
                <li>
                  Facilitar la toma de decisiones basada en datos para
                  autoridades y usuarios
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Uso de Datos</h2>
              <p className="mb-4">
                Los datos presentados en AlcoZone son de carácter informativo y
                se obtienen de fuentes oficiales. El usuario debe tener en
                cuenta que:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Los datos son actualizados periódicamente pero pueden no
                  reflejar información en tiempo real
                </li>
                <li>
                  Las predicciones y análisis son estimaciones basadas en datos
                  históricos
                </li>
                <li>
                  La información debe ser utilizada como referencia y no como
                  única fuente de decisión
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. Responsabilidades del Usuario
              </h2>
              <p className="mb-4">
                Al utilizar AlcoZone, el usuario se compromete a:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Utilizar la información de manera responsable y ética</li>
                <li>No manipular o alterar los datos presentados</li>
                <li>
                  No utilizar la plataforma para fines ilegales o maliciosos
                </li>
                <li>
                  Respetar la privacidad y confidencialidad de la información
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Limitaciones de Responsabilidad
              </h2>
              <p className="mb-4">AlcoZone no se hace responsable por:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Decisiones tomadas basadas en la información proporcionada
                </li>
                <li>Pérdidas o daños derivados del uso de la plataforma</li>
                <li>La exactitud o actualidad de los datos presentados</li>
                <li>Interrupciones en el servicio o fallos técnicos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                6. Privacidad y Seguridad
              </h2>
              <p className="mb-4">
                Nos comprometemos a proteger la privacidad de nuestros usuarios
                y a mantener la seguridad de la información. Toda la información
                personal recopilada está sujeta a nuestra política de privacidad
                y se maneja de acuerdo con las leyes aplicables.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                7. Aviso de Privacidad
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Los datos personales que recopilamos son utilizados únicamente
                  para proporcionar y mejorar nuestros servicios
                </li>
                <li>
                  La información que recopilamos puede incluir: datos de
                  contacto e información de uso de la plataforma.
                </li>
                <li>
                  Usted tiene derecho a acceder, rectificar, cancelar u oponerse
                  al tratamiento de sus datos personales
                </li>
                <li>
                  Sus datos personales no serán compartidos con terceros sin su
                  consentimiento, excepto cuando sea requerido por ley
                </li>
                <li>
                  Implementamos medidas de seguridad técnicas y administrativas
                  para proteger sus datos personales
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Modificaciones</h2>
              <p className="mb-4">
                Nos reservamos el derecho de modificar estos términos y
                condiciones en cualquier momento. Los cambios entrarán en vigor
                inmediatamente después de su publicación en la plataforma. El
                uso continuado de AlcoZone después de cualquier modificación
                constituye la aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contacto</h2>
              <p className="mb-4">
                Para cualquier consulta sobre estos términos y condiciones, por
                favor contacte a nuestro equipo de soporte a través de los
                canales oficiales de comunicación.
              </p>
            </section>
            <div className="flex justify-center mt-8 mb-8">
              <ConfirmButtons
                variant="backToLogin"
                onClick={() => router.push("/auth/login")}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPage;
