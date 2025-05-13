"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20 bg-white text-center">
      <Ghost className="w-20 h-20 text-blue-600 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Página no encontrada</h1>
      <p className="text-gray-600 mb-6 text-base max-w-md">
        La página que estás buscando no existe o fue movida. Verifica la dirección o vuelve al inicio.
      </p>
      <Link href="/">
        <Button variant="default">Volver al inicio</Button>
      </Link>
    </div>
  )
}
