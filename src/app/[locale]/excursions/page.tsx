"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Compass } from "lucide-react"
import { useTranslations } from "next-intl"
import { useLocale } from 'next-intl'
import { useEffect } from "react"

const excursions = [1, 2, 3, 4, 5, 6, 7].map((id) => ({
  id,
  image: [
    "/images/gran-grocier.webp",
    "/images/isla-cabra.webp",
    "/images/seven-brothers.webp",
    "/images/plataforma-ecoturistica.webp",
    "/images/piscina-natural.webp",
    "/images/pesca-deportiva.webp",
    "/images/scuba-diving.webp"
  ][id - 1],
  price: [25, 10, 50, 20, 20, 70, 80][id - 1]
}))

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
}

export default function ExcursionesPage() {
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  const t = useTranslations("ExcursionesPage")
  const locale = useLocale()
  const getTourId = (id: number) => `tour-${id}`;


  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-600 to-blue-600 py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[url('/images/gran-grocier.webp?height=800&width=1600')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="outline" className="bg-white/20 text-white mb-4 px-4 py-1 text-sm">
                {t("badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t("hero-title")}
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-4 max-w-2x2 mx-auto">
                {t("hero-subtitle")}
              </p>
              <div className="flex justify-center gap-3 mt-6 flex-wrap">
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  <Calendar className="h-4 w-4 mr-2" /> {t("badge-available")}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  <Users className="h-4 w-4 mr-2" /> {t("badge-small-groups")}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  <MapPin className="h-4 w-4 mr-2" /> {t("badge-location")}
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard icon={<Compass className="h-6 w-6 text-sky-600" />} title={t("features.one-title")}
            desc={t("features.one-desc")} />
          <FeatureCard icon={<Users className="h-6 w-6 text-sky-600" />} title={t("features.two-title")}
            desc={t("features.two-desc")} />
          <FeatureCard icon={<Calendar className="h-6 w-6 text-sky-600" />} title={t("features.three-title")}
            desc={t("features.three-desc")} />
        </div>
      </section>

      {/* Excursions Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t("section-title")}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-600 max-w-2x2 mx-auto text-lg">
            {t("section-subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {excursions.map((exc, i) => {
            const tid = `tour-${exc.id}`
            return (
              <motion.div key={exc.id} custom={i} variants={fadeIn} initial="hidden" animate="visible">
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={exc.image}
                      alt={t(`${tid}.title`)}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-sky-700 hover:bg-white">
                        <MapPin className="h-4 w-4 mr-2" />
                        {t("badge-location")}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold text-gray-900">{t(`${tid}.title`)}</h3>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 mb-4">{t(`${tid}.description`)}</p>
                    <div className="flex flex-col space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-sky-600" />
                        <span>{t(`${tid}.duration`)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-sky-600" />
                        <span>{t("badge-location")}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-sky-600" />
                        <span>{t(`${tid}.group-size`)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/${locale}/excursions/reservations?tourId=${getTourId(exc.id)}`}>
                      <Button variant="default" className="w-full bg-sky-600 hover:bg-sky-700">
                        {t("book-button")}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="bg-sky-100 p--3 rounded-full mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </motion.div>
  )
}
