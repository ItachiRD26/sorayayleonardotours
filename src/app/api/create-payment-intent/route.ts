import { NextResponse } from "next/server";
import Stripe from "stripe";

// Configura Stripe con la versión específica
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Usa la versión específica
});

export async function POST(request: Request) {
  const { amount } = await request.json();

  try {
    // Crear un PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Monto en centavos
      currency: "usd", // Puedes cambiarlo a "dop" si Stripe lo soporta
      metadata: {
        integration_check: "accept_a_payment", // Metadata opcional
      },
    });

    // Devolver el clientSecret al cliente
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error al crear el PaymentIntent:", error);
    return NextResponse.json(
      { error: "Error al procesar el pago" },
      { status: 500 }
    );
  }
}