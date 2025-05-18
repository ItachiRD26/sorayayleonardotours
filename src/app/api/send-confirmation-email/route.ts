import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validación básica
    if (!data?.email || !data?.name || !data?.reservationCode) {
      console.warn("❌ Datos incompletos para el envío de correo:", data);
      return NextResponse.json({ error: 'Faltan datos requeridos para enviar el correo' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const clientName = data.name?.split?.(" ")?.[0] || "Cliente";

    const adminMailOptions = {
      from: `"Soraya y Leonardo Tours" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Nueva reserva: ${data.name} (${data.reservationCode})`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1e293b;">📥 Nueva reserva recibida</h2>
          <p style="font-size: 15px;"><strong>Código de reserva:</strong> ${data.reservationCode}</p>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Teléfono:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Tour:</strong> ${data.tourName}</p>
          <p><strong>Fecha:</strong> ${data.selectedDate}</p>
          <p><strong>Hora:</strong> ${data.selectedTime}</p>
          <p><strong>Adultos:</strong> ${data.adults}</p>
          <p><strong>Niños:</strong> ${data.children}</p>
          <hr style="margin: 20px 0;" />
          <p style="font-size: 14px; color: #475569;">
            Puedes contactar al cliente directamente o revisar el panel interno para más detalles.
          </p>
        </div>
      `,
    };

    const clientMailOptions = {
      from: `"Soraya y Leonardo Tours" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Confirmación de tu reserva",
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 30px;">
    <!-- LOGO CENTRADO -->
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://sorayayleonardotours.com/images/logo.png" alt="Logo Soraya y Leonardo Tours" style="height: 60px;" />
    </div>

    <div style="background-color: #ffffff; padding: 25px 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h2 style="color: #0f172a; text-align: center;">¡Gracias por tu reserva, ${clientName}!</h2>

      <p style="font-size: 15px; margin-top: 20px;"><strong>Código de Reserva:</strong> ${data.reservationCode}</p>
      <p><strong>Tour:</strong> ${data.tourName}</p>
      <p><strong>Fecha:</strong> ${data.selectedDate}</p>
      <p><strong>Hora:</strong> ${data.selectedTime}</p>
      <p><strong>Adultos:</strong> ${data.adults}</p>
      <p><strong>Niños:</strong> ${data.children}</p>

      <hr style="margin: 20px 0;" />

      <p style="font-size: 14px; color: #334155;">
        Te esperamos en el punto de encuentro a la hora acordada. No olvides presentarte con anticipación.
      </p>

      <p style="font-size: 13px; color: #64748b; margin-top: 10px;">
        Si tienes alguna duda, puedes contactarnos directamente en WhatsApp.
      </p>

      <!-- BOTÓN WHATSAPP -->
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://wa.me/18099616343" target="_blank" style="text-decoration: none;">
          <button style="
            background-color: #25d366;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          ">
            <img src="https://www.sorayayleonardotours.com/images/whatsapp-icon.png" alt="WhatsApp" width="20" height="20" />
            WhatsApp
          </button>
        </a>
      </div>
    </div>
  </div>
`,

    };

    const [adminResult, clientResult] = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    if (adminResult.status === "rejected") {
      console.error("❌ Error al enviar correo al administrador:", adminResult.reason);
    }
    if (clientResult.status === "rejected") {
      console.error("❌ Error al enviar correo al cliente:", clientResult.reason);
    }

    if (adminResult.status === "fulfilled" && clientResult.status === "fulfilled") {
      console.log("✅ Correos enviados correctamente a:", data.email);
      return NextResponse.json({ message: 'Correos enviados' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Uno o ambos correos fallaron' }, { status: 500 });
    }

  } catch (error) {
    console.error("❌ Error general al procesar envío de correos:", error);
    return NextResponse.json({ error: 'Fallo inesperado al enviar correos' }, { status: 500 });
  }
}
