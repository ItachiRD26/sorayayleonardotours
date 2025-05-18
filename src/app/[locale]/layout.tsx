import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"

import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingScreenWrapper from "@/components/loadingscreen-wrapper"
import CookieBanner from "@/components/cookiebanner"
import WhatsAppButton from "@/components/whatsappbutton"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// SEO y metadata
export const metadata: Metadata = {
  title: "Soraya y Leonardo Tours | Excursiones Marítimas en Montecristi",
  description:
    "Descubre las maravillas de Montecristi con Soraya y Leonardo Tours. Ofrecemos excursiones en bote, snorkel, visitas a manglares y más, brindando experiencias inolvidables en el mar.",
  icons: { icon: "/images/logo.webp" }
}

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }]
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!["es", "en"].includes(params.locale)) notFound();
  const messages = (await import(`@/messages/${params.locale}.json`)).default;

  return (
    <html lang={params.locale} className="overflow-x-hidden">
      <meta name="google-adsense-account" content="ca-pub-6618092093224881" />
      <body className={`${inter.className} overflow-x-hidden`}>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6618092093224881"
          crossOrigin="anonymous"
        ></script>

        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LoadingScreenWrapper>
              <div className="overflow-x-hidden w-full">
                <Header />
                <main className="pt-20 overflow-x-hidden w-full">{children}</main>
                <Footer />
                <CookieBanner />
                <WhatsAppButton />
              </div>
            </LoadingScreenWrapper>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

