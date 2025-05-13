import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const CurrencyConverter = ({ amountInDOP }: { amountInDOP: number }) => {
  const conversionRate = 60;
  const amountInUSD = amountInDOP / conversionRate;
  return <span className="text-sm text-gray-500">(~${amountInUSD.toFixed(2)} USD)</span>;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeaturedTours() {
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
          <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-none">RUTAS POPULARES</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Experiencias Marítimas Exclusivas
          </h2>
          <p className="text-lg text-gray-600 max-w-2x2 mx-auto">
            Descubre nuestras excursiones más populares, diseñadas para ofrecerte una experiencia única en el paraíso de Montecristi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Tour Cards */}
          {[
            {
              id: 1,
              title: "Playa Gran Grosier",
              description: "Explora los arrecifes de coral y nada entre peces tropicales en una de las playas más hermosas de Montecristi.",
              image: "/images/gran-grocier.jpg",
              price: 1500,
              priceUSD: 25,
              duration: "4 horas",
              location: "Monte Cristi",
              groupSize: "2-12",
              badge: "Más Popular",
            },
            {
              id: 3,
              title: "Cayos 7 Hermanos",
              description: "Disfruta de un viaje inolvidable a este archipiélago de siete pequeñas islas con aguas cristalinas y paisajes impresionantes.",
              image: "/images/seven-brothers.jpg",
              price: 2500,
              priceUSD: 42,
              duration: "6 horas",
              location: "Monte Cristi",
              groupSize: "2-12",
              badge: "Aventura",
            },
            {
              id: 2,
              title: "Isla Cabra",
              description: "Aventúrate en esta pequeña isla paradisíaca con playas de arena blanca y aguas turquesas perfectas para nadar y relajarse.",
              image: "/images/isla-cabra.jpg",
              price: 550,
              priceUSD: 9,
              duration: "5 horas",
              location: "Monte Cristi",
              groupSize: "2-12",
              badge: "Económico",
            },
          ].map((tour) => (
            <motion.div key={tour.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-sky-700 hover:bg-white">{tour.badge}</Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <div className="flex flex-col space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{tour.groupSize} personas</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-primary font-bold text-lg">${tour.price} DOP</span>
                    <CurrencyConverter amountInDOP={tour.price} />
                  </div>
                  <Link
                    href={`/excursiones/reservas?tourId=${tour.id}&name=${encodeURIComponent(tour.title)}&description=${encodeURIComponent(tour.description)}&price=${tour.priceUSD}&image=${encodeURIComponent(tour.image)}&duration=${encodeURIComponent(tour.duration)}`}
                  >
                    <Button variant="default">Reservar</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/excursiones">
            <Button
              size="lg"
              variant="outline"
              className="font-medium text-base border-primary text-primary hover:bg-primary hover:text-white"
            >
              Ver Todas las Excursiones <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
