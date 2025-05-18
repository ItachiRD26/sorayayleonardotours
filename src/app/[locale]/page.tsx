"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Ship, Calendar, MapPin, Users, Star, ArrowRight, ChevronRight, ArrowUpRight } from "lucide-react"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { motion } from "framer-motion"
import FeaturedTours from "@/components/featuredtours";
import Link from "next/link"
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

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
const cards = [
    { id: 'card-1', icon: <Ship className="w-10 h-10" /> },
    { id: 'card-2', icon: <Users className="w-10 h-10" /> },
    { id: 'card-3', icon: <MapPin className="w-10 h-10" /> },
    { id: 'card-4', icon: <Calendar className="w-10 h-10" /> }
  ]

const testimonials = [
    {
      id: 'testimonials-1',
      image: '/images/testimonial.webp',
      source: 'TripAdvisor',
      link: 'https://www.tripadvisor.es/ShowUserReviews-g1605231-d7391988-r944685211-Soraya_Y_Leonardo_Tours-Monte_Cristi_Monte_Cristi_Province_Dominican_Republic.html?m=19905'
    },
    {
      id: 'testimonials-2',
      image: '/images/testimonial3.webp',
      source: 'Google Maps',
      link: 'https://g.co/kgs/WGjwHak'
    },
    {
      id: 'testimonials-3',
      image: '/images/testimonial2.webp',
      source: 'TripAdvisor',
      link: 'https://www.tripadvisor.es/ShowUserReviews-g1605231-d7391988-r969591659-Soraya_Y_Leonardo_Tours-Monte_Cristi_Monte_Cristi_Province_Dominican_Republic.html?m=19905'
    }
  ]

export default function Home() {
  const t = useTranslations('Home')
  const locale = useLocale()
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
              {t('hero-title')}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-2xl text-white/90 drop-shadow-md max-w-3xl mx-auto font-light leading-relaxed"
            >
              {t('hero-description')}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <Link href={`/${locale}/excursions/reservations?tourId=tour-1`}>
    <Button size="lg" variant="default" className="hover:bg-blue-400 text-base font-medium">
      {t('book-button')} <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </Link>
  <Link href= {`/${locale}/excursions`}>
    <Button size="lg" variant="default" className="hover:bg-blue-400 text-base font-medium">
      {t('hero-button-two')}
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
 
  {/* Why Choose Us Section - Rediseñado con un diseño más limpio */}
  <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            {t('why-choose-us-title')}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t('why-choose-us-subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:translate-y-[-8px]"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-primary/10 rounded-full text-primary">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t(`${card.id}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`${card.id}.description`)}
              </p>
            </motion.div>
          ))}
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
                {t('call-action-title')}
              </motion.h2>

              <motion.p variants={fadeInUp} className="text-xl text-white/90 mb-8 leading-relaxed">
                {t('call-action-description')}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Link href={`/${locale}/excursions/reservations?tourId=tour-1`}>
    <Button size="lg" variant="default" className="hover:bg-blue-400 text-base font-medium">
      {t('book-button')} <ArrowRight className="ml-2 h-4 w-4" />
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
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('testimonials-title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2x2 mx-auto">
            {t('testimonials-subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary">
                  <Image
                    src={testimonial.image}
                    alt={`Foto de ${t(`${testimonial.id}.name`)}`}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">{t(`${testimonial.id}.name`)}</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          testimonial.id === 'testimonials-3' && i === 4
                            ? 'fill-gray-200 text-gray-200'
                            : 'fill-amber-400 text-amber-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">
                &quot;{t(`${testimonial.id}.description`)}&quot;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <Image
                    src={
                      testimonial.source === 'Google Maps'
                        ? '/images/google-map-icon.webp'
                        : '/images/tripadvisor-icon.webp'
                    }
                    alt={testimonial.source}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">{testimonial.source}</span>
                </div>
                <a
                  href={testimonial.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary hover:underline font-medium"
                >
                  {t('view-review')}
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
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
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('social-title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('social-subtitle')}
          </motion.p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10">
          {/* Instagram */}
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
              <Image src="/images/instagram-icon.webp" alt="Instagram" width={40} height={40} />
            </div>
            <span className="text-xl font-bold text-gray-900 mb-2">{t('instagram')}</span>
            <span className="text-sm text-gray-500">@sorayayleonardotours</span>
          </motion.a>

          {/* TikTok */}
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
              <Image src="/images/tiktok-icon.webp" alt="TikTok" width={40} height={40} />
            </div>
            <span className="text-xl font-bold text-gray-900 mb-2">{t('tiktok')}</span>
            <span className="text-sm text-gray-500">@sorayaleonardotou</span>
          </motion.a>

          {/* Facebook */}
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
              <Image src="/images/facebook-icon.webp" alt="Facebook" width={40} height={40} />
            </div>
            <span className="text-xl font-bold text-gray-900 mb-2">{t('facebook')}</span>
            <span className="text-sm text-gray-500">@sorayayleonardo</span>
          </motion.a>
        </div>
      </div>
    </section>
    </main>
  )
}
