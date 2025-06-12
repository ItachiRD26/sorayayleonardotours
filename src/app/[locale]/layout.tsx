import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoadingScreenWrapper from "@/components/loadingscreen-wrapper";
import CookieBanner from "@/components/cookiebanner";
import WhatsAppButton from "@/components/whatsappbutton";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params?.locale || "es";
  const isEnglish = locale === "en";

  return {
    title: isEnglish
      ? "Soraya y Leonardo Tours | Maritime Excursions in Montecristi"
      : "Soraya y Leonardo Tours | Excursiones Marítimas en Montecristi",
    description: isEnglish
      ? "Discover Montecristi like never before with Soraya y Leonardo Tours. Enjoy boat tours, snorkeling, mangrove visits, and more."
      : "Explora Montecristi con Soraya y Leonardo Tours. Disfruta excursiones en bote, snorkel, manglares y más.",
    keywords: isEnglish
      ? [
          "Montecristi boat tours",
          "snorkeling Dominican Republic",
          "Soraya y Leonardo Tours",
          "Goat Island",
          "Gran Grosier Sandbank"
        ]
      : [
          "excursiones en Montecristi",
          "snorkel República Dominicana",
          "Soraya y Leonardo Tours",
          "Isla Cabra",
          "Banco de Arena Gran Grosier"
        ],
    openGraph: {
      title: isEnglish
        ? "Soraya y Leonardo Tours | Maritime Excursions in Montecristi"
        : "Soraya y Leonardo Tours | Excursiones Marítimas en Montecristi",
      description: isEnglish
        ? "Best maritime tours in Montecristi, Dominican Republic."
        : "Las mejores excursiones marítimas en Montecristi, República Dominicana.",
      images: [
        {
          url: "/images/og-default.webp",
          alt: "Soraya y Leonardo Tours",
        }
      ],
      locale: isEnglish ? "en_US" : "es_DO",
      type: "website",
      url: isEnglish
        ? "https://sorayayleonardotours.com/en"
        : "https://sorayayleonardotours.com",
    },
    icons: {
      icon: "/images/logo.webp"
    }
  };
}

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!["es", "en"].includes(params.locale)) notFound();
  const messages = (await import(`@/messages/${params.locale}.json`)).default;

  return (
    <html lang={params.locale} className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Soraya y Leonardo Tours",
              image: "https://sorayayleonardotours.com/images/logo.webp",
              "@id": "https://sorayayleonardotours.com",
              url: "https://sorayayleonardotours.com",
              telephone: "+1-829-679-3734",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Montecristi",
                addressLocality: "Monte Cristi",
                addressRegion: "Monte Cristi",
                postalCode: "62000",
                addressCountry: "DO"
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                opens: "08:00",
                closes: "18:00"
              },
              sameAs: [
                "https://www.facebook.com/sorayayleonardo/",
                "https://www.instagram.com/sorayayleonardotours/",
                "https://www.tiktok.com/@sorayaleonardotou"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
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
