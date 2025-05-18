"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  const t = useTranslations("Footer")
  const currentYear = new Date().getFullYear()
  const locale = useLocale()

  return (
    <footer className="bg-[#0a2540] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h2 className="text-xl font-medium text-white mb-4">{t("title")}</h2>
            <p className="text-sm text-gray-300 leading-relaxed">{t("description")}</p>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-200 mb-4">{t("explore")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}`} className="text-gray-300 hover:text-white transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/excursions`} className="text-gray-300 hover:text-white transition-colors">
                  {t("excursions")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about-us`} className="text-gray-300 hover:text-white transition-colors">
                  {t("about-us")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-300 hover:text-white transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-200 mb-4">{t("legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/terms-conditions`} className="text-gray-300 hover:text-white transition-colors">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy-policy`} className="text-gray-300 hover:text-white transition-colors">
                  {t("privacy-policy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-200 mb-4">{t("contact-title")}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>{t("location")}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <span>{t("phone")}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <span>{t("email")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-400">
          &copy; {currentYear} Soraya y Leonardo Tours. {t("copyright")}
        </div>
      </div>
    </footer>
  )
}
