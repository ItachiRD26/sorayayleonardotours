"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "next-intl"; // ✅ importar el locale actual

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
  const locale = useLocale(); // ✅ idioma actual
  const [loading] = useState(false);

  const handleApprove = async () => {
    try {
      const reservationCode = `R-${Date.now().toString().slice(-5)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const reservationData = { reservationCode, ...tourData, amount, locale };
      localStorage.setItem("reservationData", JSON.stringify(reservationData));

      const [res1, res2] = await Promise.allSettled([
        fetch("/api/create-calendar-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tourData),
        }),
        fetch("/api/send-confirmation-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservationData),
        }),
      ]);

      const warnings = {
        calendarFailed: res1.status === "rejected",
        emailFailed: res2.status === "rejected",
      };
      localStorage.setItem("reservationWarnings", JSON.stringify(warnings));

      router.push(`/${locale}/excursions/reservations/success`);
    } catch (error) {
      console.error("Error inesperado al procesar reserva:", error);
      router.push(`/${locale}/excursions/reservations/error`);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center rounded-xl">
          <div className="text-primary font-semibold animate-pulse text-sm">
            Procesando pago...
          </div>
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
          if (!actions.order) return;

          try {
            const captured = await actions.order.capture();
            console.log("Orden capturada:", captured);

          
            router.push(`/${locale}/excursions/reservations/loading`);

          
          await handleApprove();
          } catch (error) {
            console.error("Error después de capturar orden:", error);
            router.push(`/${locale}/excursions/reservations/error`);
          }
        }}
      />
    </div>
  );
}