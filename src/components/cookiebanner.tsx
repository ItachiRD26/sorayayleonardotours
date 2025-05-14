"use client"; // Asegúrate de que este componente sea del lado del cliente

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verifica si el usuario ya ha aceptado las cookies
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      setShowBanner(true); // Muestra el banner si no ha aceptado las cookies
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true"); // Guarda la preferencia del usuario
    setShowBanner(false); // Oculta el banner
  };

  if (!showBanner) return null; // No muestra el banner si el usuario ya ha aceptado las cookies

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-700 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50">
      <div className="text-sm mb-4 md:mb-0">
        Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Al continuar, aceptas el uso de cookies.
      </div>
      <Button
        variant="default"
        onClick={handleAcceptCookies}
        className="bg-blue-500 text-white hover:bg-primary-custom/90 animate-pulse"
      >
        Aceptar cookies
      </Button>
    </div>
  );
}