"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PaypalButtonProps {
  amount: number;
  tourData: {
    name: string;
    email: string;
    phone: string;
    tourName: string;
    selectedDate: string;
    selectedTime: string;
    adults: number;
    children: number;
  };
}

export default function PaypalButton({ amount, tourData }: PaypalButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleApprove = async (orderID: string) => {
    try {
      setLoading(true);

      // Guarda en localStorage para la página /success
      const reservationCode = `R-${Date.now().toString().slice(-5)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const reservationData = {
        reservationCode,
        ...tourData,
      };

      localStorage.setItem("reservationData", JSON.stringify(reservationData));

      // Llamadas al backend
      await fetch("/api/create-calendar-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tourData),
      });

      await fetch("/api/send-confirmation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tourData),
      });

      router.push("/excursiones/reservas/success");
    } catch (error) {
      console.error("Error al procesar reserva:", error);
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center rounded-xl">
          <div className="text-primary font-semibold animate-pulse text-sm">Procesando pago...</div>
        </div>
      )}

      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                  currency_code: "USD",
                },
              },
            ],
            intent: "CAPTURE",
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            await actions.order.capture();
            handleApprove(data.orderID!);
          }
        }}
      />
    </div>
  );
}
