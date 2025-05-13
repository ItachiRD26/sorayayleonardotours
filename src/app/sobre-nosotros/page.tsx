"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Anchor, Heart, Shield, Users, Globe } from "lucide-react"

export default function SobreNosotros() {
  // Animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
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

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-600 to-blue-600 py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[url('/images/isla-cabra.jpg?height=800&width=1600')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <Badge variant="outline" className="bg-white/20 text-white mb-6 px-4 py-1 text-sm">
                  NUESTRA HISTORIA
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Sobre Nosotros
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Conoce la historia detrás de Soraya y Leonardo Tours, una empresa familiar dedicada a crear experiencias
                inolvidables en el mar de Montecristi.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4 px-3 py-1 bg-sky-100 text-sky-700 border-none">NUESTROS VALORES</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Lo que nos define
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto text-lg">
            Estos principios guían cada excursión y cada interacción con nuestros clientes
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-sky-100 rounded-full text-sky-600">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Pasión por el Mar</h3>
            <p className="text-gray-600">
              Nuestro amor por el océano nos impulsa a compartir sus maravillas con cada visitante.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-sky-100 rounded-full text-sky-600">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Seguridad Primero</h3>
            <p className="text-gray-600">
              Implementamos los más altos estándares de seguridad en cada una de nuestras excursiones.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-sky-100 rounded-full text-sky-600">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Turismo Sostenible</h3>
            <p className="text-gray-600">
              Nos comprometemos a proteger el medio ambiente marino y promover prácticas responsables.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sección 1: Nuestros Inicios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Imagen */}
            <motion.div variants={fadeInUp} className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about-1.jpg"
                alt="Historia de Soraya y Leonardo Tours"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sky-700 font-medium">
                Desde 2010
              </div>
            </motion.div>

            {/* Texto */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <Badge className="px-3 py-1 bg-sky-100 text-sky-700 border-none mb-4">NUESTRA HISTORIA</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nuestros Inicios</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                En el año 2010, Soraya y Leonardo decidieron unir su amor por el mar y su pasión por el turismo para
                crear una empresa que ofreciera excursiones únicas en la costa de Montecristi. Lo que comenzó como un
                pequeño negocio familiar, rápidamente se convirtió en una referencia para los amantes del mar en la
                región.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Con una flota de botes modernos y un equipo de guías expertos, logramos ofrecer experiencias que
                combinan aventura, seguridad y diversión.
              </p>
              <div className="pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-full text-sky-600">
                    <Anchor className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Experiencia Náutica</h4>
                    <p className="text-gray-600">Más de 13 años navegando las aguas de Montecristi</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sección 2: Nuestra Misión */}
      <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Texto */}
            <motion.div variants={fadeInUp} className="space-y-6 order-2 md:order-1">
              <Badge className="px-3 py-1 bg-sky-100 text-sky-700 border-none mb-4">NUESTRA MISIÓN</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Lo Que Nos Impulsa</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                En Soraya y Leonardo Tours, nuestra misión es conectar a las personas con la belleza del mar a través de
                experiencias auténticas y memorables. Queremos que cada cliente se sienta parte de nuestra familia y
                disfrute de momentos únicos en un entorno natural impresionante.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Nos esforzamos por ofrecer un servicio personalizado, donde la seguridad y la satisfacción del cliente
                son nuestra prioridad.
              </p>
              <div className="pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-full text-sky-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Servicio Personalizado</h4>
                    <p className="text-gray-600">Atención individualizada para cada grupo</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Imagen */}
            <motion.div
              variants={fadeInUp}
              className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl order-1 md:order-2"
            >
              <Image
                src="/images/about-2.jpg"
                alt="Misión de Soraya y Leonardo Tours"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sky-700 font-medium">
                Experiencias Auténticas
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sección 3: Nuestra Filosofía */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Imagen */}
            <motion.div variants={fadeInUp} className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about-3.jpg"
                alt="Filosofía de Soraya y Leonardo Tours"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sky-700 font-medium">
                Turismo Sostenible
              </div>
            </motion.div>

            {/* Texto */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <Badge className="px-3 py-1 bg-sky-100 text-sky-700 border-none mb-4">NUESTRA FILOSOFÍA</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Compromiso con el Entorno</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Creemos en el turismo responsable y sostenible. Por eso, nos comprometemos a proteger el medio ambiente
                marino y a promover prácticas que respeten la flora y fauna local.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Cada excursión está diseñada para minimizar el impacto ambiental, mientras maximizamos la diversión y el
                aprendizaje de nuestros clientes.
              </p>
              <div className="pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-full text-sky-600">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Conservación Marina</h4>
                    <p className="text-gray-600">Protegemos los ecosistemas que visitamos</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
    </div>
  )
}
