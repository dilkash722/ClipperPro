export type Barber = {
  id: string;
  shop: string;
  owner: string;
  address: string;
  paid: boolean;
};

export type BookingStatus = "waiting" | "processing" | "completed";

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
