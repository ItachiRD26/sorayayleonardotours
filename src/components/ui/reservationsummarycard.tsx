// Nuevo /components/ReservationSummaryCard.tsx
"use client";

import { Calendar, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

interface ReservationSummaryCardProps {
  name: string;
  date: string;
  time: string;
  people: number;
}

export default function ReservationSummaryCard({ name, date, time, people }: ReservationSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg text-center mb-8"
    >
      <h2 className="text-2xl font-bold text-primary mb-4">Confirmar tu Excursión</h2>
      <p className="text-gray-700 text-lg font-semibold mb-2">{name}</p>

      <div className="flex justify-center gap-6 text-gray-600 mt-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" /> {date}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" /> {time}
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" /> {people}
        </div>
      </div>
    </motion.div>
  );
}
