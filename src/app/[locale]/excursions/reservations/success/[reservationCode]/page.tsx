// src/app/[locale]/excursions/reservations/success/[reservationCode]/page.tsx

import { getReservationByCode } from "@/lib/get-reservation";
import SuccessClient from "@/components/success-client";

export default async function SuccessPage({
  params,
}: {
  params: { locale: string; reservationCode: string };
}) {
  const reservation = await getReservationByCode(params.reservationCode);

  if (!reservation) {
    return (
      <div className="text-center py-24 text-red-600 font-bold">
        Reserva no encontrada
      </div>
    );
  }

  return <SuccessClient reservation={reservation} locale={params.locale} />;
}
