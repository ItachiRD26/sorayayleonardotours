'use client';
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export default function ReservationLoadingPage() {
  const locale = useLocale();
  const t = useTranslations('Reservation');
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setError(true), 12000);
    return () => clearTimeout(timeout);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center text-gray-800 px-4">
        <AlertCircle className="text-red-500 w-10 h-10 mb-4" />
        <h1 className="text-xl font-bold mb-2">{t('loadingErrorTitle')}</h1>
        <p className="text-sm text-gray-600 mb-4">{t('loadingErrorDescription')}</p>
        <div className="flex gap-4">
          <Button onClick={() => router.back()}>{t('goBack')}</Button>
          <Button onClick={() => router.push(`/${locale}/excursions`)}>{t('goToTours')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 text-gray-800 text-center px-4">
      <Loader2 className="animate-spin w-12 h-12 text-blue-600 mb-4" />
      <h1 className="text-xl font-semibold mb-2">{t('loadingTitle')}</h1>
      <p className="text-sm text-gray-600">{t('loadingDescription')}</p>
    </div>
  );
}
