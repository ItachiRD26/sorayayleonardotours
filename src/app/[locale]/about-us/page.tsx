"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Anchor, Heart, Shield, Users, Globe } from "lucide-react"
import { useTranslations } from "next-intl"

export default function SobreNosotros() {
  const t = useTranslations("SobreNosotros")

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-600 to-blue-600 py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[url('/images/isla-cabra.webp?height=800&width=1600')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeIn}>
                <Badge variant="outline" className="bg-white/20 text-white mb-6 px-4 py-1 text-sm">
                  {t("badge")}
                </Badge>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t("hero-title")}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-white/90 text-lg md:text-xl mb-8 max-w-2x2 mx-auto">
                {t("hero-subtitle")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
          <motion.div variants={fadeIn}>
            <Badge className="mb-4 px-3 py-1 bg-sky-100 text-sky-700 border-none">{t("values-badge")}</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            {t("values-title")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 max-w-2x2 mx-auto text-lg">
            {t("values-subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Feature icon={<Heart className="w-8 h-8" />} title={t("value-1-title")} desc={t("value-1-desc")} />
          <Feature icon={<Shield className="w-8 h-8" />} title={t("value-2-title")} desc={t("value-2-desc")} />
          <Feature icon={<Globe className="w-8 h-8" />} title={t("value-3-title")} desc={t("value-3-desc")} />
        </div>
      </section>

      {/* Sección 1: Inicios */}
      <TwoColumnSection
        image="/images/about-1.webp"
        badge={t("start-badge")}
        title={t("start-title")}
        paragraphs={[t("start-desc-1"), t("start-desc-2")]}
        featureTitle={t("start-subtitle-title")}
        featureDesc={t("start-subtitle-desc")}
        icon={<Anchor className="w-6 h-6" />}
        imageLabel={t("image-one-label")}
      />

      {/* Sección 2: Misión */}
      <TwoColumnSection
        image="/images/about-2.webp"
        badge={t("mission-badge")}
        title={t("mission-title")}
        paragraphs={[t("mission-desc-1"), t("mission-desc-2")]}
        featureTitle={t("mission-subtitle-title")}
        featureDesc={t("mission-subtitle-desc")}
        icon={<Users className="w-6 h-6" />}
        imageLabel={t("image-two-label")}
        reverse
      />

      {/* Sección 3: Filosofía */}
      <TwoColumnSection
        image="/images/about-3.webp"
        badge={t("philosophy-badge")}
        title={t("philosophy-title")}
        paragraphs={[t("philosophy-desc-1"), t("philosophy-desc-2")]}
        featureTitle={t("philosophy-subtitle-title")}
        featureDesc={t("philosophy-subtitle-desc")}
        icon={<Globe className="w-6 h-6" />}
        imageLabel={t("image-three-label")}
      />
    </div>
  )
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-sky-100 rounded-full text-sky-600">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </motion.div>
  )
}

function TwoColumnSection({
  image, badge, title, paragraphs, icon, featureTitle, featureDesc, imageLabel, reverse
}: {
  image: string,
  badge: string,
  title: string,
  paragraphs: string[],
  icon: React.ReactNode,
  featureTitle: string,
  featureDesc: string,
  imageLabel: string,
  reverse?: boolean
}) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  return (
    <section className={`py-20 ${reverse ? "bg-gradient-to-b from-sky-50 to-white" : "bg-white"}`}>
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}>
          <motion.div variants={fadeInUp} className={`relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl ${reverse ? "order-1 md:order-2" : ""}`}>
            <Image src={image} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sky-700 font-medium">
              {imageLabel}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className={`space-y-6 ${reverse ? "order-2 md:order-1" : ""}`}>
            <Badge className="px-3 py-1 bg-sky-100 text-sky-700 border-none mb-4">{badge}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{title}</h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="text-gray-700 text-lg leading-relaxed">{p}</p>
            ))}
            <div className="pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-full text-sky-600">{icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{featureTitle}</h4>
                  <p className="text-gray-600">{featureDesc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
