import { jsPDF } from "jspdf"

interface ReservationData {
  reservationCode: string
  name: string
  tourName: string
  selectedDate: string
  selectedTime: string
  adults: number
  children: { age: number }[]
  email?: string
  phone?: string
  amount?: number
  locale?: string
}

export async function generateProfessionalPDFBuffer(reservation: ReservationData) {
  const doc = new jsPDF()

  const locale = reservation.locale === "en" ? "en" : "es"

  const t = (key: string): string => {
    const en: Record<string, string> = {
      "invoice-subtitle": "Confirmation Invoice",
      "label-invoice": "Invoice",
      issueDate: "Issued",
      tourdate: "Tour Date",
      "client-info": "Client Info",
      name: "Name",
      email: "Email",
      phone: "Phone",
      "reservation-details": "Reservation Details",
      tour: "Tour",
      date: "Date",
      time: "Time",
      adults: "Adults",
      children: "Children",
      paymentMethod: "Payment",
      summary: "Summary",
      totalPaid: "Total Paid",
      termsTitle: "Terms and Conditions",
      "term-1": "Please arrive 10 minutes before departure time.",
      "term-2": "No refunds for late arrival or no-shows.",
      "term-4": "Show confirmation email at meeting point.",
      "term-5": "Prices include taxes and fees.",
      "footer-thanks": "Thank you for choosing Soraya y Leonardo Tours!",
      "footer-social": "Follow us on social media to see more experiences.",
      "footer-contact": "Contact: administracion@sorayayleonardotours.com",
    }

    const es: Record<string, string> = {
      "invoice-subtitle": "Factura de Confirmación",
      "label-invoice": "Factura",
      issueDate: "Emitido",
      tourdate: "Fecha del Tour",
      "client-info": "Información del Cliente",
      name: "Nombre",
      email: "Correo",
      phone: "Teléfono",
      "reservation-details": "Detalles de la Reserva",
      tour: "Tour",
      date: "Fecha",
      time: "Hora",
      adults: "Adultos",
      children: "Niños",
      paymentMethod: "Pago",
      summary: "Resumen",
      totalPaid: "Total Pagado",
      termsTitle: "Términos y Condiciones",
      "term-1": "Preséntate 10 minutos antes de la hora de salida.",
      "term-2": "No hay reembolsos por llegadas tardías o ausencias.",
      "term-4": "Muestra el correo de confirmación en el punto de encuentro.",
      "term-5": "Precios incluyen impuestos y cargos.",
      "footer-thanks": "¡Gracias por elegir Soraya y Leonardo Tours!",
      "footer-social": "Síguenos en redes sociales para ver más experiencias.",
      "footer-contact": "Contacto: administracion@sorayayleonardotours.com",
    }

    return locale === "en" ? en[key] || key : es[key] || key
  }

  const primaryColor: [number, number, number] = [41, 128, 185]
  const secondaryColor: [number, number, number] = [52, 73, 94]
  const accentColor: [number, number, number] = [231, 76, 60]
  const lightGray: [number, number, number] = [236, 240, 241]
  const darkGray: [number, number, number] = [127, 140, 141]

  doc.setFillColor(...primaryColor)
  doc.rect(0, 5, 210, 35, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("Soraya y Leonardo Tours", 20, 23)
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(t("invoice-subtitle"), 20, 30)

  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text(t("label-invoice"), 150, 20)
  doc.setFontSize(12)
  doc.text(`#${reservation.reservationCode}`, 150, 28)

  doc.setTextColor(...secondaryColor)
  doc.setFontSize(10)
  doc.text("www.sorayayleonardotours.com", 20, 50)
  doc.text("administracion@sorayayleonardotours.com", 20, 55)
  doc.text("Tel: +1 (809) 962-2259", 20, 60)
  doc.text(`${t("issueDate")}: ${new Date().toLocaleDateString()}`, 150, 50)
  doc.setTextColor(255, 0, 0)
  doc.text(`${t("tourdate")}: ${reservation.selectedDate}`, 150, 55)

  doc.setDrawColor(...primaryColor)
  doc.setLineWidth(1)
  doc.line(20, 75, 190, 75)

  doc.setFillColor(...lightGray)
  doc.rect(20, 85, 170, 25, "F")

  doc.setTextColor(...secondaryColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text(t("client-info"), 25, 95)

  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.text(`${t("name")}: ${reservation.name}`, 25, 102)
  doc.text(`${t("email")}: ${reservation.email}`, 25, 107)
  doc.text(`${t("phone")}: ${reservation.phone}`, 120, 102)

  let y = 125
  doc.setFillColor(...primaryColor)
  doc.rect(20, y, 170, 8, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.text(t("reservation-details"), 25, y + 5)
  y += 15

  doc.setTextColor(...secondaryColor)
  doc.setFontSize(11)

  const details: [string, string][] = [
    [t("tour"), reservation.tourName],
    [t("date"), reservation.selectedDate],
    [t("time"), reservation.selectedTime],
    [t("adults"), reservation.adults.toString()],
    [t("children"), reservation.children?.length?.toString() || "0"],
    [t("paymentMethod"), "PayPal"],
  ]

  details.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold")
    doc.text(`${label}:`, 25, y)
    doc.setFont("helvetica", "normal")
    doc.text(doc.splitTextToSize(value, 100), 80, y)
    y += 10
  })

  // Summary section - redesigned with better proportions
  y += 5 // Changed from y += 10 to y += 5 to move summary further up

  // Calculate summary box height based on number of children
  const childrenCount = reservation.children?.length || 0
  const summaryHeight = 45 + (childrenCount > 0 ? childrenCount * 6 : 0)

  // Create two equal-width columns with proper spacing
  const columnWidth = 75
  const leftColumnX = 20
  const rightColumnX = 115

  // Draw the summary box (right column)
  doc.setFillColor(255, 255, 255) // White background
  doc.rect(rightColumnX, y, columnWidth, summaryHeight, "F")

  // Add a border to the summary box
  doc.setDrawColor(...secondaryColor)
  doc.setLineWidth(0.5)
  doc.rect(rightColumnX, y, columnWidth, summaryHeight, "S")

  // Add a header bar for the summary
  doc.setFillColor(...primaryColor)
  doc.rect(rightColumnX, y, columnWidth, 8, "F")

  // Add summary title in the header bar
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(t("summary").toUpperCase(), rightColumnX + columnWidth / 2, y + 5.5, { align: "center" })

  // Add horizontal divider lines for a more professional table look
  doc.setDrawColor(...darkGray)
  doc.setLineWidth(0.2)

  // Line after adults
  doc.line(rightColumnX + 5, y + 22, rightColumnX + columnWidth - 5, y + 22)

  // Line before total
  const totalLineY = y + (childrenCount > 0 ? 30 + childrenCount * 6 : 30)
  doc.line(rightColumnX + 5, totalLineY, rightColumnX + columnWidth - 5, totalLineY)

  // Add adults count with better formatting
  doc.setTextColor(...secondaryColor)
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text(`${t("adults")}:`, rightColumnX + 5, y + 16)
  doc.setFont("helvetica", "normal")
  doc.text(`${reservation.adults}`, rightColumnX + columnWidth - 5, y + 16, { align: "right" })

  // Add children count and ages with better formatting
  let childY = y + 28
  if (childrenCount > 0) {
    doc.setFont("helvetica", "bold")
    doc.text(`${t("children")}:`, rightColumnX + 5, y + 28)
    doc.setFont("helvetica", "normal")
    doc.text(`${childrenCount}`, rightColumnX + columnWidth - 5, y + 28, { align: "right" })

    // List each child's age with better formatting
    reservation.children.forEach((child, index) => {
      const ageText = locale === "es" ? `años` : `years`
      doc.setFontSize(10)
      doc.text(`${child.age} ${ageText}`, rightColumnX + columnWidth - 5, childY + 6 * (index + 1), { align: "right" })
    })

    childY += 6 * childrenCount
  } else {
    doc.setFont("helvetica", "bold")
    doc.text(`${t("children")}:`, rightColumnX + 5, y + 28)
    doc.setFont("helvetica", "normal")
    doc.text(`0`, rightColumnX + columnWidth - 5, y + 28, { align: "right" })
  }

  // Add total amount with better formatting
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...accentColor)
  doc.text(`${t("totalPaid")}:`, rightColumnX + 5, totalLineY + 8)
  doc.text(`$${(reservation.amount ?? 0).toFixed(2)} USD`, rightColumnX + columnWidth - 5, totalLineY + 8, {
    align: "right",
  })

  // Terms and conditions - left column with matching height
  doc.setFillColor(...lightGray)
  doc.rect(leftColumnX, y, columnWidth, summaryHeight, "F")

  doc.setTextColor(...secondaryColor)
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text(t("termsTitle"), leftColumnX + columnWidth / 2, y + 8, { align: "center" })

  doc.setDrawColor(...darkGray)
  doc.setLineWidth(0.2)
  doc.line(leftColumnX + 5, y + 12, leftColumnX + columnWidth - 5, y + 12)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  const terms = [t("term-1"), t("term-2"), t("term-4"), t("term-5")]
  let ty = y + 20
  terms.forEach((term) => {
    const lines = doc.splitTextToSize(term, columnWidth - 10)
    doc.text(lines, leftColumnX + 5, ty)
    ty += lines.length * 6
  })

  const footerYStart = 265
  doc.setFillColor(...primaryColor)
  doc.rect(0, footerYStart, 210, 30, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)

  const footerLines1 = doc.splitTextToSize(t("footer-thanks"), 170)
  const footerLines2 = doc.splitTextToSize(t("footer-social"), 170)
  const footerLines3 = doc.splitTextToSize(t("footer-contact"), 170)

  let fy = footerYStart + 8
  doc.text(footerLines1, 105, fy, { align: "center" })
  fy += footerLines1.length * 5
  doc.text(footerLines2, 105, fy, { align: "center" })
  fy += footerLines2.length * 5
  doc.text(footerLines3, 105, fy, { align: "center" })

  return doc.output("arraybuffer")
}

function getBasePrice(tourName: string): number {
  switch (tourName) {
    case "Banco de Arenas Gran Grossier":
    case "Great Grosier Sandbank":
      return 125
    case "Isla Cabra":
    case "Goat Island":
      return 50
    case "Cayos 7 Hermanos":
    case "Seven Brothers Islands":
      return 200
    case "Plataforma Ecoturística":
    case "Ecotourism Platform":
      return 100
    case "Piscina Natural":
    case "Natural Pool":
      return 120
    case "Pesca Deportiva":
    case "Sport Fishing":
      return 180
    case "Aventura de Snorkeling":
    case "Snorkeling Adventure":
      return 160
    default:
      return 90
  }
}
/* eslint-disable @typescript-eslint/no-unused-vars */
function getExtraUnitPrice(tourName: string): number {
  const base = getBasePrice(tourName)
  return base * 0.5
}
