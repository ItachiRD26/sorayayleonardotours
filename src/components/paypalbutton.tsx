"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "next-intl";
import { saveReservation } from "@/lib/save-reservation";
import { getFirebaseDatabase } from "@/lib/firebase";
import { ref, get } from "firebase/database";

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
    children: { age: number }[];
  };
}

export default function PaypalButton({ amount, tourData }: PaypalButtonProps) {
  const router = useRouter();
  const locale = useLocale();
  const [loading] = useState(false);

  const handleApprove = async () => {
    try {
      router.push(`/${locale}/excursions/reservations/loading`);

      const reservationCode = `R-${Date.now().toString().slice(-5)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      const reservationData = {
        reservationCode,
        ...tourData,
        amount,
        locale,
      };

      localStorage.setItem("reservationData", JSON.stringify(reservationData));

      await saveReservation({
        ...reservationData,
        children: tourData.children,
      });

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

      // 🔁 Esperar a que Firebase propague el dato antes de redirigir
      const db = getFirebaseDatabase();
      const maxRetries = 5;
      let confirmed = false;

      for (let i = 0; i < maxRetries; i++) {
        const snapshot = await get(ref(db, "reservations/" + reservationCode));
        if (snapshot.exists()) {
          confirmed = true;
          break;
        }
        await new Promise((res) => setTimeout(res, 800)); // esperar 800ms
      }

      if (!confirmed) {
        console.error("⚠️ Firebase aún no devolvió la reserva tras varios intentos");
        router.push(`/${locale}/excursions/reservations/error`);
      } else {
        router.push(`/${locale}/excursions/reservations/success/${reservationCode}`);
      }

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
