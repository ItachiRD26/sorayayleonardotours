"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Ship, Calendar, MapPin, Users, Star, ArrowRight, ChevronRight, ArrowUpRight } from "lucide-react"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import FeaturedTours from "@/components/featuredtours";
import Link from "next/link"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section - Rediseñado con elementos más modernos */}
      <section className="relative h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Video para desktop, imagen para móviles */}
          <div className="hidden md:block">
            <video autoPlay muted loop className="object-cover w-full h-full transform scale-150">
              <source src="/videos/hero-vid2.webm" type="video/webm" />
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
          <div className="md:hidden">
            <Image src="/images/hero-mobile-image.webp" alt="Soraya y Leonardo Tours" layout="fill" objectFit="cover" />
          </div>
          {/* Overlay con gradiente más sofisticado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-6 space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 max-w-4xl w-full mx-auto"
          >

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-7xl font-bold text-white drop-shadow-lg tracking-tight"
            >
              Soraya y Leonardo Tours
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-2xl text-white/90 drop-shadow-md max-w-3xl mx-auto font-light leading-relaxed"
            >
              Explora las maravillas del mar de Montecristi con excursiones exclusivas diseñadas para crear recuerdos
              inolvidables
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
  <Link
    href="/excursiones/reservas?tourId=1&name=Banco%20de%20Arena%20Gran%20Grosier&description=Descubre%20un%20paraíso%20escondido%20en%20medio%20del%20océano%3A%20el%20Banco%20de%20Arena%20Grand%20Grossier.%20Este%20banco%20de%20arena%2C%20rodeado%20por%20aguas%20cristalinas%20y%20poco%20profundas%2C%20es%20perfecto%20para%20relajarse%2C%20nadar%20y%20tomar%20fotografías%20inolvidables.%20Un%20lugar%20ideal%20para%20escapar%20del%20bullicio%20y%20conectar%20con%20la%20naturaleza%20en%20su%20estado%20más%20puro.&price=25&image=%2Fimages%2Fgran-grocier.webp&duration=4%20horas"
  >
    <Button size="lg" variant="default" className="hover:bg-blue-400 text-base font-medium">
      Reservar Ahora <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </Link>
  <Link href="/excursiones">
    <Button size="lg" variant="default" className="hover:bg-blue-400 text-base font-medium">
      Ver Excursiones
    </Button>
  </Link>
</motion.div>

          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-8 w-8 text-white rotate-90" />
        </div>
      </section>

      {/* Featured Tours Section - Rediseñado con tarjetas más elegantes */}
      <section className="py- bg-white">
      <FeaturedTours />
      </section>

      {/* Why Choose Us Section - Rediseñado con elementos más modernos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-none">NUESTRAS VENTAJAS</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              ¿Por Qué Elegirnos?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2x2 mx-auto">
              Soraya y Leonardo Tours ofrece experiencias únicas en el mar, diseñadas para brindarte la mejor aventura
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 - Rediseñado */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:translate-y-[-8px]"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-primary/10 rounded-full text-primary">
                <Ship className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Embarcaciones Modernas</h3>
              <p className="text-gray-600">
                Flota de barcos equipados con la última tecnología y comodidades para tu seguridad y confort.
              </p>
            </motion.div>

            {/* Card 2 - Rediseñado */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:translate-y-[-8px]"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-primary/10 rounded-full text-primary">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Guías Expertos</h3>
              <p className="text-gray-600">
                Nuestro personal está altamente capacitado y conoce cada rincón del mar y la región.
              </p>
            </motion.div>

            {/* Card 3 - Rediseñado */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:translate-y-[-8px]"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-primary/10 rounded-full text-primary">
                <MapPin className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rutas Exclusivas</h3>
              <p className="text-gray-600">
                Acceso a lugares poco conocidos, llenos de belleza natural y tranquilidad.
              </p>
            </motion.div>

            {/* Card 4 - Rediseñado */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:translate-y-[-8px]"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-primary/10 rounded-full text-primary">
                <Calendar className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexibilidad</h3>
              <p className="text-gray-600">
                Ofrecemos tours privados y horarios adaptados a tus necesidades para una experiencia personalizada.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action - Rediseñado con elementos más impactantes */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gran-grocier.webp"
            alt="Fondo marino"
            layout="fill"
            objectFit="cover"
            className="brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                ¿Listo para una Aventura Marina?
              </motion.h2>

              <motion.p variants={fadeInUp} className="text-xl text-white/90 mb-8 leading-relaxed">
                Reserva ahora y prepárate para vivir una experiencia inolvidable con Soraya y Leonardo Tours. Nuestros
                expertos están listos para guiarte en el paraíso de Montecristi.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Link
    href="/excursiones/reservas?tourId=1&name=Banco%20de%20Arena%20Gran%20Grosier&description=Descubre%20un%20paraíso%20escondido%20en%20medio%20del%20océano%3A%20el%20Banco%20de%20Arena%20Grand%20Grossier.%20Este%20banco%20de%20arena%2C%20rodeado%20por%20aguas%20cristalinas%20y%20poco%20profundas%2C%20es%20perfecto%20para%20relajarse%2C%20nadar%20y%20tomar%20fotografías%20inolvidables.%20Un%20lugar%20ideal%20para%20escapar%20del%20bullicio%20y%20conectar%20con%20la%20naturaleza%20en%20su%20estado%20más%20puro.&price=25&image=%2Fimages%2Fgran-grocier.webp&duration=4%20horas"
  >
    <Button size="lg" variant="default" className="hover:bg-blue-400 text-base font-medium">
      Reservar Ahora <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - Rediseñado con un diseño más profesional */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-none">TESTIMONIOS</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Lo Que Dicen Nuestros Clientes
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2x2 mx-auto">
              Experiencias reales de quienes han disfrutado de nuestras excursiones
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonio 1 - Rediseñado */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary">
                  <Image
                    src="/images/testimonial.webp"
                    alt="Foto de Elysa M."
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">Elysa M.</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">
  &quot;Estuvimos en Montecristi en familia un grupo de 18 personas en Semana Santa y destinamos un día para
  tomar un tour con Soraya y Leonardo Tours. A pesar de que el día estuvo muy nublado, la pasamos genial
  con Soraya y el staff. Son muy responsables, se apegan a sus medidas de seguridad, el bote estaba en
  excelentes condiciones y limpio, la comida espectacular.&quot;
</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <Image src="/images/tripadvisor-icon.webp" alt="TripAdvisor" width={24} height={24} className="mr-2" />
                  <span className="text-sm text-gray-600">TripAdvisor</span>
                </div>
                <a
                  href="https://www.tripadvisor.es/ShowUserReviews-g1605231-d7391988-r944685211-Soraya_Y_Leonardo_Tours-Monte_Cristi_Monte_Cristi_Province_Dominican_Republic.html?m=19905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary hover:underline font-medium"
                >
                  Ver reseña
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>

            {/* Testimonio 2 - Rediseñado */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary">
                  <Image
                    src="/images/testimonial3.webp"
                    alt="Foto de José Enrique Perez German"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">José Enrique Perez German</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">
  &quot;Te sentirás como en casa con las atenciones de Doña Soraya, es un tour operador de la zona que te puede
  armar un viaje en minutos a partir d tus necesidades. Además cuenta con una tienda con de todo lo que
  puedas necesitar para tu viaje. Los tours son Pet Friendly. Pregunta por el paseo en el morro, el banco
  de arena o los cayos&quot;
</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <Image src="/images/google-map-icon.webp" alt="Google Maps" width={24} height={24} className="mr-2" />
                  <span className="text-sm text-gray-600">Google Maps</span>
                </div>
                <a
                  href="https://g.co/kgs/WGjwHak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary hover:underline font-medium"
                >
                  Ver reseña
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>

            {/* Testimonio 3 - Rediseñado */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary">
                  <Image
                    src="/images/testimonial2.webp"
                    alt="Foto de Angee A"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">Angee A</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">
  &quot;Excelente, el tour es bien organizado y privado, tienen diferentes lugares según lo que desees hacer
  durante tu estadía, super recomendado!!&quot;
</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <Image src="/images/tripadvisor-icon.webp" alt="TripAdvisor" width={24} height={24} className="mr-2" />
                  <span className="text-sm text-gray-600">TripAdvisor</span>
                </div>
                <a
                  href="https://www.tripadvisor.es/ShowUserReviews-g1605231-d7391988-r969591659-Soraya_Y_Leonardo_Tours-Monte_Cristi_Monte_Cristi_Province_Dominican_Republic.html?m=19905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary hover:underline font-medium"
                >
                  Ver reseña
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Follow Us on Social Media - Rediseñado con un aspecto más moderno */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-none">CONÉCTATE CON NOSOTROS</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Síguenos en Redes Sociales
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2x2 mx-auto">
              Mantente al día con nuestras últimas aventuras, ofertas especiales y descubre la belleza de Montecristi
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10">
            {/* Instagram - Rediseñado */}
            <motion.a
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              href="https://www.instagram.com/sorayayleonardotours/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-8px] group"
            >
              <div className="mb-6 p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Image src="/images/instagram-icon.webp" alt="Instagram" width={40} height={40} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 mb-2">Instagram</span>
              <span className="text-sm text-gray-500">@sorayayleonardotours</span>
            </motion.a>

            {/* TikTok - Rediseñado */}
            <motion.a
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              href="https://www.tiktok.com/@sorayaleonardotou"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-8px] group"
            >
              <div className="mb-6 p-4 bg-gradient-to-br from-black via-gray-800 to-gray-700 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Image src="/images/tiktok-icon.webp" alt="TikTok" width={40} height={40} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 mb-2">TikTok</span>
              <span className="text-sm text-gray-500">@sorayaleonardotou</span>
            </motion.a>

            {/* Facebook - Rediseñado */}
            <motion.a
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              href="https://www.facebook.com/sorayayleonardo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-8px] group"
            >
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Image src="/images/facebook-icon.webp" alt="Facebook" width={40} height={40} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 mb-2">Facebook</span>
              <span className="text-sm text-gray-500">@sorayayleonardo</span>
            </motion.a>
          </div>
        </div>
      </section>
    </main>
  )
}
