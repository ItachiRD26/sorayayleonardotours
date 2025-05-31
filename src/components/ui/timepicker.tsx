"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

export default function TimePicker({
  tourName,
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
  selectedPeriod,
  setSelectedPeriod,
}: {
  tourName: string
  selectedHour: number | null
  setSelectedHour: (value: number) => void
  selectedMinute: number | null
  setSelectedMinute: (value: number) => void
  selectedPeriod: "AM" | "PM"
  setSelectedPeriod: (value: "AM" | "PM") => void
}) {
  const t = useTranslations("Reservations")
  const [timeValue, setTimeValue] = useState("07:00")

  const tourKey = tourName.trim().toLowerCase()

  let allowedTimes
  let minTime = "07:00"
  let maxTime = "15:30"

  if (tourKey === "avistamiento de aves" || tourKey === "birdwatching tour") {
    allowedTimes = [
      { label: "6:00 AM", value: "06:00" },
      { label: "7:00 AM", value: "07:00" },
      { label: "8:00 AM", value: "08:00" },
      { label: "9:00 AM", value: "09:00" },
      { label: "5:00 PM", value: "17:00" },
      { label: "6:00 PM", value: "18:00" },
      { label: "7:00 PM", value: "19:00" }
    ]
    minTime = "06:00"
    maxTime = "19:00"
  } else if (tourKey === "cayos 7 hermanos" || tourKey === "seven brothers islands") {
    allowedTimes = [
      { label: "6:00 AM", value: "06:00" },
      { label: "7:00 AM", value: "07:00" },
      { label: "8:00 AM", value: "08:00" }
    ]
    minTime = "06:00"
    maxTime = "08:00"
  } else {
    allowedTimes = [
      { label: "7:00 AM", value: "07:00" },
      { label: "8:00 AM", value: "08:00" },
      { label: "9:00 AM", value: "09:00" },
      { label: "10:00 AM", value: "10:00" },
      { label: "11:00 AM", value: "11:00" },
      { label: "12:00 PM", value: "12:00" },
      { label: "1:00 PM", value: "13:00" },
      { label: "2:00 PM", value: "14:00" },
      { label: "3:00 PM", value: "15:00" },
      { label: "3:30 PM", value: "15:30" }
    ]
  }

  useEffect(() => {
    if (selectedHour !== null && selectedMinute !== null) {
      const hour24 =
        selectedPeriod === "PM" && selectedHour < 12
          ? selectedHour + 12
          : selectedPeriod === "AM" && selectedHour === 12
          ? 0
          : selectedHour
      const formatted = `${hour24.toString().padStart(2, "0")}:${selectedMinute
        .toString()
        .padStart(2, "0")}`
      setTimeValue(formatted)
    }
  }, [selectedHour, selectedMinute, selectedPeriod])

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hourStr, minuteStr] = e.target.value.split(":")
    const hour24 = Number.parseInt(hourStr)
    const minute = Number.parseInt(minuteStr)

    const isPM = hour24 >= 12
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
    const period: "AM" | "PM" = isPM ? "PM" : "AM"

    // Validaciones por tour
    if (
      (tourKey === "avistamiento de aves" || tourKey === "birdwatching tour") &&
      !(
        (hour24 >= 6 && hour24 <= 9) ||
        (hour24 >= 17 && hour24 <= 19)
      )
    ) {
      setSelectedHour(6)
      setSelectedMinute(0)
      setSelectedPeriod("AM")
      setTimeValue("06:00")
      return
    }

    if (
      (tourKey === "cayos 7 hermanos" || tourKey === "seven brothers islands") &&
      (hour24 < 6 || hour24 > 8)
    ) {
      setSelectedHour(6)
      setSelectedMinute(0)
      setSelectedPeriod("AM")
      setTimeValue("06:00")
      return
    }

    setTimeValue(e.target.value)
    setSelectedHour(hour12)
    setSelectedMinute(minute)
    setSelectedPeriod(period)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {allowedTimes.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                handleTimeChange({ target: { value: option.value } } as React.ChangeEvent<HTMLInputElement>)
              }
              className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                timeValue === option.value
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-blue-200 text-blue-800 hover:bg-blue-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="relative mt-4">
          <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-700">
            {t("custom-time-label")}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
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
              min={minTime}
              max={maxTime}
              required
              className="bg-white border border-blue-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
