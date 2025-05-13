"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function TimePicker({
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
  selectedPeriod,
  setSelectedPeriod,
}: {
  selectedHour: number | null
  setSelectedHour: (value: number) => void
  selectedMinute: number | null
  setSelectedMinute: (value: number) => void
  selectedPeriod: "AM" | "PM"
  setSelectedPeriod: (value: "AM" | "PM") => void
}) {
  const [timeValue, setTimeValue] = useState("07:00")

  useEffect(() => {
    if (selectedHour !== null && selectedMinute !== null) {
      const hour24 =
  selectedPeriod === "PM" && selectedHour < 12
    ? selectedHour + 12
    : selectedPeriod === "AM" && selectedHour === 12
    ? 0
    : selectedHour;
      const formatted = `${hour24.toString().padStart(2, "0")}:${selectedMinute
        .toString()
        .padStart(2, "0")}`
      setTimeValue(formatted)
    }
  }, [selectedHour, selectedMinute, selectedPeriod])

const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const [hourStr, minuteStr] = e.target.value.split(":")
const hour24 = parseInt(hourStr);
const minute = parseInt(minuteStr);

const isPM = hour24 >= 12;
let hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
const period: "AM" | "PM" = isPM ? "PM" : "AM";

// ⛔ Validación AM: mínimo 7:00 AM
if (period === "AM" && hour24 < 7) {
  hour12 = 7;
  setSelectedHour(7);
  setSelectedMinute(0);
  setSelectedPeriod("AM");
  setTimeValue("07:00");
  return;
}

// ⛔ Validación PM: máximo 3:30 PM
if (period === "PM" && (hour12 > 3 || (hour12 === 3 && minute > 30))) {
  hour12 = 3;
  setSelectedHour(3);
  setSelectedMinute(30);
  setSelectedPeriod("PM");
  setTimeValue("15:30");
  return;
}


    setTimeValue(e.target.value)
    setSelectedHour(hour12)
    setSelectedMinute(minute)
    setSelectedPeriod(period)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Select Time</h2>

      <form className="max-w-[10rem] mx-auto w-full">
        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900">
          Choose time:
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="time"
            id="time"
            value={timeValue}
            onChange={handleTimeChange}
            min="07:00"
            max="15:30"
            required
            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Reservations must be between <strong>7:00 AM</strong> and <strong>3:30 PM</strong>.
      </p>
    </motion.div>
  )
}
