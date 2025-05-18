'use client';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { useLocale } from "next-intl";

export default function ReservationErrorPage() {
  const t = useTranslations('Reservation');
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-red-50 text-gray-800 px-4">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h1 className="text-xl font-bold mb-2">{t('errorTitle')}</h1>
      <p className="text-sm text-gray-600 mb-6">{t('errorDescription')}</p>
      <div className="flex gap-4">
        <Button onClick={() => router.back()}>{t('goBack')}</Button>
        <Button onClick={() => router.push(`/${locale}/excursions`)}>{t('goToTours')}</Button>
      </div>
    </div>
  );
}
