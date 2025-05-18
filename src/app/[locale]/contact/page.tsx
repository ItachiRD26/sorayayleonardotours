"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const t = useTranslations("ContactPage")

  const [showSuccess, setShowSuccess] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get("name")?.toString().trim() || ""
    const email = formData.get("email")?.toString().trim() || ""
    const message = formData.get("message")?.toString().trim() || ""

    const newErrors: typeof errors = {}
    if (!name) newErrors.name = t("error-name")
    if (!email) newErrors.email = t("error-email")
    else if (!validateEmail(email)) newErrors.email = t("error-email-invalid")
    if (!message) newErrors.message = t("error-message")

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsSending(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 1000)
        form.reset()
      } else {
        alert("Hubo un error al enviar el mensaje")
      }
    } catch{
      alert("Error al enviar el mensaje")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen relative">

      {showSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300 animate-fade-in-out">
          {t("success-message")}
        </div>
      )}

      <section className="relative w-full bg-gradient-to-r from-sky-600 to-blue-600 py-24 md:py-32">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t("hero-title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/90 text-lg md:text-xl"
          >
            {t("hero-subtitle")}
          </motion.p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">{t("form-title")}</h2>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <input name="name" type="text" placeholder={t("name")} className="w-full px-4 py-2 border rounded-md" />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <input name="email" type="email" placeholder={t("email")} className="w-full px-4 py-2 border rounded-md" />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <textarea name="message" placeholder={t("message")} rows={6} className="w-full px-4 py-2 border rounded-md" />
              {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSending}
              className={`w-full text-white font-medium px-6 py-2 rounded-md transition-all duration-300 transform ${
                isSending
                  ? "bg-sky-400 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-700 hover:-translate-y-0.5"
              }`}
            >
              {isSending ? t("sending") : t("send-button")}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{t("contact-title")}</h2>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-5 h-5 text-sky-600" />
            <span><strong>{t("phone-label")}:</strong> +1-809-961-6343 / +1-809-962-2259</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-sky-600" />
            <span><strong>{t("email-label")}:</strong> administracion@sorayayleonardotours.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-sky-600" />
            <span><strong>{t("address-label")}:</strong> {t("address-text")}</span>
          </div>

          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2692.2176983913164!2d-71.6569292!3d19.861424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb143c255555555%3A0x8fba3d043e259106!2sSoraya%20y%20Leonardo%20tours!5e1!3m2!1ses!2sdo!4v1747195680659!5m2!1ses!2sdo"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
