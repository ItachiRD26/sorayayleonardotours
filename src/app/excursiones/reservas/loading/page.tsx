"use client"

import { useEffect, useState } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function ReservationLoadingPage() {
  const router = useRouter()
  const [error, setError] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Si después de 12s no se ha redirigido manualmente, mostrar error
      setError(true)
    }, 12000)

    return () => clearTimeout(timeout)
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center text-gray-800 px-4">
        <AlertCircle className="text-red-500 w-10 h-10 mb-4" />
        <h1 className="text-xl font-bold mb-2">Algo salió mal al procesar tu reserva</h1>
        <p className="text-sm text-gray-600 mb-4">
          Intenta volver atrás o contacta con soporte si el problema persiste.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => router.back()}>Volver</Button>
          <Button onClick={() => router.push("/excursiones")}>Ir a Excursiones</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 text-gray-800 text-center px-4">
      <Loader2 className="animate-spin w-12 h-12 text-blue-600 mb-4" />
      <h1 className="text-xl font-semibold mb-2">Estamos procesando su reserva...</h1>
      <p className="text-sm text-gray-600">
        No cierre ni recargue esta página. Esta operación puede tardar unos segundos.
      </p>
    </div>
  )
}
