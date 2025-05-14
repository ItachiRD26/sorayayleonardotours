"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { motion } from "framer-motion"

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
          Contáctanos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 mb-10"
        >
          Estamos aquí para ayudarte a planificar tu experiencia perfecta en Montecristi.
          Si tienes dudas, necesitas ayuda para reservar, o deseas una excursión personalizada, no dudes en escribirnos.
        </motion.p>

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
            <span>+1-809-961-6343 / +1-809-962-2259 (llamadas y WhatsApp)</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Mail className="text-sky-600" />
            <span>administracion@sorayayleonardotours.com</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Clock className="text-sky-600" />
            <span>Horario de atención: Lunes a Domingo — 8:00 AM a 6:00 PM</span>
          </div>

          <p className="text-gray-500 text-sm pt-4">
            Soraya y Leonardo Tours – Operador turístico local con más de 10 años de experiencia ofreciendo aventuras marítimas en Montecristi.
          </p>
        </motion.div>

        {/* MAPA INCRUSTADO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-xl overflow-hidden shadow-lg border"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2692.2176983913164!2d-71.6569292!3d19.861424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb143c255555555%3A0x8fba3d043e259106!2sSoraya%20y%20Leonardo%20tours!5e1!3m2!1ses!2sdo!4v1747195680659!5m2!1ses!2sdo"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </main>
  )
}
