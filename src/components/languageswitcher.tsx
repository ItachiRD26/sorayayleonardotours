"use client"

import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { ChangeEvent } from "react"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value
    const newPathname = pathname.replace(/^\/\w{2}/, `/${newLocale}`)
    router.push(newPathname)
  }

  return (
    <div className="flex items-center gap-2 bg-white border border-gray-300 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
      <Globe className="w-4 h-4 text-gray-600" />
      <select
        value={currentLocale}
        onChange={handleChange}
        className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  )
}
