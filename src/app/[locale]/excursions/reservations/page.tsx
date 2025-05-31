"use client";

import { useEffect } from "react";
import useScrollToTop from "@/hooks/usescrolltotop";
import ReservationForm from "@/components/ui/reservationform";
import TourSummary from "@/components/ui/toursummary";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

// Base de datos local de tours
const tours = [
  {
    id: "tour-1",
    name: "Banco de Arenas Gran Grossier",
    description: "Relájate y nada en aguas poco profundas y cristalinas en este paraíso escondido.",
    price: 125,
    image: "/images/gran-grocier.webp",
    duration: "4 horas",
  },
  {
    id: "tour-2",
    name: "Isla Cabra",
    description: "Explora esta isla paradisíaca con playas de arena blanca y aguas turquesas.",
    price: 50,
    image: "/images/isla-cabra.webp",
    duration: "5 horas",
  },
  {
    id: "tour-3",
    name: "Cayos 7 Hermanos",
    description: "Aventura en el archipiélago de siete islas con paisajes impresionantes.",
    price: 200,
    image: "/images/seven-brothers.webp",
    duration: "6 horas",
  },
  {
    id: "tour-4",
    name: "Plataforma Ecoturística",
    description: "Vive el ecoturismo con recorridos guiados por paisajes únicos.",
    price: 100,
    image: "/images/plataforma-ecoturistica.webp",
    duration: "3 horas",
  },
  {
    id: "tour-5",
    name: "Piscina Natural",
    description: "Piscina natural en medio de manglares con agua cristalina.",
    price: 120,
    image: "/images/piscina-natural.webp",
    duration: "3 horas",
  },
  {
    id: "tour-6",
    name: "Pesca Deportiva",
    description: "Aventura de pesca deportiva con guías expertos.",
    price: 200,
    image: "/images/pesca-deportiva.webp",
    duration: "5 horas",
  },
  {
    id: "tour-7",
    name: "Aventura de Snorkeling",
    description: "Snorkeling entre arrecifes y vida marina.",
    price: 100,
    image: "/images/scuba-diving.webp",
    duration: "4 horas",
  },
  { id: "tour-8",
    name: "Avistamiento de Aves",
    description: "Descubre la biodiversidad de aves en su hábitat natural.",
    price: 80,
    image: "/images/avistamiento-aves2.webp",
    duration: "3 horas",
  },
  {
    id: "tour-9",
    name: "Excursión en la Ciudad",
    description: "Recorrido por los principales puntos turísticos de la ciudad.",
    price: 90,
    image: "/images/parque-reloj.webp",
    duration: "3 horas",
  },
];

export default function ReservacionesPage() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useScrollToTop(`/${locale}/excursions/reservations/success`);

  const tour = tours.find((t) => t.id === tourId);

  if (!tour) {
    return (
      <div className="text-center py-20 text-gray-700">
        Loading tour information...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        <TourSummary
          title={tour.name}
          description={tour.description}
          imageUrl={tour.image}
          duration={tour.duration}
        />

        {/* ✅ Asegúrate que ReservationForm acepte estas props en su definición */}
        <ReservationForm />
      </div>
    </div>
  );
}
