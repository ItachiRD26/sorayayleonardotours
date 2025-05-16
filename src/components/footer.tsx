import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a2540] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-3">Soraya y Leonardo Tours</h2>
          <p className="text-sm text-gray-300">
            Desde 2002 ofreciendo experiencias únicas en el mar para toda la familia.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Explora</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/excursiones">Excursiones</Link></li>
            <li><Link href="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Legales</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/terminos-y-condiciones">Términos y Condiciones</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contacto</h3>
          <p className="text-sm text-gray-300 mb-2">Montecristi, R.D.</p>
          <p className="text-sm text-gray-300 mb-2">+1-809-961-6343 / +1-809-962-2259</p>
          <p className="text-sm text-gray-300">administracion@sorayayleonardotours.com</p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Soraya y Leonardo Tours. Todos los derechos reservados.
      </div>
    </footer>
  );
}
