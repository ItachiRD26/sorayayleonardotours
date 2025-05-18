import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useLocale } from 'next-intl'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function FeaturedTours() {
  const t = useTranslations('FeaturedTours')
  const locale = useLocale()

const tours = [
  {
    id: "tour-1",
    image: "/images/gran-grocier.webp",
    priceUSD: 125,
    duration: "duration",
    location: "Monte Cristi",
    groupSize: "group-size",
    badge: "popular"
  },
  {
    id: "tour-2",
    image: "/images/isla-cabra.webp",
    priceUSD: 50,
    duration: "duration",
    location: "Monte Cristi",
    groupSize: "group-size",
    badge: "budget"
  },
  {
    id: "tour-3",
    image: "/images/seven-brothers.webp",
    priceUSD: 200,
    duration: "duration",
    location: "Monte Cristi",
    groupSize: "group-size",
    badge: "adventure"
  }
];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('featured-title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2x2 mx-auto">
            {t('featured-subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <motion.div key={tour.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={t(`${tour.id}.title`)}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-sky-700 hover:bg-white">
                      {t(`badges.${tour.badge}`)}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-bold text-gray-900">{t(`${tour.id}.title`)}</h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-4">{t(`${tour.id}.description`)}</p>
                  <div className="flex flex-col space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{t(`${tour.id}.${tour.duration}`)}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{t(`${tour.id}.${tour.groupSize}`)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <Link href={`/${locale}/excursions/reservations?tourId=${tour.id}`}>
                    <Button variant="default" className="items items-center justify-center">
                      {t('book-button')}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href={`/${locale}/excursions`}>
            <Button
              size="lg"
              variant="outline"
              className="font-medium text-base border-primary text-primary hover:bg-primary hover:text-white"
            >
              {t('featured-button')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
