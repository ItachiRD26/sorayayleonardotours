export default function PoliticaDePrivacidadPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">🔒 Política de Privacidad</h1>
      <p className="mb-6 text-lg text-center text-gray-700">
        Tu privacidad es importante para nosotros. Esta política detalla cómo recopilamos, usamos y protegemos tu información.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">📥 Datos que recopilamos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>📧 Nombre, correo electrónico y número de teléfono para gestionar tu reserva.</li>
          <li>🗓️ Fecha y hora del tour reservado.</li>
          <li>🌐 Dirección IP y datos de navegación (si aplica).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">🔐 Cómo protegemos tus datos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>🔒 Utilizamos protocolos seguros (HTTPS) en toda la web.</li>
          <li>🛡️ No compartimos tu información con terceros sin tu consentimiento explícito.</li>
          <li>🗑️ Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">✉️ Contacto</h2>
        <p className="text-gray-700">
          Para preguntas o solicitudes relacionadas con tu privacidad, puedes contactarnos por correo a:{" "}
          <strong>administracion@sorayayleonardotours.com</strong>
        </p>
      </section>
    </main>
  );
}
