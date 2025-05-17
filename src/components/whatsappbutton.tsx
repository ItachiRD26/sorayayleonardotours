'use client';

import Image from 'next/image';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative group">
        {/* Burbuja de chat con cola */}
        <div className="absolute right-full mr-3 bottom-1/2 translate-y-1/2 bg-white text-gray-700 text-sm font-medium px-5 py-3 rounded-xl shadow-xl hidden group-hover:flex items-center gap-2 chat-bubble transition-all duration-300">
          <span className="whitespace-nowrap">💬 Contáctanos ahora</span>
        </div>

        {/* Botón de WhatsApp */}
        <a
          href="https://wa.me/18099616343"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          <Image
            src="/images/whatsapp-icon.webp"
            alt="WhatsApp"
            width={32}
            height={32}
          />
        </a>
      </div>
    </div>
  );
}
