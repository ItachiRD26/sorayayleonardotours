import { NextRequest, NextResponse } from "next/server";
import { generateProfessionalPDFBuffer } from "@/lib/pdf-buffer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: any) {
  const code = context.params.reservationCode;
  const raw = req.nextUrl.searchParams.get("data");

  if (!raw) {
    return new NextResponse("Missing reservation data", { status: 400 });
  }

  try {
    const decoded = decodeURIComponent(raw);
    const reservation = JSON.parse(decoded);

    const pdfBuffer = await generateProfessionalPDFBuffer(reservation);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Factura-${code}.pdf`,
      },
    });
  } catch {
    return new NextResponse("Invalid or corrupt data", { status: 500 });
  }
}
