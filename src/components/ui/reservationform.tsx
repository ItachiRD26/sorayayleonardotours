"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PersonSelector from "@/components/ui/personselector"
import TimePicker from "@/components/ui/timepicker"
import PaymentCard from "@/components/ui/paymentcard"
import DatePickerWrapper from "./date-picker-wrapper"

interface Child {
  id: number
  age: number | null
}

export default function ReservationForm({
  tourName,
  price,
}: {
  tourName: string
  price: number
}) {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [adults, setAdults] = useState<number>(1)
  const [childGuests, setChildGuests] = useState<Child[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedHour, setSelectedHour] = useState<number | null>(null)
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM")

  const getBasePrice = (tour: string, adults: number): number => {
    switch (tour) {
      case "Banco de Arena Gran Grosier":
        if (adults <= 2) return 125
        if (adults === 3) return 140
        if (adults <= 5) return 150
        return 150 + (adults - 5) * 25

      case "Isla Cabra":
        if (adults <= 2) return 50
        if (adults <= 5) return 60
        return 60 + (adults - 5) * 10

      case "Cayos 7 Hermanos":
        if (adults <= 2) return 200
        if (adults === 3) return 250
        if (adults <= 5) return 270
        return 270 + (adults - 5) * 50

      case "Plataforma Ecoturística":
        if (adults <= 2) return 100
        if (adults === 3) return 110
        if (adults <= 5) return 125
        return 125 + (adults - 5) * 15

      case "Piscina Natural":
        if (adults <= 2) return 120
        if (adults === 3) return 130
        if (adults <= 5) return 140
        return 140 + (adults - 5) * 17

      case "Pesca Deportiva":
        if (adults <= 2) return 200
        if (adults === 3) return 300
        if (adults <= 5) return 400
        return 400 + (adults - 6) * 35

      case "Snorkeling":
        if (adults <= 2) return 100
        if (adults == 3) return 120
        if (adults <= 5) return 150
        return 150 + (adults - 5) * 30

      default:
        return adults * price
    }
  }

  const calculateDynamicPrice = (): { total: number; note: string } => {
    const basePrice = getBasePrice(tourName, adults)

    let total = basePrice
    childGuests.forEach((child) => {
      if (child.age !== null) {
        if (child.age <= 4) total += 0
        else if (child.age <= 7) total += (basePrice / adults) * 0.5
        else total += basePrice / adults
      }
    })

    return {
      total: Math.round(total),
      note: "Tarifa calculada según tamaño del grupo y edades.",
    }
  }

  const { total, note } = calculateDynamicPrice()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="flex flex-col gap-8">
        <PersonSelector
          tourName={tourName}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          adults={adults}
          setAdults={setAdults}
          childGuests={childGuests}
          setChildGuests={setChildGuests}
        />

        {/* Contenedor combinado para DatePicker y TimePicker */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
        <h2 className="text-2xl font-bold text-center text-white">Fecha y Hora de Salida</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* DatePicker */}
          <div className="bg-blue-50 rounded-lg p-4 transition-all hover:shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Selecciona una fecha
            </h3>
            <DatePickerWrapper selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>

          {/* TimePicker */}
          <div className="bg-blue-50 rounded-lg p-4 transition-all hover:shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Selecciona la hora
            </h3>
            <TimePicker
              selectedHour={selectedHour}
              setSelectedHour={setSelectedHour}
              selectedMinute={selectedMinute}
              setSelectedMinute={setSelectedMinute}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
            />
          </div>
        </div>

        <div className="mt-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-600 to-blue-400"></div>
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-4 pl-6 shadow-sm border border-blue-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-1.5 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-800 mb-1">Información importante</h4>
                <p className="text-sm text-blue-700">
                  Las reservas deben hacerse con mínimo 48 horas de anticipación y están disponibles entre{" "}
                  <strong className="font-medium bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">7:00 AM</strong> y{" "}
                  <strong className="font-medium bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">3:30 PM</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <PaymentCard
          name={name}
          email={email}
          phone={phone}
          tourName={tourName}
          adults={adults}
          childrenData={childGuests.map((child) => ({ age: child.age ?? 0 }))}
          selectedDate={selectedDate}
          selectedHour={selectedHour !== null ? selectedHour.toString() : ""}
          selectedMinute={selectedMinute !== null ? selectedMinute.toString() : ""}
          selectedPeriod={selectedPeriod}
          price={total}
          pricingNote={note}
        />
      </div>
    </motion.div>
  )
}
