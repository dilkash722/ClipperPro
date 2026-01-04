"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Booking, BookingStatus } from "@/lib/types";

import StatusCards from "@/components/status-cards";
import BookingTable from "@/components/booking-cards";

import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/button";

import { Scissors } from "lucide-react";

type BarberStatus = "open" | "closed";

export default function BarberDashboardPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [barberName, setBarberName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [status, setStatus] = useState<BarberStatus>("open");

  // ✅ simple text message
  const [statusMsg, setStatusMsg] = useState("");

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
    setStatus(barber.status ?? "open");

    const all = storage
      .getBookings()
      .filter((b) => b.barberId === barber.id)
      .sort((a, b) => a.createdAt - b.createdAt);

    setBookings(all);
  }, [router]);

  /* ---------------- UPDATE BARBER STATUS ---------------- */

  function updateStatus(nextStatus: BarberStatus) {
    const session = storage.getSession();
    if (!session) return;

    const barbers = storage
      .getBarbers()
      .map((b) =>
        b.id === session.barberId ? { ...b, status: nextStatus } : b
      );

    storage.saveBarbers(barbers);
    setStatus(nextStatus);

    setStatusMsg(
      nextStatus === "open"
        ? "Shop is open. Customers can book now."
        : "Shop is closed. Booking is stopped."
    );
  }

  /* ---------------- GLOBAL NEXT ---------------- */

  function globalNext(bookingId: string) {
    const session = storage.getSession();
    if (!session || session.role !== "barber") return;

    const all = storage.getBookings();

    const updated: Booking[] = all.map((b) => {
      if (b.id !== bookingId) return b;

      if (b.status === "waiting") {
        return { ...b, status: "processing" as BookingStatus };
      }

      if (b.status === "processing") {
        return { ...b, status: "completed" as BookingStatus };
      }

      return b;
    });

    storage.saveBookings(updated);
    setBookings(updated.filter((b) => b.barberId === session.barberId));
  }

  /* ---------------- LOGOUT ---------------- */

  function logout() {
    storage.clearSession();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="container mx-auto p-6 space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800">
              <Scissors className="h-6 w-6 text-neutral-200" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {barberName}
              </h1>
              <p className="text-sm text-neutral-400">Owner: {ownerName}</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={logout}
            className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
          >
            Logout
          </Button>
        </div>

        {/* ================= OPEN / CLOSE ================= */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => updateStatus("open")}
              className={`h-9 rounded-lg border ${
                status === "open"
                  ? "bg-neutral-800 border-neutral-600 text-white"
                  : "bg-neutral-900 border-neutral-700 text-neutral-400"
              }`}
            >
              Open
            </Button>

            <Button
              onClick={() => updateStatus("closed")}
              className={`h-9 rounded-lg border ${
                status === "closed"
                  ? "bg-neutral-800 border-neutral-600 text-white"
                  : "bg-neutral-900 border-neutral-700 text-neutral-400"
              }`}
            >
              Closed
            </Button>
          </div>

          {/* ✅ PLAIN TEXT MESSAGE (NO CARD, NO BOX) */}
          {statusMsg && <p className="text-sm text-neutral-500">{statusMsg}</p>}
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
      </div>
    </main>
  );
}
