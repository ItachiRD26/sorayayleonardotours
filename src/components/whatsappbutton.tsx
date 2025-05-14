"use client"; // Asegúrate de que este componente sea del lado del cliente

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Para obtener la ruta actual

export default function WhatsAppButton() {
  const [isReservasPage, setIsReservasPage] = useState(false);
  const pathname = usePathname(); // Obtiene la ruta actual

  useEffect(() => {
    // Verifica si la ruta actual es /excursiones/reservas
    if (pathname === "/excursiones/reservas") {
      setIsReservasPage(true);
    } else {
      setIsReservasPage(false);
    }
  }, [pathname]);

  return (
    <div
      className={`fixed bottom-8 ${
        isReservasPage ? "left-8" : "right-8" // Cambia la posición según la ruta
      } z-50`}
    >
      <a
        href="https://wa.me/18099616343" // Reemplaza con tu número de WhatsApp
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 animate-bounce" // Añade animate-bounce aquí
      >
        <Image
          src="/images/whatsapp-icon.webp" // Asegúrate de tener este ícono en tu carpeta de imágenes
          alt="WhatsApp"
          width={32}
          height={32}
          className="text-white"
        />
      </a>
    </div>
  );
}