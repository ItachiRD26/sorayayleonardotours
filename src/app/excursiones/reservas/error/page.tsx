"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

export default function ReservationErrorPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-red-50 text-gray-800 px-4">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h1 className="text-xl font-bold mb-2">No pudimos procesar tu reserva</h1>
      <p className="text-sm text-gray-600 mb-6">Ocurrió un error inesperado durante el proceso. Puedes intentarlo nuevamente o contactar soporte.</p>
      <div className="flex gap-4">
        <Button onClick={() => router.back()}>Volver</Button>
        <Button onClick={() => router.push("/excursiones")}>Ir a Excursiones</Button>
      </div>
    </div>
  )
}
