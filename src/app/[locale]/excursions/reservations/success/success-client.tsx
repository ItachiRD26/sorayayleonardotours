'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import {
  Calendar,
  Clock,
  Users,
  User,
  FileDown,
  MapPin,
} from "lucide-react";
import jsPDF from "jspdf";

interface ReservationData {
  reservationCode: string;
  name: string;
  tourName: string;
  selectedDate: string;
  selectedTime: string;
  adults: number;
  children: number;
  email?: string;
  phone?: string;
  paypalEmail?: string;
}

export default function SuccessClient() {
  const locale = useLocale();
  const t = useTranslations('Reservation');
  const [showConfetti, setShowConfetti] = useState(true);
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [warnings, setWarnings] = useState<{ calendarFailed?: boolean; emailFailed?: boolean }>({});

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    const storedReservation = localStorage.getItem("reservationData");
    if (storedReservation) {
      setReservation(JSON.parse(storedReservation));
    }
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const warn = localStorage.getItem("reservationWarnings");
    if (warn) {
      setWarnings(JSON.parse(warn));
      localStorage.removeItem("reservationWarnings");
    }
  }, []);

  const handleDownloadPDF = () => {
    if (!reservation) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(t('successTitle'), 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`${t('reservationCode')}: ${reservation.reservationCode}`, 20, 40);
    doc.text(`Nombre: ${reservation.name}`, 20, 50);
    doc.text(`${t('tour')}: ${reservation.tourName}`, 20, 60);
    doc.text(`${t('date')}: ${reservation.selectedDate}`, 20, 70);
    doc.text(`${t('time')}: ${reservation.selectedTime}`, 20, 80);
    doc.text(`${t('adults')}: ${reservation.adults}`, 20, 90);
    doc.text(`${t('children')}: ${reservation.children}`, 20, 100);
    doc.text(`${t('email')}: ${reservation.email}`, 20, 110);
    doc.text(`${t('phone')}: ${reservation.phone}`, 20, 120);
    doc.setFontSize(10);
    doc.text("Gracias por reservar con Soraya & Leonardo Tours.", 20, 140);
    doc.save(`reserva-${reservation.reservationCode}.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
      {showConfetti && <Confetti />}
      <motion.div
        id="reservation-summary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">{t('successTitle')}</h1>
        {warnings.calendarFailed && <p className="text-sm text-red-500">{t('calendarFail')}</p>}
        {warnings.emailFailed && <p className="text-sm text-orange-500">{t('emailFail')}</p>}
        <p className="text-gray-600 mb-6">{t('successThanks', { name: reservation?.name?.split(" ")[0] || '' })}</p>
        {reservation && (
          <div className="text-gray-700 text-left space-y-3 mb-6">
            <p><strong>{t('reservationCode')}:</strong> {reservation.reservationCode}</p>
            <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-sky-600" /> {reservation.selectedDate}</p>
            <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-sky-600" /> {reservation.selectedTime}</p>
            <p className="flex items-center gap-2"><User className="w-4 h-4 text-sky-600" /> {t('adults')}: {reservation.adults}</p>
            <p className="flex items-center gap-2"><Users className="w-4 h-4 text-sky-600" /> {t('children')}: {reservation.children}</p>
            <p><strong>{t('tour')}:</strong> {reservation.tourName}</p>
            <p><strong>{t('email')}:</strong> {reservation.email}</p>
            <p><strong>{t('phone')}:</strong> {reservation.phone}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <Button onClick={handleDownloadPDF} variant="default"><FileDown className="w-4 h-4 mr-2" /> {t('downloadPdf')}</Button>
          <Link href={`/${locale}/excursions`}><Button>{t('backToTours')}</Button></Link>
          <a href="https://www.google.com/maps/place/Soraya+y+Leonardo+tours" target="_blank" rel="noopener noreferrer">
            <Button variant="default"><MapPin className="w-4 h-4 mr-2" /> {t('viewLocation')}</Button>
          </a>
        </div>
        <p className="text-gray-500 mt-8 text-sm">{t('emailInfo')}</p>
      </motion.div>
    </div>
  );
}
