export default function PoliticaDeReembolsosPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">Política de Reembolsos</h1>
      <p className="mb-6 text-lg text-gray-700 text-center">
        Nuestra prioridad es ofrecer un servicio justo y transparente. Estas son nuestras políticas de reembolso y reprogramación:
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">🟢 Reembolsos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cancelaciones con al menos <strong>72 horas de anticipación</strong>.</li>
          <li>Cancelación del tour por parte de la empresa por condiciones climáticas u otros factores externos.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">🕐 Posposición de Fecha</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Solicitada con al menos <strong>48 horas de anticipación</strong>, sujeta a disponibilidad.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-3">🔴 Casos No Reembolsables</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>No presentarse el día del tour.</li>
          <li>Cancelaciones realizadas con menos de 72 horas de anticipación.</li>
          <li>Retrasos que impidan la salida programada.</li>
        </ul>
      </section>

      <p className="text-center text-base mt-6 text-gray-700">
        Si ocurre algún imprevisto, podemos coordinar una nueva fecha para tu tour según disponibilidad.
      </p>
    </main>
  );
}
