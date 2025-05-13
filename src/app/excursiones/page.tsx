"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Compass } from "lucide-react"

export default function ExcursionesPage() {
  const excursions = [
  {
    id: 1,
    title: "Playa Gran Grosier",
    description: "Explora los arrecifes de coral y nada entre peces tropicales en una de las playas más hermosas de Montecristi.",
    image: "/images/gran-grocier.jpg",
    price: 25,
    duration: "4 horas",
    location: "Monte Cristi",
    groupSize: "2-12",
  },
  {
    id: 2,
    title: "Isla Cabra",
    description: "Aventúrate en esta pequeña isla paradisíaca con playas de arena blanca y aguas turquesas perfectas para nadar y relajarse.",
    image: "/images/isla-cabra.jpg",
    price: 9,
    duration: "5 horas",
    location: "Monte Cristi",
    groupSize: "2-12",
  },
  {
    id: 3,
    title: "Cayos 7 Hermanos",
    description: "Disfruta de un viaje inolvidable a este archipiélago de siete pequeñas islas con aguas cristalinas y paisajes impresionantes.",
    image: "/images/seven-brothers.jpg",
    price: 42,
    duration: "6 horas",
    location: "Monte Cristi",
    groupSize: "2-12",
  },
  {
    id: 4,
    title: "Plataforma Ecoturística",
    description: "Vive el ecoturismo en su máxima expresión con recorridos guiados por la naturaleza y paisajes únicos.",
    image: "/images/plataforma-ecoturistica.jpg",
    price: 15,
    duration: "3 horas",
    location: "Monte Cristi",
    groupSize: "2-12",
  },
  {
    id: 5,
    title: "Piscina Natural",
    description: "Relájate en una gigantesca piscina natural en medio de los manglares, ideal para descansar y disfrutar del agua cristalina.",
    image: "/images/piscina-natural.jpg",
    price: 20,
    duration: "3 horas",
    location: "Monte Cristi",
    groupSize: "2-12",
  },
  {
    id: 6,
    title: "Pesca Deportiva",
    description: "Vive una emocionante aventura de pesca deportiva con guías expertos y el mejor equipo.",
    image: "/images/pesca-deportiva.jpg",
    price: 70,
    duration: "5 horas",
    location: "Monte Cristi",
    groupSize: "2-12",
  },
  {
    id: 7,
    title: "Snorkeling",
    description: "Sumérgete en un mundo submarino lleno de arrecifes coloridos y vida marina practicando snorkeling en aguas cristalinas.",
    image: "/images/scuba-diving.jpg",
    price: 80,
    duration: "4 horas",
    location: "Monte Cristi",
    groupSize: "2-12",
  },
]


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      /* Hero Section */
      <section className="relative w-full bg-gradient-to-r from-sky-600 to-blue-600 py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[url('/images/gran-grocier.jpg?height=800&width=1600')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="outline" className="bg-white/20 text-white mb-4 px-4 py-1 text-sm">
                Descubre Monte Cristi
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Experiencias Inolvidables en el Paraíso
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-4 max-w-2x2 mx-auto">
                Explora nuestras excursiones exclusivas y vive momentos únicos en los destinos más hermosos de República
                Dominicana.
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  <Calendar className="h-4 w-4 mr-2" /> Disponible todo el año
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  <Users className="h-4 w-4 mr-2" /> Grupos reducidos
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  <MapPin className="h-4 w-4 mr-2" /> Monte Cristi
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      /* Features Section */
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="bg-sky-100 p-3 rounded-full mb-4">
              <Compass className="h-6 w-6 text-sky-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Destinos Exclusivos</h3>
            <p className="text-gray-600">Accede a lugares únicos con nuestros guías expertos locales.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="bg-sky-100 p-3 rounded-full mb-4">
              <Users className="h-6 w-6 text-sky-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Grupos Reducidos</h3>
            <p className="text-gray-600">Experiencias personalizadas con atención individualizada.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="bg-sky-100 p-3 rounded-full mb-4">
              <Calendar className="h-6 w-6 text-sky-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Reserva Flexible</h3>
            <p className="text-gray-600">Planifica tu aventura con facilidad y sin complicaciones.</p>
          </motion.div>
        </div>
      </section>

      /* Excursions Section */
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            Nuestras Excursiones
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-gray-600 max-w-2x2 mx-auto text-lg">
              Elige entre una variedad de experiencias diseñadas para crear recuerdos inolvidables.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {excursions.map((excursion, i) => (
            <motion.div key={excursion.id} custom={i} variants={fadeIn} initial="hidden" animate="visible">
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={excursion.image || "/placeholder.svg"}
                    alt={excursion.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-sky-700 hover:bg-white">Desde ${excursion.price} USD p/p (min 6 personas)</Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-bold text-gray-900">{excursion.title}</h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-4">{excursion.description}</p>
                  <div className="flex flex-col space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{excursion.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{excursion.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{excursion.groupSize} personas</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/excursiones/reservas?tourId=${excursion.id}&name=${encodeURIComponent(excursion.title)}&description=${encodeURIComponent(excursion.description)}&price=${excursion.price}&image=${encodeURIComponent(excursion.image)}&duration=${encodeURIComponent(excursion.duration)}`}
                    className="w-full"
                  >
                    <Button variant="default" className="w-full bg-sky-600 hover:bg-sky-700">
                      Reservar Ahora
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      /* CTA Section */
    </div>
  )
}
