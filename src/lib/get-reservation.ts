import { getFirebaseDatabase } from "./firebase";
import { ref, get } from "firebase/database";

export async function getReservationByCode(reservationCode: string) {
  try {
    const db = getFirebaseDatabase();
    const snapshot = await get(ref(db, "reservations/" + reservationCode));
    if (!snapshot.exists()) return null;
    return snapshot.val();
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return null;
  }
}