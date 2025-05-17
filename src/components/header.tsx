"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll hacia abajo
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-transform duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.webp"
              alt="Logo de la empresa"
              width={200}
              height={200}
              className="w-50 h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/excursiones"
              className="text-lg font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
            >
              Excursiones
            </Link>
            <Link
              href="/sobre-nosotros"
              className="text-lg font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/contacto"
              className="text-lg font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
            >
              Contacto
            </Link>
          </nav>

          {/* CTA Button and Social Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Social Icons */}
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/sorayayleonardo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
              >
                <Image
                  src="/images/facebook-icon.webp"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="h-8 w-8"
                />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/sorayayleonardotours/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
              >
                <Image
                  src="/images/instagram-icon.webp"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="h-8 w-8"
                />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.tiktok.com/@sorayaleonardotou"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
              >
                <Image
                  src="/images/tiktok-icon.webp"
                  alt="TikTok"
                  width={24}
                  height={24}
                  className="h-8 w-8"
                />
                <span className="sr-only">TikTok</span>
              </Link>
            </div>

            {/* CTA Button */}
            <Link
  href="/excursiones/reservas?tourId=1&name=Banco%20de%20Arena%20Gran%20Grosier&description=Descubre%20un%20paraíso%20escondido%20en%20medio%20del%20océano%3A%20el%20Banco%20de%20Arena%20Grand%20Grossier.%20Este%20banco%20de%20arena%2C%20rodeado%20por%20aguas%20cristalinas%20y%20poco%20profundas%2C%20es%20perfecto%20para%20relajarse%2C%20nadar%20y%20tomar%20fotografías%20inolvidables.%20Un%20lugar%20ideal%20para%20escapar%20del%20bullicio%20y%20conectar%20con%20la%20naturaleza%20en%20su%20estado%20más%20puro.&price=25&image=%2Fimages%2Fgran-grocier.webp&duration=4%20horas"
>
  <Button variant="default" className="font-bold">
    Reservar Ahora
  </Button>
</Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/excursiones"
                className="text-sm font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Excursiones
              </Link>
              <Link
                href="/sobre-nosotros"
                className="text-sm font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link
                href="/contacto"
                className="text-sm font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link
  href="/excursiones/reservas?tourId=1&name=Banco%20de%20Arena%20Gran%20Grosier&description=Descubre%20un%20paraíso%20escondido%20en%20medio%20del%20océano%3A%20el%20Banco%20de%20Arena%20Grand%20Grossier.%20Este%20banco%20de%20arena%2C%20rodeado%20por%20aguas%20cristalinas%20y%20poco%20profundas%2C%20es%20perfecto%20para%20relajarse%2C%20nadar%20y%20tomar%20fotografías%20inolvidables.%20Un%20lugar%20ideal%20para%20escapar%20del%20bullicio%20y%20conectar%20con%20la%20naturaleza%20en%20su%20estado%20más%20puro.&price=25&image=%2Fimages%2Fgran-grocier.webp&duration=4%20horas"
>
  <Button variant="default" className="font-bold">
    Reservar Ahora
  </Button>
</Link>


              {/* Social Icons in Mobile Menu */}
              <div className="flex space-x-4 pt-4">
                <Link
                  href="https://www.facebook.com/sorayayleonardo/"
                  className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
                >
                  <Image
                    src="/images/facebook-icon.webp"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="https://www.instagram.com/sorayayleonardotours/"
                  className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
                >
                  <Image
                    src="/images/instagram-icon.webp"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://www.tiktok.com/@sorayaleonardotou"
                  className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
                >
                  <Image
                    src="/images/tiktok-icon.webp"
                    alt="TikTok"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="sr-only">TikTok</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}