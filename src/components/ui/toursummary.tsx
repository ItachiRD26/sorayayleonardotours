"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TourSummaryProps {
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
}

export default function TourSummary({ title, description, imageUrl, duration }: TourSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-2xl shadow-2xl mb-10 text-center"
    >
      <div className="relative w-full h-60 rounded-xl overflow-hidden mb-6">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
        {title}
      </h1>
      <div className="flex justify-center mb-4">
        <Badge className="bg-sky-50 text-sky-700 font-medium px-3 py-1 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {duration}
        </Badge>
      </div>
      <p className="text-gray-600 max-w-2x2 mx-auto">
        {description}
      </p>
    </motion.div>
  );
}
