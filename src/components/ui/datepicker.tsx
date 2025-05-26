"use client"
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
  if (selectedDate && selectedDate.getTime() < minDate.getTime()) {
    setSelectedDate(null);
  }
}, [selectedDate, minDate, setSelectedDate]);

  return (
    <div className="flex flex-col items-center">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={minDate}
        dateFormat="yyyy-MM-dd"
        inline
        className="text-center"
        wrapperClassName="!block"
        calendarClassName="border border-blue-200 shadow-sm !font-sans"
        dayClassName={(date) =>
          date.getDay() === 0 || date.getDay() === 6
            ? "text-blue-500 hover:bg-blue-100"
            : ""
        }
      />
    </div>
  )
}

function getMinDate(): Date {
  const date = new Date()
  date.setDate(date.getDate() + 2) // Mínimo 48 horas
  return date
}
