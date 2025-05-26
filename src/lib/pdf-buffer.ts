import { jsPDF } from "jspdf";

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
  amount?: number;
  locale?: string;
}

export async function generateProfessionalPDFBuffer(reservation: ReservationData) {
  const doc = new jsPDF();

  const locale = reservation.locale === "en" ? "en" : "es";

  const t = (key: string): string => {
    const en: Record<string, string> = {
      "invoice-subtitle": "Confirmation Invoice",
      "label-invoice": "Invoice",
      "issueDate": "Issued",
      "tourdate": "Tour Date",
      "client-info": "Client Info",
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "reservation-details": "Reservation Details",
      "tour": "Tour",
      "date": "Date",
      "time": "Time",
      "adults": "Adults",
      "children": "Children",
      "paymentMethod": "Payment",
      "summary": "Summary",
      "totalPaid": "Total",
      "termsTitle": "Terms and Conditions",
      "term-1": "Please arrive 10 minutes before departure time.",
      "term-2": "No refunds for late arrival or no-shows.",
      "term-4": "Show confirmation email at meeting point.",
      "term-5": "Prices include taxes and fees.",
      "footer-thanks": "Thank you for choosing Soraya y Leonardo Tours!",
      "footer-social": "Follow us on social media to see more experiences.",
      "footer-contact": "Contact: administracion@sorayayleonardotours.com",
    };

    const es: Record<string, string> = {
      "invoice-subtitle": "Factura de Confirmación",
      "label-invoice": "Factura",
      "issueDate": "Emitido",
      "tourdate": "Fecha del Tour",
      "client-info": "Información del Cliente",
      "name": "Nombre",
      "email": "Correo",
      "phone": "Teléfono",
      "reservation-details": "Detalles de la Reserva",
      "tour": "Tour",
      "date": "Fecha",
      "time": "Hora",
      "adults": "Adultos",
      "children": "Niños",
      "paymentMethod": "Pago",
      "summary": "Resumen",
      "totalPaid": "Total Pagado",
      "termsTitle": "Términos y Condiciones",
      "term-1": "Preséntate 10 minutos antes de la hora de salida.",
      "term-2": "No hay reembolsos por llegadas tardías o ausencias.",
      "term-4": "Muestra el correo de confirmación en el punto de encuentro.",
      "term-5": "Precios incluyen impuestos y cargos.",
      "footer-thanks": "¡Gracias por elegir Soraya y Leonardo Tours!",
      "footer-social": "Síguenos en redes sociales para ver más experiencias.",
      "footer-contact": "Contacto: administracion@sorayayleonardotours.com",
    };

    return locale === "en" ? en[key] || key : es[key] || key;
  };

  // Aquí comienza tu código original adaptado
  const primaryColor: [number, number, number] = [41, 128, 185];
  const secondaryColor: [number, number, number] = [52, 73, 94];
  const accentColor: [number, number, number] = [231, 76, 60];
  const lightGray: [number, number, number] = [236, 240, 241];

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
  doc.text(`${
    t("issueDate")
  }: ${new Date().toLocaleDateString()}`, 150, 50);
  doc.setTextColor(255, 0, 0);
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
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 25, y);
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(value, 100), 80, y);
    y += 10;
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
  const terms = [t("term-1"), t("term-2"), t("term-4"), t("term-5")];
  terms.forEach((term) => {
    const wrapped = doc.splitTextToSize(term, 170);
    doc.text(wrapped, 20, y + 8);
    y += wrapped.length * 6;
  });

  const footerYStart = 265;
  doc.setFillColor(...primaryColor);
  doc.rect(0, footerYStart, 210, 30, "F");

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

  return doc.output("arraybuffer");
}
