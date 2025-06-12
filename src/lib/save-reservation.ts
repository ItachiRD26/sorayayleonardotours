// lib/save-reservation.ts
import { getFirebaseDatabase } from "./firebase";
import { ref, set } from "firebase/database";

export interface ReservationToSave {
  reservationCode: string;
  name: string;
  email: string;
  phone: string;
  tourName: string;
  selectedDate: string;
  selectedTime: string;
  adults: number;
  children: { age: number }[];
  amount: number;
  locale: string;
}

export async function saveReservation(reservation: ReservationToSave) {
  try {
    const db = getFirebaseDatabase();
    const reservationRef = ref(db, `reservations/${reservation.reservationCode}`);
    await set(reservationRef, reservation);
    console.log("✅ Reserva guardada correctamente en Firebase con reservationCode como clave");
  } catch (error) {
    console.error("❌ Error guardando la reserva en Firebase:", error);
  }
}
