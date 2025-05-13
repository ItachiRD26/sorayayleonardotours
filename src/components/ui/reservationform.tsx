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

  const totalPeople = adults + childGuests.length

  const getBasePrice = (tour: string, people: number): number | null => {
    switch (tour) {
      case "Playa Gran Grosier":
        if (people <= 2) return 125
        if (people === 3) return 135
        if (people <= 5) return 142
        break
      case "Isla Cabra":
        if (people <= 2) return 42
        if (people <= 5) return 50
        break
      case "Cayos 7 Hermanos":
        if (people <= 2) return 170
        if (people === 3) return 200
        if (people <= 5) return 233
        break
      case "Plataforma Ecoturística":
        if (people <= 2) return 110
        if (people <= 5) return 120
        break
      case "Piscina Natural":
        if (people <= 2) return 120
        if (people <= 5) return 140
        break
      case "Pesca Deportiva":
        if (people <= 2) return 200
        if (people === 3) return 300
        if (people <= 6) return 400
        break
      case "Scuba Diving":
        if (people <= 2) return 100
        if (people <= 3) return 150
        if (people <= 6) return 400
        break
    }
    return null // Aplicar precio por persona
  }

  const calculateDynamicPrice = (): { total: number; note: string } => {
    const basePrice = getBasePrice(tourName, totalPeople)

    if (basePrice !== null) {
      return {
        total: basePrice,
        note: "Tarifa base aplicada para grupos pequeños.",
      }
    } else {
      let total = adults * price
      childGuests.forEach((child) => {
        if (child.age !== null) {
          if (child.age <= 4) total += 0
          else if (child.age <= 7) total += price * 0.5
          else total += price
        }
      })
      return {
        total,
        note: "Precio por persona aplicado.",
      }
    }
  }

  const { total, note } = calculateDynamicPrice()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left side: Formulario */}
      <div className="flex flex-col gap-8">
        <PersonSelector
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

      {/* Right side: Resumen + Pago */}
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
