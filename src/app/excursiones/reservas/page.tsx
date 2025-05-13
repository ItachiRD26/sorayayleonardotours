"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useScrollToTop from "@/hooks/usescrolltotop";
import ReservationForm from "@/components/ui/reservationform";
import TourSummary from "@/components/ui/toursummary"; // si ya tienes este componente

type Tour = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  duration: string;
};


  export default function ReservacionesPage() {
  useScrollToTop("/excursiones/reservas");
  const [tour, setTour] = useState<Tour | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tourId = searchParams.get("tourId");
    const name = searchParams.get("name");
    const description = searchParams.get("description");
    const price = searchParams.get("price");
    const image = searchParams.get("image");
    const duration = searchParams.get("duration");

    if (tourId && name && description && price && image && duration) {
      setTour({
        id: tourId,
        name: decodeURIComponent(name),
        description: decodeURIComponent(description),
        price: Number(price),
        image: decodeURIComponent(image),
        duration: decodeURIComponent(duration),
      });
    }
  }, [searchParams]);

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
        {/* Usar TourSummary con duración */}
        <TourSummary
          title={tour.name}
          description={tour.description}
          imageUrl={tour.image}
          duration={tour.duration}
        />

        {/* Formulario de reserva */}
        <ReservationForm
          tourName={tour.name}
          price={tour.price}
        />
      </div>
    </div>
  );
}
