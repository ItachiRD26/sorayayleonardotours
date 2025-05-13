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
        <h2>Gracias por reservar con nosotros, ${data.name}!</h2>
        <p>Hemos recibido tu reserva para:</p>
        <p><strong>Tour:</strong> ${data.tourName}</p>
        <p><strong>Fecha:</strong> ${data.selectedDate}</p>
        <p><strong>Hora:</strong> ${data.selectedTime}</p>
        <p>Te contactaremos pronto para confirmar todos los detalles.</p>
        <br/>
        <p>Equipo de Soraya & Leonardo Tours</p>
      `,
    });

    return NextResponse.json({ message: "Correos enviados con éxito." }, { status: 200 });
  } catch (error) {
    console.error("Error al enviar correos:", error);
    return NextResponse.json({ message: "Error al enviar correos." }, { status: 500 });
  }
}
