"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

export default function DatePickerComponent({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}) {
  const today = new Date();
  const minSelectableDate = new Date();
  minSelectableDate.setDate(today.getDate() + 2); // 48 horas = 2 días

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Select Date</h2>

      <div className="flex justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={minSelectableDate}
          inline // 🎯 Esto hace que el calendario ya se vea abierto
          calendarStartDay={1} // Opcional: semana empieza lunes
          className="w-full"
        />
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Reservations must be made at least 48 hours in advance.
      </p>
    </motion.div>
  );
}
