"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-gray-900 mb-8"
        >
          Contacto
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 text-gray-700 text-lg"
        >
          <div className="flex items-center justify-center gap-3">
            <MapPin className="text-sky-600" />
            <span>Playa Juan de Bolanos, Bugalow #3, Montecristi, República Dominicana</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Phone className="text-sky-600" />
            <span>+1-809-961-6343 / +1-809-962-2259</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Mail className="text-sky-600" />
            <span>administracion@sorayayleonardotours.com</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
