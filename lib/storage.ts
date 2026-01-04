import { Barber, Booking, Session } from "./types";

const BARBERS_KEY = "demo_barbers_v1";
const BOOKINGS_KEY = "demo_bookings_v1";
const SESSION_KEY = "demo_session_v1";

export const storage = {
  /* Barbers */
  getBarbers(): Barber[] {
    return JSON.parse(localStorage.getItem(BARBERS_KEY) || "[]");
  },
  saveBarbers(data: Barber[]) {
    localStorage.setItem(BARBERS_KEY, JSON.stringify(data));
  },

  /* Bookings */
  getBookings(): Booking[] {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
  },
  saveBookings(data: Booking[]) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(data));
  },

  /* Session */
  getSession(): Session | null {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  },
  setSession(v: Session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(v));
  },
  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },
};
