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
              src="/images/logo.png"
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
                href="#"
                className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300 animate-bounce"
              >
                <Image
                  src="/images/facebook-icon.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="h-8 w-8"
                />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300 animate-bounce"
              >
                <Image
                  src="/images/instagram-icon.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="h-8 w-8"
                />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300 animate-bounce"
              >
                <Image
                  src="/images/tiktok-icon.png"
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
  href="/excursiones/reservas?tourId=1&name=Playa%20Gran%20Grosier&description=Explora%20los%20arrecifes%20de%20coral%20y%20nada%20entre%20peces%20tropicales%20en%20una%20de%20las%20playas%20más%20hermosas%20de%20Montecristi.&price=25&image=%2Fimages%2Fgran-grocier.jpg&duration=4%20hours"
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
  href="/excursiones/reservas?tourId=1&name=Playa%20Gran%20Grosier&description=Explora%20los%20arrecifes%20de%20coral%20y%20nada%20entre%20peces%20tropicales%20en%20una%20de%20las%20playas%20más%20hermosas%20de%20Montecristi.&price=25&image=%2Fimages%2Fgran-grocier.jpg&duration=4%20hours"
>
  <Button variant="default" className="font-bold">
    Reservar Ahora
  </Button>
</Link>


              {/* Social Icons in Mobile Menu */}
              <div className="flex space-x-4 pt-4">
                <Link
                  href="#"
                  className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
                >
                  <Image
                    src="/images/facebook-icon.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
                >
                  <Image
                    src="/images/instagram-icon.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
                >
                  <Image
                    src="/images/tiktok-icon.png"
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