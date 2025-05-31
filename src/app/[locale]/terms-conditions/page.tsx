"use client"

import { useTranslations } from "next-intl"

export default function TermsPage() {
  const t = useTranslations("TermsConditions")

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen py-16 px-6 md:px-12 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-sky-800 mb-6">{t("title")}</h1>
      <p className="text-gray-700 mb-8">{t("intro")}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-sky-700 mb-3">{t("participation-title")}</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {t.raw("participation-list").map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-sky-700 mb-3">{t("booking-title")}</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {t.raw("booking-list").map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-sky-700 mb-3">{t("additional-title")}</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {t.raw("additional-list").map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

  <section>
  <h2 className="text-xl font-semibold text-sky-700 mb-3">{t("cancellations-title")}</h2>
  <ul className="list-disc list-inside text-gray-600 space-y-2">
    {t.raw("cancellations-list").map((item: string, idx: number) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
</section>

    </div>
  )
}
