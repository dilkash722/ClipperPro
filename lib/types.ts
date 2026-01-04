export type Barber = {
  id: string;
  shop: string;
  owner: string;
  address: string;
  phone?: string; // optional – call / WhatsApp support
  paid: boolean;
};

export type BookingStatus = "new" | "waiting" | "processing" | "completed";

export type Booking = {
  id: string;
  barberId: string;
  customerName: string;
  mobile: string;
  date: string;
  time: string;
  status: BookingStatus;
  createdAt: number;
};

export type Session = { role: "admin" } | { role: "barber"; barberId: string };
