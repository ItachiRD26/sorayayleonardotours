
import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingScreenWrapper from "@/components/loadingscreen-wrapper"
import CookieBanner from "@/components/cookiebanner"
import WhatsAppButton from "@/components/whatsappbutton"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Soraya y Leonardo Tours | Excursiones Marítimas en Montecristi",
  description:
    "Descubre las maravillas de Montecristi con Soraya y Leonardo Tours. Ofrecemos excursiones en bote, snorkel, visitas a manglares y más, brindando experiencias inolvidables en el mar.",
  keywords: [
    "Excursiones Montecristi",
    "Tours en bote",
    "Snorkel Montecristi",
    "Manglares Montecristi",
    "Soraya y Leonardo Tours",
    "Turismo en República Dominicana"
  ],
  authors: [{ name: "Soraya y Leonardo Tours", url: "https://sorayayleonardotours.com" }],
  openGraph: {
    title: "Soraya y Leonardo Tours | Excursiones Marítimas en Montecristi",
    description:
      "Vive aventuras únicas en Montecristi con nuestras excursiones marítimas. Explora manglares, disfruta del snorkel y descubre la belleza natural de la región.",
    url: "https://sorayayleonardotours.com",
    siteName: "Soraya y Leonardo Tours",
    images: [
      {
        url: "https://sorayayleonardotours.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soraya y Leonardo Tours - Excursiones en Montecristi",
      },
    ],
    locale: "es_DO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soraya y Leonardo Tours | Excursiones Marítimas en Montecristi",
    description:
      "Explora Montecristi con nuestras excursiones en bote, snorkel y visitas a manglares. ¡Una experiencia inolvidable te espera!",
    creator: "@sorayaleonardotours",
    images: ["https://sorayayleonardotours.com/images/og-image.jpg"],
  },
  icons: {
    icon: "/images/logo.png",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LoadingScreenWrapper>
            <div className="overflow-x-hidden w-full">
              <Header />
              <main className="pt-20 overflow-x-hidden w-full">
                {children}
              </main>
              <Footer />
              <CookieBanner />
              <WhatsAppButton />
            </div>
          </LoadingScreenWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
