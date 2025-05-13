"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TimePicker({
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
  selectedPeriod,
  setSelectedPeriod,
}: {
  selectedHour: number | null;
  setSelectedHour: (value: number) => void;
  selectedMinute: number | null;
  setSelectedMinute: (value: number) => void;
  selectedPeriod: "AM" | "PM";
  setSelectedPeriod: (value: "AM" | "PM") => void;
}) {
  const [hours, setHours] = useState<number[]>([]);

  useEffect(() => {
    // Inicializar horas en formato 1-12
    setHours([8, 9, 10, 11, 12, 1, 2, 3]);
  }, []);

  const handlePeriodChange = (value: "AM" | "PM") => {
    setSelectedPeriod(value);

    // Validación: en PM no puedes pasar de 3:30 PM
    if (value === "PM" && selectedHour && selectedHour > 3) {
      setSelectedHour(3);
      if (selectedMinute && selectedMinute > 30) {
        setSelectedMinute(30);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Select Time</h2>

      <div className="flex flex-col gap-4">
        {/* Hours */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Hour</label>
          <select
            value={selectedHour ?? ""}
            onChange={(e) => setSelectedHour(parseInt(e.target.value))}
            className="border rounded-lg p-2"
          >
            <option value="">Select hour</option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>

        {/* Minutes */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Minutes</label>
          <select
            value={selectedMinute ?? ""}
            onChange={(e) => setSelectedMinute(parseInt(e.target.value))}
            className="border rounded-lg p-2"
          >
            <option value="">Select minutes</option>
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>
                {i.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        {/* AM/PM */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">AM/PM</label>
          <select
            value={selectedPeriod}
            onChange={(e) => handlePeriodChange(e.target.value as "AM" | "PM")}
            className="border rounded-lg p-2"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        PM reservations must not exceed 3:30 PM.
      </p>
    </motion.div>
  );
}
