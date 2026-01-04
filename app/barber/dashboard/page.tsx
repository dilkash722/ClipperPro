"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Booking, BookingStatus } from "@/lib/types";

import StatusCards from "@/components/status-cards";
import BookingTable from "@/components/booking-table";

import { storage } from "@/lib/storage";
import { Booking } from "@/lib/types";
import { Button } from "@/components/ui/button";

import { Scissors } from "lucide-react";

export default function BarberDashboardPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [barberName, setBarberName] = useState("");
  const [ownerName, setOwnerName] = useState(""); // future ready

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    const session = storage.getSession();

    if (!session || session.role !== "barber") {
      router.push("/");
      return;
    }

    const barbers = storage.getBarbers();
    const barber = barbers.find((b) => b.id === session.barberId);

    if (!barber) {
      router.push("/");
      return;
    }

    setBarberName(barber.shop);
    setOwnerName(barber.owner ?? "Master Barber");

    const all = storage
      .getBookings()
      .filter((b) => b.barberId === barber.id)
      .sort((a, b) => a.createdAt - b.createdAt);

    setBookings(all);
  }, [router]);

  /* ---------------- GLOBAL NEXT ---------------- */

  function globalNext() {
    const session = storage.getSession();
    if (!session || session.role !== "barber") return;

    const barberBookings = storage
      .getBookings()
      .filter((b) => b.barberId === session.barberId)
      .sort((a, b) => a.createdAt - b.createdAt);

    const all = storage.getBookings();

    // Waiting → Processing
    const nextWaiting = barberBookings.find((b) => b.status === "waiting");

    if (nextWaiting) {
      const updated: Booking[] = all.map((b) =>
        b.id === nextWaiting.id
          ? { ...b, status: "processing" as BookingStatus }
          : b
      );

      storage.saveBookings(updated);
      setBookings(updated.filter((b) => b.barberId === session.barberId));
      return;
    }

    // Processing → Completed
    const nextProcessing = barberBookings.find(
      (b) => b.status === "processing"
    );

    if (nextProcessing) {
      const updated: Booking[] = all.map((b) =>
        b.id === nextProcessing.id
          ? { ...b, status: "completed" as BookingStatus }
          : b
      );

      storage.saveBookings(updated);
      setBookings(updated.filter((b) => b.barberId === session.barberId));
    }
  }

  /* ---------------- LOGOUT ---------------- */

  function logout() {
    storage.clearSession();
    router.push("/");
  }

  return (
    <main className="container mx-auto p-6 space-y-8 text-neutral-100">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800">
            <Scissors className="h-6 w-6 text-neutral-200" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">{barberName}</h1>
            <p className="text-sm text-neutral-400">Owner: {ownerName}</p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={logout}
          className="border-neutral-700 text-neutral-200 hover:bg-neutral-800"
        >
          Logout
        </Button>
      </div>

      {/* ================= STATUS CARDS ================= */}
      <StatusCards bookings={bookings} onNext={globalNext} />

      {/* ================= BOOKINGS ================= */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-wide">
          Today’s Appointments
        </h2>

        <BookingTable bookings={bookings} onNext={globalNext} />
      </div>
    </main>
  );
}
