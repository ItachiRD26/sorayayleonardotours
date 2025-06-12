import { generateProfessionalPDFBuffer } from "@/lib/pdf-buffer";
import { getReservationByCode } from "@/lib/get-reservation";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { reservationCode: string } }
) {
  const { reservationCode } = context.params;

  if (!reservationCode) {
    return new NextResponse("Missing reservation code", { status: 400 });
  }

  const reservation = await getReservationByCode(reservationCode);

  if (!reservation) {
    return new NextResponse("Reservation not found", { status: 404 });
  }

  const pdfBuffer = await generateProfessionalPDFBuffer(reservation);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${reservationCode}.pdf`,
    },
  });
}
