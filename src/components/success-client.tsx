"use client";

import { useState } from "react";
import { generateProfessionalPDFBuffer } from "@/lib/pdf-buffer";
import { useTranslations, useLocale } from "next-intl";
import Confetti from "react-confetti";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign, Calendar, Clock, Users, User, FileDown, MapPin,
  CheckCircle, Mail, Phone, Ticket
} from "lucide-react";

interface Child {
  age: number;
}

interface ReservationData {
  reservationCode: string;
  name: string;
  email: string;
  phone: string;
  tourName: string;
  selectedDate: string;
  selectedTime: string;
  adults: number;
  children: Child[];
  amount?: number;
  locale?: string;
}

export default function SuccessClient({
  reservation,
}: { reservation: ReservationData; locale: string }) {
  const t = useTranslations("Reservation");
  const locale = useLocale();

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showConfetti] = useState(true);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const buffer = await generateProfessionalPDFBuffer({ ...reservation, locale });
      const blob = new Blob([buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Reserva-${reservation.reservationCode}.pdf`;
      a.click();
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12 px-4">
      {showConfetti && <Confetti />}
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t("successTitle")}</h1>
          <p className="text-xl text-gray-600">{t("successThanks", { name: reservation.name.split(" ")[0] || "" })}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  {t("reservationDetails")}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {t("reservationCode")}: {reservation.reservationCode}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 text-lg">{t("tourInfo")}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">{reservation.tourName}</p>
                          <p className="text-sm text-gray-600">{t("selectedTour")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{reservation.selectedDate}</p>
                          <p className="text-sm text-gray-600">{t("tourDate")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{reservation.selectedTime}</p>
                          <p className="text-sm text-gray-600">{t("departureTime")}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 text-lg">{t("participants")}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">{reservation.adults} {t("adults")}</p>
                          <p className="text-sm text-gray-600">{t("adultParticipants")}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">{reservation.children?.length || 0} {t("children")}</p>
                          <p className="text-sm text-gray-600">{t("childParticipants")}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">${reservation.amount?.toFixed(2) || "0.00"} USD</p>
                          <p className="text-sm text-gray-600">{t("totalPaid")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{t("contactInfo")}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{reservation.email}</p>
                        <p className="text-sm text-gray-600">{t("confirmationEmail")}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{reservation.phone}</p>
                        <p className="text-sm text-gray-600">{t("contactPhone")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Badge variant="secondary" className="bg-green-100 text-green-800 mb-4">
                  {t("reservationConfirmed")}
                </Badge>
                <p className="text-sm text-gray-600 mb-4">{t("reservationConfirmedText")}</p>
                <div className="text-2xl font-bold text-green-600">{t("paid")}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("actions")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF} className="w-full" size="lg">
                  <FileDown className="w-4 h-4 mr-2" />
                  {isGeneratingPDF ? "Generando..." : t("downloadPdf")}
                </Button>

                <Link href={`/${locale}/excursions`} className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    {t("backToTours")}
                  </Button>
                </Link>

                <a
                  href="https://www.google.com/maps/place/Soraya+y+Leonardo+tours/@19.861429,-71.6595041,618m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8eb143c255555555:0x8fba3d043e259106!8m2!3d19.861424!4d-71.6569292!16s%2Fg%2F11bxbz_84b?entry=ttu&g_ep=EgoyMDI1MDYxMC4xIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full" size="lg">
                    <MapPin className="w-4 h-4 mr-2" />
                    {t("viewLocation")}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
