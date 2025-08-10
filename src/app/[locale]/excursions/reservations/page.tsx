"use client";

import { useEffect, useMemo } from "react";
import useScrollToTop from "@/hooks/usescrolltotop";
import ReservationForm from "@/components/ui/reservationform";
import TourSummary from "@/components/ui/toursummary";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

/** IDs permitidos de tours (union literal) */
const TOUR_IDS = [
  "tour-1",
  "tour-2",
  "tour-3",
  "tour-4",
  "tour-5",
  "tour-6",
  "tour-7",
  "tour-8",
  "tour-9",
] as const;
type TourId = typeof TOUR_IDS[number];

/** Datos neutrales locales (no traducibles) */
const TOURS: ReadonlyArray<{
  id: TourId;
  price: number;
  image: string;
}> = [
  { id: "tour-1", price: 125, image: "/images/gran-grocier.webp" },
  { id: "tour-2", price: 50,  image: "/images/isla-cabra.webp" },
  { id: "tour-3", price: 200, image: "/images/seven-brothers.webp" },
  { id: "tour-4", price: 100, image: "/images/plataforma-ecoturistica.webp" },
  { id: "tour-5", price: 120, image: "/images/piscina-natural.webp" },
  { id: "tour-6", price: 200, image: "/images/pesca-deportiva.webp" },
  { id: "tour-7", price: 100, image: "/images/scuba-diving.webp" },
  { id: "tour-8", price: 80,  image: "/images/avistamiento-aves2.webp" },
  { id: "tour-9", price: 90,  image: "/images/parque-reloj.webp" },
] as const;

/** Type guard para validar el tourId del query */
function isTourId(v: string): v is TourId {
  return (TOUR_IDS as readonly string[]).includes(v);
}

/** Helper para leer traducciones sin crashear si falta una clave */
const safe = (fn: () => string, fallback = ""): string => {
  try { return fn(); } catch { return fallback; }
};

export default function ReservacionesPage() {
  const locale = useLocale();
  const tTours = useTranslations("Tours");             // title / description
  const tExc = useTranslations("ExcursionesPage");     // duration
  const searchParams = useSearchParams();

  const rawTourId = searchParams.get("tourId") ?? "";
  const selectedId: TourId | null = isTourId(rawTourId) ? rawTourId : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useScrollToTop(`/${locale}/excursions/reservations/success`);

  const tour = useMemo(() => {
    const idToUse: TourId = selectedId ?? TOURS[0].id; // fallback al primero
    return TOURS.find((t) => t.id === idToUse)!;
  }, [selectedId]);

  // Traducciones (con fallback seguro)
  const title = safe(() => tTours(`${tour.id}.title`), tour.id);
  const description = safe(() => tTours(`${tour.id}.description`), "");
  const duration = safe(() => tExc(`${tour.id}.duration`), locale.startsWith("es") ? "— horas" : "— hours");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        <TourSummary
          title={title}
          description={description}
          imageUrl={tour.image}
          duration={duration}
        />
        {/* Si necesitas el precio/ID en el formulario, puedes pasarlos aquí */}
        <ReservationForm />
      </div>
    </div>
  );
}
