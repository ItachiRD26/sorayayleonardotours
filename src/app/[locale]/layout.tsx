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

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params?.locale || "es";
  const isEnglish = locale === "en";
  const baseUrl = "https://sorayayleonardotours.com";

  const title = isEnglish
    ? "Soraya y Leonardo Tours | Maritime Excursions in Montecristi"
    : "Soraya y Leonardo Tours | Excursiones Marítimas en Montecristi";

  const description = isEnglish
    ? "Discover Montecristi like never before with Soraya y Leonardo Tours. Enjoy boat tours, snorkeling, mangrove visits, and more."
    : "Explora Montecristi con Soraya y Leonardo Tours. Disfruta excursiones en bote, snorkel, manglares y más.";

  const url = `${baseUrl}/${locale}`;

  return {
    title,
    description,
    keywords: isEnglish
      ? [
          "Montecristi boat tours",
          "snorkeling Dominican Republic",
          "Soraya y Leonardo Tours",
          "Goat Island",
          "Gran Grosier Sandbank",
        ]
      : [
          "excursiones en Montecristi",
          "snorkel República Dominicana",
          "Soraya y Leonardo Tours",
          "Isla Cabra",
          "Banco de Arena Gran Grosier",
        ],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: isEnglish ? "en_US" : "es_DO",
      siteName: "Soraya y Leonardo Tours",
      images: [
        {
          url: `${baseUrl}/images/og-default.webp`,
          alt: "Soraya y Leonardo Tours",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/og-default.webp`],
    },
    icons: {
      icon: "/images/logo.webp",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!["es", "en"].includes(params.locale)) notFound();
  const messages = (await import(`@/messages/${params.locale}.json`)).default;

  return (
    <html lang={params.locale} className="overflow-x-hidden">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6618092093224881" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Soraya y Leonardo Tours",
              url: "https://sorayayleonardotours.com",
              logo: "https://sorayayleonardotours.com/images/logo.webp",
              image: "https://sorayayleonardotours.com/images/og-default.webp",
              telephone: "+1-809-962-2259",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Montecristi",
                addressCountry: "DO",
              },
              sameAs: [
                "https://www.facebook.com/sorayayleonardotours",
                "https://www.instagram.com/sorayayleonardotours",
              ],
            }),
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

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6618092093224881"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
