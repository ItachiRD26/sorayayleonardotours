"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PersonSelector from "@/components/ui/personselector"
import DatePickerComponent from "@/components/ui/datepicker"
import TimePicker from "@/components/ui/timepicker"
import PaymentCard from "@/components/ui/paymentcard"

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
        <DatePickerComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <TimePicker
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          selectedMinute={selectedMinute}
          setSelectedMinute={setSelectedMinute}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
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
