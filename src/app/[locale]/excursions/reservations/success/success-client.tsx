"use client";
import { useTranslations } from "next-intl";
type TranslateFunction = ReturnType<typeof useTranslations>;
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "next-intl";
import {
  DollarSign,
  Calendar,
  Clock,
  Users,
  User,
  FileDown,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  Ticket,
  Share2,
} from "lucide-react";

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
  amount?: number;
}
const generateProfessionalPDF = async (
  reservation: ReservationData,
  t: TranslateFunction
) => {
  const { jsPDF } = await import("jspdf");
  
  const doc = new jsPDF();

  const primaryColor: [number, number, number] = [41, 128, 185];
  const secondaryColor: [number, number, number] = [52, 73, 94];
  const accentColor: [number, number, number] = [231, 76, 60];
  const lightGray: [number, number, number] = [236, 240, 241];

  // Ajuste: margen superior para evitar corte visual
  doc.setFillColor(...primaryColor);
  doc.rect(0, 5, 210, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Soraya y Leonardo Tours", 20, 23);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(t("invoice-subtitle"), 20, 30);

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(t("label-invoice"), 150, 20);
  doc.setFontSize(12);
  doc.text(`#${reservation.reservationCode}`, 150, 28);

  doc.setTextColor(...secondaryColor);
  doc.setFontSize(10);
  doc.text("www.sorayayleonardotours.com", 20, 50);
  doc.text("administracion@sorayayleonardotours.com", 20, 55);
  doc.text("Tel: +1 (809) 962-2259", 20, 60);
  doc.text("RNC: 131217656", 20, 65);
  doc.text(`${t("issueDate")}: ${new Date().toLocaleDateString()}`, 150, 50);
  doc.setTextColor(255, 0, 0); // rojo puro
  doc.text(`${t("tourdate")}: ${reservation.selectedDate}`, 150, 55);

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(20, 75, 190, 75);

  doc.setFillColor(...lightGray);
  doc.rect(20, 85, 170, 25, "F");

  doc.setTextColor(...secondaryColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(t("client-info"), 25, 95);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`${t("name")}: ${reservation.name}`, 25, 102);
  doc.text(`${t("email")}: ${reservation.email}`, 25, 107);
  doc.text(`${t("phone")}: ${reservation.phone}`, 120, 102);

  let y = 125;
  doc.setFillColor(...primaryColor);
  doc.rect(20, y, 170, 8, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text(t("reservation-details"), 25, y + 5);
  y += 15;
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(11);

  const details: [string, string][] = [
    [t("tour"), reservation.tourName],
    [t("date"), reservation.selectedDate],
    [t("time"), reservation.selectedTime],
    [t("adults"), reservation.adults.toString()],
    [t("children"), reservation.children.toString()],
    [t("paymentMethod"), "PayPal"],
  ];

  details.forEach(([label, value]) => {
    const valueLines = doc.splitTextToSize(value, 100);
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 25, y);
    doc.setFont("helvetica", "normal");
    doc.text(valueLines, 80, y);
    y += valueLines.length * 6;
  });

  y += 10;
  doc.setFillColor(...lightGray);
  doc.rect(120, y, 70, 35, "F");
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(t("summary"), 125, y + 8);
  doc.setFontSize(11);

  const total = reservation.amount || 0;
  const totalPeople = reservation.adults + reservation.children;
  const pricePerPerson = totalPeople > 0 ? total / totalPeople : 0;

  doc.text(`${t("adults")} (${reservation.adults} x $${pricePerPerson.toFixed(2)}):`, 125, y + 16);
  doc.text(`$${(reservation.adults * pricePerPerson).toFixed(2)}`, 170, y + 16);

  if (reservation.children > 0) {
    doc.text(`${t("children")} (${reservation.children} x $${(pricePerPerson * 0.5).toFixed(2)}):`, 125, y + 22);
    doc.text(`$${(reservation.children * pricePerPerson * 0.5).toFixed(2)}`, 170, y + 22);
  }

  doc.setDrawColor(...primaryColor);
  doc.line(125, y + 26, 185, y + 26);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...accentColor);
  doc.text(t("totalPaid"), 125, y + 32);
  doc.text(`$${total.toFixed(2)} USD`, 160, y + 32);

  y += 45;
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(t("termsTitle"), 20, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const terms = [
    t("term-1"),
    t("term-2"),
    t("term-4"),
    t("term-5"),
  ];
  terms.forEach((term) => {
    const wrapped = doc.splitTextToSize(term, 170);
    doc.text(wrapped, 20, y + 8);
    y += wrapped.length * 6;
  });

  // Footer siempre dentro de 1 hoja sin romper diseño
  const footerYStart = 265;
  const footerHeight = 30;

  doc.setFillColor(...primaryColor);
  doc.rect(0, footerYStart, 210, footerHeight, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);

  const footerLines1 = doc.splitTextToSize(t("footer-thanks"), 170);
  const footerLines2 = doc.splitTextToSize(t("footer-social"), 170);
  const footerLines3 = doc.splitTextToSize(t("footer-contact"), 170);

  let fy = footerYStart + 8;
  doc.text(footerLines1, 105, fy, { align: "center" });
  fy += footerLines1.length * 5;
  doc.text(footerLines2, 105, fy, { align: "center" });
  fy += footerLines2.length * 5;
  doc.text(footerLines3, 105, fy, { align: "center" });

  doc.save(`Factura-${reservation.reservationCode}.pdf`);
};


export default function SuccessClient() {
  const locale = useLocale()
  const t = useTranslations("Reservation")
  const [showConfetti, setShowConfetti] = useState(true)
  const [reservation, setReservation] = useState<ReservationData | null>(null)
  const [warnings, setWarnings] = useState<{ calendarFailed?: boolean; emailFailed?: boolean }>({})
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    const storedReservation = localStorage.getItem("reservationData")
    if (storedReservation) {
      setReservation(JSON.parse(storedReservation))
    }
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const warn = localStorage.getItem("reservationWarnings")
    if (warn) {
      setWarnings(JSON.parse(warn))
      localStorage.removeItem("reservationWarnings")
    }
  }, [])

  const handleDownloadPDF = async () => {
    if (!reservation) return

    setIsGeneratingPDF(true)
    try {
      await generateProfessionalPDF(reservation, t)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && reservation) {
      try {
        await navigator.share({
          title: "Mi Reserva - Soraya y Leonardo Tours",
          text: `¡He reservado el tour ${reservation.tourName} para el ${reservation.selectedDate}!`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  if (!reservation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

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

        {(warnings.calendarFailed || warnings.emailFailed) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="space-y-1">
                    {warnings.calendarFailed && <p className="text-sm text-orange-700">{t("calendarFail")}</p>}
                    {warnings.emailFailed && <p className="text-sm text-orange-700">{t("emailFail")}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  {t("reservationDetails")}
                </CardTitle>
                <CardDescription className="text-blue-100">{t("reservationCode")}: {reservation.reservationCode}</CardDescription>
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
                          <p className="font-medium text-gray-900">{reservation.children} {t("children")}</p>
                          <p className="text-sm text-gray-600">{t("childParticipants")}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">${reservation.amount?.toFixed(2)} USD</p>
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

                <Button onClick={handleShare} variant="outline" className="w-full" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("shareReservation")}
                </Button>

                <Link href={`/${locale}/excursions`} className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    {t("backToTours")}
                  </Button>
                </Link>

                <a
                  href="https://www.google.com/maps/place/Soraya+y+Leonardo+tours"
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

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-2">{t("importantInfo")}</h3>
                <p className="text-sm text-blue-800 mb-3">{t("emailInfo")}</p>
                <p className="text-xs text-blue-700">{t("questions")}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
