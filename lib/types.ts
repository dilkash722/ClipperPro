/* ---------- BARBER ---------- */

export type BarberStatus = "open" | "closed";

export type Barber = {
  id: string;
  shop: string;
  owner: string;
  address: string;
  phone?: string; // call / WhatsApp
  paid: boolean;

  // 👇 IMPORTANT (dashboard → customer sync)
  status: BarberStatus; // open | closed
};

/* ---------- BOOKING ---------- */

export type BookingStatus =
  | "new"
  | "waiting"
  | "processing"
  | "completed"
  | "skipped"; // 👈 no-show support

export type Booking = {
  id: string; // Booking ID (B1700...)
  barberId: string;
  customerName: string;
  mobile: string;
  date: string;
  time: string;

  // 👇 QUEUE / TRACKING
  token: number; // Token number (#1, #2, #3…)

  status: BookingStatus;
  createdAt: number;
};

/* ---------- SESSION ---------- */

export type Session = { role: "admin" } | { role: "barber"; barberId: string };
