import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-2xl font-family-poppins hover:text-sea-light-custom transition-colors duration-300">
                Soraya y Leonardo Tours
              </span>
            </div>
            <p className="text-white mb-4">
              Ofreciendo las mejores excursiones en bote desde 2010. Experiencias únicas en el mar para toda la familia.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-sea-light-custom transition-colors duration-300">
                <Image
                  src="/images/facebook-line-icon-white.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="h-6 w-6 hover:scale-110 transition-transform duration-300"
                />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-sea-light-custom transition-colors duration-300">
                <Image
                  src="/images/instagram-line-icon-white.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="h-6 w-6 hover:scale-110 transition-transform duration-300"
                />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white hover:text-sea-light-custom transition-colors duration-300">
                <Image
                  src="/images/tiktok-line-icon-white.png"
                  alt="TikTok"
                  width={24}
                  height={24}
                  className="h-6 w-6 hover:scale-110 transition-transform duration-300"
                />
                <span className="sr-only">TikTok</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-family-poppins hover:text-sea-light-custom transition-colors duration-300">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-sea-light-custom transition-colors duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/excursiones" className="text-white hover:text-sea-light-custom transition-colors duration-300">
                  Excursiones
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-white hover:text-sea-light-custom transition-colors duration-300">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-white hover:text-sea-light-custom transition-colors duration-300">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Tours */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-family-poppins hover:text-sea-light-custom transition-colors duration-300">
              Nuestras Excursiones
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/excursiones/snorkel"
                  className="text-white hover:text-sea-light-custom transition-colors duration-300"
                >
                  Tour de Snorkel
                </Link>
              </li>
              <li>
                <Link
                  href="/excursiones/atardecer"
                  className="text-white hover:text-sea-light-custom transition-colors duration-300"
                >
                  Paseo al Atardecer
                </Link>
              </li>
              <li>
                <Link href="/excursiones/pesca" className="text-white hover:text-sea-light-custom transition-colors duration-300">
                  Pesca Deportiva
                </Link>
              </li>
              <li>
                <Link
                  href="/excursiones/privados"
                  className="text-white hover:text-sea-light-custom transition-colors duration-300"
                >
                  Tours Privados
                </Link>
              </li>
              <li>
                <Link
                  href="/excursiones/grupos"
                  className="text-white hover:text-sea-light-custom transition-colors duration-300"
                >
                  Grupos y Eventos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-family-poppins hover:text-sea-light-custom transition-colors duration-300">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Image
                  src="/images/location-icon-white.png"
                  alt="Map Pin"
                  width={24}
                  height={24}
                  className="text-sea-light-custom mr-2 self-start hover:scale-110 transition-transform duration-300"
                />
                <span className="text-white">
                  Playa Juan de Bolanos, Bugalow #3 Montecristi, Republica Dominicana
                </span>
              </li>
              <li className="flex items-start">
                <Image
                  src="/images/phone-icon-white.png"
                  alt="Phone"
                  width={24}
                  height={24}
                  className="text-sea-light-custom mr-2 self-start hover:scale-110 transition-transform duration-300"
                />
                <span className="text-white">+1-809-961-6343/+1-809-962-2259</span>
              </li>
              <li className="flex items-start">
                <Image
                  src="/images/mail-icon-white.png"
                  alt="Mail"
                  width={24}
                  height={24}
                  className="text-sea-light-custom mr-2 self-start hover:scale-110 transition-transform duration-300"
                />
                <span className="text-white">administracion@sorayayleonardotours.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-white text-sm">
          <p className="hover:text-sea-light-custom transition-colors duration-300">
            &copy; {new Date().getFullYear()} Soraya y Leonardo Tours. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}