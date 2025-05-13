"use client";

import { motion } from "framer-motion";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalButton from "../paypalbutton";

interface PaymentCardProps {
  name: string;
  email: string;
  phone: string;
  tourName: string;
  adults: number;
  children: { age: number }[];
  selectedDate: Date | null;
  selectedHour: string;
  selectedMinute: string;
  selectedPeriod: "AM" | "PM";
  price: number;
  pricingNote?: string;
}

export default function PaymentCard({
  name,
  email,
  phone,
  tourName,
  adults,
  children,
  selectedDate,
  selectedHour,
  selectedMinute,
  selectedPeriod,
  price,
  pricingNote,
}: PaymentCardProps) {
  const total = price.toFixed(2);

  const formatDate = () => {
    if (!selectedDate) return "Fecha no especificada";
    return selectedDate.toLocaleDateString();
  };

  const formatTime = () => {
    const validHour = selectedHour?.trim();
    const validMinute = selectedMinute?.trim();

    if (!validHour || !validMinute) return "Hora no especificada";
    return `${validHour.padStart(2, "0")}:${validMinute.padStart(2, "0")} ${selectedPeriod}`;
  };

  const isPaymentDisabled = () => {
    return (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      !selectedDate ||
      !selectedHour ||
      !selectedMinute
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Your Reservation
      </h2>

      <div className="space-y-4 text-gray-700 text-center mb-6">
        <p><strong>Tour:</strong> {tourName}</p>
        <p><strong>Date:</strong> {formatDate()}</p>
        <p><strong>Time:</strong> {formatTime()}</p>
        <p><strong>Adults:</strong> {adults}</p>
        <p><strong>Children:</strong> {children.length}</p>
        {pricingNote && (
          <p className="text-sm text-blue-600">{pricingNote}</p>
        )}
        <p className="text-xl font-bold mt-4">
          Total: ${total} USD
        </p>
      </div>

      <PayPalScriptProvider options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "USD",
        locale: "en_US",
        components: "buttons",
      }}>
        <div className={isPaymentDisabled() ? "opacity-50 pointer-events-none" : "opacity-100"}>
          <PaypalButton
            amount={parseFloat(total)}
            tourData={{
              name,
              email,
              phone,
              tourName,
              selectedDate: formatDate(),
              selectedTime: formatTime(),
              adults,
              children: children.length,
            }}
          />
        </div>
      </PayPalScriptProvider>
    </motion.div>
  );
}
