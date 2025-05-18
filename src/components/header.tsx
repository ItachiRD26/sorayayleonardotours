'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import LanguageSwitcher from "@/components/languageswitcher"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const t = useTranslations('Header')
  const locale = useLocale()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <Image src="/images/logo.webp" alt="Logo de la empresa" width={200} height={200} className="w-48 h-auto" />
          </Link>
          <div className="hidden md:block">
          <LanguageSwitcher />
          </div>

          {/* Centered Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link
              href={`/${locale}/excursions`}
              className="text-lg font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
            >
              {t('excursions')}
            </Link>
            <Link
              href={`/${locale}/about-us`}
              className="text-lg font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
            >
              {t('about-us')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-lg font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Socials + CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://www.instagram.com/sorayayleonardotours/"
              target="_blank"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/images/instagram-icon.webp" alt="Instagram" width={24} height={24} className="h-7 w-7" />
            </Link>
            <Link
              href="https://www.tiktok.com/@sorayaleonardotou"
              target="_blank"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/images/tiktok-icon.webp" alt="TikTok" width={24} height={24} className="h-7 w-7" />
            </Link>
            <Link
              href="https://www.facebook.com/sorayayleonardo/"
              target="_blank"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src="/images/facebook-icon.webp" alt="Facebook" width={24} height={24} className="h-7 w-7" />
            </Link>

            <Link href={`/${locale}/excursions/reservations?tourId=tour-1`} className="ml-4">
            <Button variant="default" className="font-bold px-5 py-2">
            {t('book-now')}
            </Button>
            </Link>

          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <LanguageSwitcher />
            <div className="pt-4">
            </div>
            <nav className="flex flex-col space-y-3">
              <Link
                href={`/${locale}/excursions`}
                className="text-sm font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('excursions')}
              </Link>
              <Link
                href={`/${locale}/about-us`}
                className="text-sm font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about-us')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-sm font-semibold text-gray-700 hover:text-sea-light-custom transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>

              {/* Socials in Mobile */}
              <div className="flex space-x-4 pt-4">
                <Link href="https://www.facebook.com/sorayayleonardo/">
                  <Image src="/images/facebook-icon.webp" alt="Facebook" width={24} height={24} className="h-6 w-6" />
                </Link>
                <Link href="https://www.instagram.com/sorayayleonardotours/">
                  <Image src="/images/instagram-icon.webp" alt="Instagram" width={24} height={24} className="h-6 w-6" />
                </Link>
                <Link href="https://www.tiktok.com/@sorayaleonardotou">
                  <Image src="/images/tiktok-icon.webp" alt="TikTok" width={24} height={24} className="h-6 w-6" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
