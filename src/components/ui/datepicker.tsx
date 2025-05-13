"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Datepicker from "flowbite-datepicker/Datepicker";

export default function FlowbiteInlineDatepicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}) {
  const datepickerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const minDate = getMinDate();
  const element = datepickerRef.current;

  if (element) {
    element.innerHTML = "";
  }

  new Datepicker(element!, {
    autohide: true,
    format: "yyyy-mm-dd",
    defaultDate: selectedDate ?? minDate,
    minDate,
    inline: true,
  });

  const handleChange = (event: Event) => {
    const customEvent = event as CustomEvent;
    setSelectedDate(customEvent.detail.date);
  };

  element?.addEventListener("changeDate", handleChange);

  return () => {
    if (element) {
      element.innerHTML = "";
      element.removeEventListener("changeDate", handleChange);
    }
  };
}, [selectedDate, setSelectedDate]);

 // funciona bien como está

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Select Date</h2>

      <div className="flex justify-center">
        <div ref={datepickerRef} className="z-10" />
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Reservations must be made at least 48 hours in advance.
      </p>
    </motion.div>
  );
}

function getMinDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date;
}
