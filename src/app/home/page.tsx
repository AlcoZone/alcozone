"use client";
import { AuthGuard } from "@/components/AuthGuard/AuthGuard";

export default function HomePage() {
  return (
    <AuthGuard>
      <div>hola, esto es una página protegida</div>
    </AuthGuard>
  );
}