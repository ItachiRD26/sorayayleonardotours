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
    price: 125,
    image: "/images/gran-grocier.webp",
    duration: "4 horas",
  },
  {
    id: "tour-2",
    name: "Isla Cabra",
    price: 50,
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
    price: 120,
    image: "/images/piscina-natural.webp",
    duration: "3 horas",
  },
  {
    id: "tour-6",
    name: "Pesca Deportiva",
    price: 200,
    image: "/images/pesca-deportiva.webp",
    duration: "5 horas",
  },
  {
    id: "tour-7",
    name: "Aventura de Snorkeling",
    price: 100,
    image: "/images/scuba-diving.webp",
    duration: "4 horas",
  }
];

export default function ReservationForm() {
  const t = useTranslations("Reservations");
  const tt = useTranslations("Tours");
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId");
  const selectedTour = tours.find((tour) => tour.id === tourId);
  console.log("Tour ID:", tourId);
  console.log("Selected tour:", selectedTour);
  console.log("Tour title:", tt(`${tourId}.title`));

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);
  const [childGuests, setChildGuests] = useState<Child[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");

  if (!selectedTour || !tourId) return <p className="text-center mt-20 text-red-600">Tour no encontrado</p>;

  const getBasePrice = (tour: string, adults: number): number => {
    switch (tour) {
      case "Banco de Arenas Gran Grossier":
        if (adults <= 2) return 125;
        if (adults === 3) return 140;
        if (adults <= 5) return 150;
        return 150 + (adults - 5) * 25;
      case "Isla Cabra":
        if (adults <= 2) return 50;
        if (adults <= 5) return 60;
        return 60 + (adults - 5) * 10;
      case "Cayos 7 Hermanos":
        if (adults <= 2) return 200;
        if (adults === 3) return 250;
        if (adults <= 5) return 270;
        return 270 + (adults - 5) * 50;
      case "Plataforma Ecoturística":
        if (adults <= 2) return 100;
        if (adults === 3) return 110;
        if (adults <= 5) return 125;
        return 125 + (adults - 5) * 15;
      case "Piscina Natural":
        if (adults <= 2) return 120;
        if (adults === 3) return 130;
        if (adults <= 5) return 140;
        return 140 + (adults - 5) * 17;
      case "Pesca Deportiva":
        if (adults <= 2) return 200;
        if (adults === 3) return 300;
        if (adults <= 5) return 400;
        return 400 + (adults - 6) * 35;
      case "Aventura de Snorkeling":
        if (adults <= 2) return 100;
        if (adults === 3) return 120;
        if (adults <= 5) return 150;
        return 150 + (adults - 5) * 30;
      default:
        return adults * selectedTour.price;
    }
  };

  const calculateDynamicPrice = (): { total: number; note: string } => {
    const basePrice = getBasePrice(selectedTour.name, adults);
    let total = basePrice;

    const priceWithExtraAdult = getBasePrice(selectedTour.name, adults + 1);
    const priceDiffPerAdult = priceWithExtraAdult - basePrice;

    childGuests.forEach((child) => {
      if (child.age === null) return;
      if (child.age <= 4) return;
      if (child.age <= 7) total += priceDiffPerAdult * 0.5;
      else total += priceDiffPerAdult;
    });

    return { total: Math.round(total), note: t("dynamic-rate-note") };
  };

  const { total, note } = calculateDynamicPrice();

  const tourTitle = tt(`${tourId}.title`);
  const tourDescription = tt(`${tourId}.description`);



  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{tourTitle}</h1>
        <p className="text-gray-600">{tourDescription}</p>

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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
            <h2 className="text-2xl font-bold text-center text-white">{t("departure-datetime-title")}</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <DatePickerWrapper selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TimePicker
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
  );
}
