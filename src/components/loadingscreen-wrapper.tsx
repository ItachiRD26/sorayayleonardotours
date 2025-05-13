"use client"; // Marca este componente como un Client Component

import React, { useState, useEffect } from "react";
import LoadingScreen from "@/components/loadingscreen";

export default function LoadingScreenWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga (puedes ajustar esto según tus necesidades)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de carga

    return () => clearTimeout(timer); // Limpia el timer al desmontar el componente
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      {!isLoading && children}
    </>
  );
}