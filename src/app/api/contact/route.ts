import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const htmlContent = `
      <h2>📩 Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `

    await transporter.sendMail({
      from: `"Formulario de contacto" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Nuevo mensaje de ${name}`,
      html: htmlContent,
    })

    return NextResponse.json({ message: "Mensaje enviado con éxito." }, { status: 200 })
  } catch (error) {
    console.error("Error al enviar mensaje de contacto:", error)
    return NextResponse.json({ message: "Error al enviar mensaje." }, { status: 500 })
  }
}
