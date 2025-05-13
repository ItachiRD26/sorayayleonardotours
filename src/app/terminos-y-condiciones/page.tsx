export default function TerminosYCondicionesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">📄 Términos y Condiciones</h1>
      <p className="mb-6 text-lg leading-relaxed text-center text-gray-700">
        Estos términos rigen el uso de nuestros servicios. Al reservar un tour con nosotros, aceptas las condiciones detalladas a continuación.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">✅ Participación Responsable</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>🚤 Los participantes deben seguir en todo momento las instrucciones del personal.</li>
          <li>🛟 Se requiere el uso del equipo de seguridad provisto durante todo el tour.</li>
          <li>❌ El incumplimiento de normas puede resultar en la expulsión sin derecho a reembolso.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">📅 Reservas</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>📨 Las reservas están sujetas a disponibilidad y serán confirmadas por correo electrónico.</li>
          <li>💵 Los precios pueden variar sin previo aviso según temporada o demanda.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">📌 Condiciones Adicionales</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>👨‍👩‍👧‍👦 Algunos tours pueden tener requisitos de edad o condición física.</li>
          <li>🕒 Se recomienda llegar al punto de encuentro con al menos 15 minutos de antelación.</li>
        </ul>
      </section>
    </main>
  );
}
