import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <h2>🎉 Reserva Confirmada</h2>
      <p><strong>Cliente:</strong> ${data.name}</p>
      <p><strong>Teléfono:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Tour:</strong> ${data.tourName}</p>
      <p><strong>Fecha:</strong> ${data.selectedDate}</p>
      <p><strong>Hora:</strong> ${data.selectedTime}</p>
      <p><strong>Adultos:</strong> ${data.adults}</p>
      <p><strong>Niños:</strong> ${data.children}</p>
    `;

    // ✅ Correo al administrador
    await transporter.sendMail({
      from: `"Reservas Soraya & Leonardo" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Nueva reserva: ${data.name}`,
      html: htmlContent,
    });

    // ✅ Correo al cliente
    await transporter.sendMail({
      from: `"Soraya & Leonardo Tours" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Confirmación de tu reserva",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3f4f6; border-radius: 10px;">
    <div style="text-align: center;">
      <img src="https://sorayayleonardotours.com/images/logo.webp" alt="Soraya & Leonardo Tours" style="max-width: 150px; margin-bottom: 20px;" />
      <h2 style="color: #0a2540;">🎉 ¡Gracias por tu reserva, ${data.name}!</h2>
    </div>

    <p style="font-size: 16px; color: #333;">Hemos recibido tu reserva con los siguientes detalles:</p>

    <ul style="list-style: none; padding: 0; font-size: 15px; color: #444;">
      <li><strong>Tour:</strong> ${data.tourName}</li>
      <li><strong>Fecha:</strong> ${data.selectedDate}</li>
      <li><strong>Hora:</strong> ${data.selectedTime}</li>
      <li><strong>Adultos:</strong> ${data.adults}</li>
      <li><strong>Niños:</strong> ${data.children}</li>
    </ul>

    <p style="font-size: 15px; color: #333;">
      Si tienes alguna duda o deseas realizar cambios, puedes contactarnos directamente por WhatsApp:
    </p>

    <div style="text-align: center; margin: 20px 0;">
      <a href="https://wa.me/18099616343" target="_blank" style="display: inline-block; background-color: #25d366; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        💬 Escribir por WhatsApp
      </a>
    </div>

    <p style="font-size: 14px; color: #666; text-align: center;">
      Te contactaremos pronto para confirmar todos los detalles.<br />
      <br />
      — Equipo de Soraya & Leonardo Tours
    </p>
  </div>
`,
    });

    return NextResponse.json({ message: "Correos enviados con éxito." }, { status: 200 });
  } catch (error) {
    console.error("Error al enviar correos:", error);
    return NextResponse.json({ message: "Error al enviar correos." }, { status: 500 });
  }
}
