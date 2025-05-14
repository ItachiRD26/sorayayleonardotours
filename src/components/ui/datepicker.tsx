"use client"

import { motion } from "framer-motion"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useEffect } from "react"

export default function CustomDatePicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
}) {
  const minDate = getMinDate()

  useEffect(() => {
    if (
      selectedDate &&
      selectedDate.getTime() < minDate.getTime()
    ) {
      setSelectedDate(null) // borra fechas inválidas por si el usuario retrocede
    }
  }, [selectedDate])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Selecciona una fecha</h2>

      <div className="flex justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={minDate}
          dateFormat="yyyy-MM-dd"
          inline
          className="text-center"
        />
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Las reservas deben hacerse con mínimo 48 horas de anticipación.
      </p>
    </motion.div>
  )
}

function getMinDate(): Date {
  const date = new Date()
  date.setDate(date.getDate() + 2)
  return date
}
