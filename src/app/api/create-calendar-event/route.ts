import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      tourName,
      selectedDate,
      selectedTime,
    } = body;

    if (!name || !selectedDate || !selectedTime || !tourName) {
      console.warn("❌ Faltan campos requeridos:", body);
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // ✅ Parse fecha y hora
    const [day, month, year] = selectedDate.split("/");
    const [timeRaw, period] = selectedTime.split(" "); // Ej: "08:00 AM"
    const [rawHour, minute] = timeRaw.split(":").map(Number) as [number, number];

    let hour = rawHour;
    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    const dateTime = `${formattedDate}T${formattedTime}:00`;

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const event = {
      summary: `Reserva tour - ${name}`,
      description: tourName,
      start: {
        dateTime,
        timeZone: "America/Santo_Domingo",
      },
      end: {
        dateTime,
        timeZone: "America/Santo_Domingo",
      },
    };

    await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("❌ Error creando evento en Google Calendar");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
