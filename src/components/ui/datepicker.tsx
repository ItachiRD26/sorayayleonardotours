"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Datepicker from "flowbite-datepicker/Datepicker"

export default function FlowbiteInlineDatepicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
}) {
  const datepickerRef = useRef<HTMLDivElement>(null)
  const datepickerInstanceRef = useRef<any>(null)

  useEffect(() => {
    const minDate = getMinDate()
    const element = datepickerRef.current

    if (!element) return

    // Crear nueva instancia sin destruir la anterior primero
    const datepickerInstance = new Datepicker(element, {
      autohide: true,
      format: "yyyy-mm-dd",
      minDate,
      inline: true,
    })

    // Guardar referencia a la instancia
    datepickerInstanceRef.current = datepickerInstance

    // Si hay una fecha seleccionada, establecerla
    if (selectedDate) {
      try {
        datepickerInstance.setDate(selectedDate)
      } catch (error) {
        console.error("Error setting date:", error)
      }
    }

    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent
      setSelectedDate(customEvent.detail.date)
    }

    element.addEventListener("changeDate", handleChange)

    // Función de limpieza
    return () => {
      element.removeEventListener("changeDate", handleChange)
      
      // Manejar la destrucción de manera segura
      if (datepickerInstanceRef.current) {
        try {
          // Método más seguro: simplemente eliminar el contenido del elemento
          if (element) {
            element.innerHTML = ""
          }
          // No llamamos a destroy() para evitar el error
          datepickerInstanceRef.current = null
        } catch (error) {
          console.error("Error cleaning up datepicker:", error)
        }
      }
    }
  }, []) // Solo se ejecuta una vez al montar el componente

  // Efecto separado para actualizar la fecha seleccionada
  useEffect(() => {
    if (!datepickerInstanceRef.current || !selectedDate) return
    
    try {
      datepickerInstanceRef.current.setDate(selectedDate)
    } catch (error) {
      console.error("Error updating selected date:", error)
    }
  }, [selectedDate])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Select Date</h2>

      <div className="flex justify-center">
        <div ref={datepickerRef} className="z-10 datepicker-custom" />
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">Reservations must be made at least 48 hours in advance.</p>

      <style jsx global>{`
      .datepicker-cell.selected, 
      .datepicker-cell.selected:hover {
        background-color: #3b82f6 !important;
        color: white !important;
        font-weight: bold !important;
      }
      
      .datepicker-cell.focused:not(.selected) {
        background-color: #dbeafe !important;
      }
      
      .datepicker-cell.today:not(.selected) {
        border: 1px solid #3b82f6 !important;
      }
    `}</style>
    </motion.div>
  )
}

function getMinDate(): Date {
  const date = new Date()
  date.setDate(date.getDate() + 2)
  return date
}
