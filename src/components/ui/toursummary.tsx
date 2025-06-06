"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Clock, CheckCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"

interface TourSummaryProps {
  title: string
  description: string
  imageUrl: string
  duration: string
}

export default function TourSummary({ title, description, imageUrl, duration }: TourSummaryProps) {
  const t = useTranslations("Reservations")

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-2xl shadow-2xl mb-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda: Imagen y descripción */}
        <div>
          <div className="relative w-full h-60 rounded-xl overflow-hidden mb-6">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{title}</h1>
          <div className="flex mb-4">
            <Badge className="bg-sky-50 text-sky-700 font-medium px-3 py-1 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {duration}
            </Badge>
          </div>
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Columna derecha: Requerimientos e instrucciones */}
        <div className="bg-sky-50 p-6 rounded-xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sky-600" />
              {t("requirements-title")}
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="min-w-4 mt-1 h-4 rounded-full bg-sky-600 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">{t("requirement-clothing")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 mt-1 h-4 rounded-full bg-sky-600 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">{t("requirement-sunscreen")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 mt-1 h-4 rounded-full bg-sky-600 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">{t("requirement-towel")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 mt-1 h-4 rounded-full bg-sky-600 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">{t("requirement-camera")}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-sky-600" />
              {t("instructions-title")}
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="min-w-4 mt-1 h-4 rounded-full bg-sky-600 flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                <span className="text-gray-700">{t("instruction-arrive-early")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 mt-1 h-4 rounded-full bg-sky-600 flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                <span className="text-gray-700">{t("instruction-payment-confirmation")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 mt-1 h-4 rounded-full bg-sky-600 flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                <span className="text-gray-700">{t("instruction-reschedule")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
