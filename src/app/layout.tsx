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
  title: "Soraya y Leonardo Tours | Excursiones Maritimas",
  description:
    "Descubre la belleza del mar con nuestras excursiones en bote. Ofrecemos tours de snorkel, pesca deportiva, paseos al atardecer y mucho más.",
  icons: {
    icon: "/images/logo.png", // Ruta relativa al archivo en la carpeta public
  },
}

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
                {" "}
                {/* Añade overflow-x-hidden para evitar scroll horizontal */}
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
