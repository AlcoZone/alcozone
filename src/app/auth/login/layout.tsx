"use client";
import { Banner } from "@/components/Banner/Banner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Banner />
    </>
  );
}
