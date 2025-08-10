"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import PersonSelector from "@/components/ui/personselector";
import TimePicker from "@/components/ui/timepicker";
import PaymentCard from "@/components/ui/paymentcard";
import DatePickerWrapper from "./date-picker-wrapper";

interface Child {
  id: number;
  age: number | null;
}

const tours = [
  {
    id: "tour-1",
    name: "Banco de Arenas Gran Grossier",
    price: 135,
    image: "/images/gran-grocier.webp",
    duration: "3 horas",
  },
  {
    id: "tour-2",
    name: "Isla Cabra",
    price: 60,
    image: "/images/isla-cabra.webp",
    duration: "5 horas",
  },
  {
    id: "tour-3",
    name: "Cayos 7 Hermanos",
    price: 200,
    image: "/images/seven-brothers.webp",
    duration: "6 horas",
  },
  {
    id: "tour-4",
    name: "Plataforma Ecoturística",
    price: 100,
    image: "/images/plataforma-ecoturistica.webp",
    duration: "3 horas",
  },
  {
    id: "tour-5",
    name: "Piscina Natural",
    price: 130,
    image: "/images/piscina-natural.webp",
    duration: "3 horas",
  },
  {
    id: "tour-6",
    name: "Pesca Deportiva",
    price: 220,
    image: "/images/pesca-deportiva.webp",
    duration: "5 horas",
  },
  {
    id: "tour-7",
    name: "Aventura de Snorkeling",
    price: 130,
    image: "/images/scuba-diving.webp",
    duration: "4 horas",
  },
  {
    id: "tour-8",
    name: "Avistamiento de Aves",
    price: 100,
    image: "/images/avistamiento-aves.webp",
    duration: "3 horas",
  },
  {
    id: "tour-9",
    name: "Excursion en la Ciudad",
    price: 100,
    image: "/images/parque-reloj.webp",
    duration: "3 horas",
  },
];

export default function ReservationForm() {
  const t = useTranslations("Reservations");
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId");
  const selectedTour = tours.find((tour) => tour.id === tourId);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);
  const [childGuests, setChildGuests] = useState<Child[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");

  if (!selectedTour || !tourId)
    return (
      <p className="text-center mt-20 text-red-600">Tour no encontrado</p>
    );

  const getBasePrice = (tour: string, adults: number): number => {
    switch (tour) {
      case "Banco de Arenas Gran Grossier":
        if (adults <= 4) return 140;
        if (adults <= 7) return 170;
        if (adults < 30) return 170 + (adults - 7) * 23;
        return adults * 20;
      case "Isla Cabra":
        if (adults <= 4) return 60;
        if (adults <= 8) return 70;
        if (adults < 10) return 70 + (adults - 8) * 8;
        return adults * 7;
      case "Cayos 7 Hermanos":
        if (adults <= 4) return 200;
        if (adults < 20) return 200 + (adults - 4) * 50;
        return adults * 45;
      case "Plataforma Ecoturística":
        if (adults <= 4) return 100;
        if (adults <= 8) return 130;
        if (adults < 20) return 130 + (adults - 8) * 15;
        return adults * 12;
      case "Piscina Natural":
        if (adults <= 4) return 130;
        if (adults <= 9) return 150;
        return 150 + (adults - 9) * 15;
      case "Pesca Deportiva":
        if (adults <= 2) return 220;
        if (adults === 3) return 320;
        if (adults <= 5) return 420;
        return adults * 100;
      case "Aventura de Snorkeling":
        if (adults <= 2) return 130;
        if (adults === 3) return 140;
        if (adults <= 5) return 150;
        return 150 + (adults - 5) * 30;
      case "Avistamiento de Aves":
        if (adults <= 4) return 100;
        if (adults <= 8) return 175;
        return adults * 20;
      case "Excursion en la Ciudad":
        if (adults <= 10) return 70;
        if (adults <= 20) return 100;
        if (adults <= 50) return 150;
        return adults * 10;
      default:
        return adults * selectedTour.price;
    }
  };

  const calculateDynamicPrice = (): { total: number; note: string } => {
    const fullAdultsFromKids = childGuests.filter(
      (c) => c.age !== null && c.age > 6
    ).length;
    const halfAdultsFromKids = childGuests.filter(
      (c) => c.age !== null && c.age > 4 && c.age <= 6
    ).length;

    const rawEffectiveAdults =
      adults + fullAdultsFromKids + halfAdultsFromKids * 0.5;

    const baseAdults = Math.floor(rawEffectiveAdults);
    const remainingFraction = rawEffectiveAdults - baseAdults;

    const basePrice = getBasePrice(selectedTour.name, baseAdults);
    const priceWithExtraAdult = getBasePrice(selectedTour.name, baseAdults + 1);
    const priceDiffPerAdult = priceWithExtraAdult - basePrice;

    const total = basePrice + priceDiffPerAdult * remainingFraction;

    let discountNoteKey: string | null = null;
    switch (selectedTour.name) {
      case "Banco de Arenas Gran Grossier":
        if (rawEffectiveAdults >= 30)
          discountNoteKey = "discount-note-gran-grosier";
        break;
      case "Isla Cabra":
        if (rawEffectiveAdults >= 10)
          discountNoteKey = "discount-note-isla-cabra";
        break;
      case "Cayos 7 Hermanos":
        if (rawEffectiveAdults >= 20)
          discountNoteKey = "discount-note-cayos-hermanos";
        break;
      case "Plataforma Ecoturística":
        if (rawEffectiveAdults >= 20)
          discountNoteKey = "discount-note-ecoturistica";
        break;
      case "Piscina Natural":
        if (rawEffectiveAdults > 9)
          discountNoteKey = "discount-note-piscina-natural";
        break;
    }

    const note = discountNoteKey ? t(discountNoteKey) : t("dynamic-rate-note");
    return { total: Math.round(total), note };
  };

  const { total, note } = calculateDynamicPrice();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10"
    >
      <div className="flex flex-col gap-6">

        <PersonSelector
          tourName={selectedTour.name}
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
            <h2 className="text-2xl font-bold text-center text-white">
              {t("departure-datetime-title")}
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <DatePickerWrapper
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <TimePicker
              tourName={selectedTour.name}
              selectedHour={selectedHour}
              setSelectedHour={setSelectedHour}
              selectedMinute={selectedMinute}
              setSelectedMinute={setSelectedMinute}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
            />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-start">
        <PaymentCard
          name={name}
          email={email}
          phone={phone}
          tourName={selectedTour.name}
          adults={adults}
          childrenData={childGuests.map((child) => ({
            age: child.age ?? 0,
          }))}
          selectedDate={selectedDate}
          selectedHour={selectedHour !== null ? selectedHour.toString() : ""}
          selectedMinute={selectedMinute !== null ? selectedMinute.toString() : ""}
          selectedPeriod={selectedPeriod}
          price={total}
          pricingNote={note}
        />
      </div>
    </motion.div>
  );
}
