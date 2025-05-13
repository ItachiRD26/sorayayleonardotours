import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  const body = await req.json();

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const event = {
    summary: `Reserva: ${body.name}`,
    description: `Excursión reservada para ${body.people} personas.`,
    start: {
      dateTime: `${body.date}T${body.time}:00`,
      timeZone: "America/Santo_Domingo",
    },
    end: {
      dateTime: `${body.date}T${body.time}:00`,
      timeZone: "America/Santo_Domingo",
    },
  };

  try {
    await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creando evento en Google Calendar", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
