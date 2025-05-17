"use client"
import DatePickerClient from "./date-picker-client"

export default function DatePickerWrapper({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
}) {
  return <DatePickerClient selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
}
