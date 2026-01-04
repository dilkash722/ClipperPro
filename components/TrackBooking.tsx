"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { storage } from "@/lib/storage";
import { Booking } from "@/lib/types";

import {
  Search,
  Hash,
  Hourglass,
  Scissors,
  CheckCircle2,
  Users,
  AlertCircle,
  User,
} from "lucide-react";

export default function TrackBooking() {
  const [bookingId, setBookingId] = useState("");
  const [result, setResult] = useState<null | {
    booking: Booking;
    currentToken: number;
    currentName: string;
    ahead: number;
  }>(null);
  const [error, setError] = useState("");

  function track() {
    setError("");
    setResult(null);

    if (!bookingId.trim()) {
      setError("Please enter your Booking ID");
      return;
    }

    const all = storage.getBookings();
    const booking = all.find((b) => b.id === bookingId.trim());

    if (!booking) {
      setError("Booking not found. Please check your Booking ID.");
      return;
    }

    // All bookings of same barber
    const barberBookings = all
      .filter((b) => b.barberId === booking.barberId)
      .sort((a, b) => a.token - b.token);

    // 1️⃣ Current serving (processing)
    let current =
      barberBookings.find((b) => b.status === "processing") ??
      barberBookings.find((b) => b.status === "waiting") ??
      booking;

    // 2️⃣ Customers ahead (waiting before you)
    const ahead = barberBookings.filter(
      (b) => b.status === "waiting" && b.token < booking.token
    ).length;

    setResult({
      booking,
      currentToken: current.token,
      currentName: current.customerName,
      ahead,
    });
  }

  return (
    <section className="mt-12">
      <Card className="bg-neutral-950 border-neutral-800">
        <CardContent className="p-6 space-y-5">
          {/* HEADER */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800">
              <Search className="h-5 w-5 text-neutral-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                Track Your Booking
              </h2>
              <p className="text-sm text-neutral-400">
                Enter your Booking ID to check your turn
              </p>
            </div>
          </div>

          {/* INPUT */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Hash className="absolute left-3 top-3.5 h-4 w-4 text-neutral-500" />
              <Input
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="Enter Booking ID (e.g. B1700000)"
                className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100"
              />
            </div>

            <Button
              onClick={track}
              className="bg-white text-neutral-900 hover:bg-neutral-200"
            >
              Track
            </Button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {/* RESULT */}
          {result && (
            <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
              {/* TOP BAR */}
              <div className="flex items-center gap-3 px-4 py-3 bg-neutral-950 border-b border-neutral-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-800">
                  <Scissors className="h-5 w-5 text-neutral-200" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-100">
                    Barber Queue Status
                  </p>
                  <p className="text-xs text-neutral-400">
                    Live token tracking
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-4 space-y-3">
                <ResultRow
                  icon={Hash}
                  label="Booking ID"
                  value={result.booking.id}
                />

                <ResultRow
                  icon={User}
                  label="Your Name"
                  value={result.booking.customerName}
                />

                <ResultRow
                  icon={Users}
                  label="Your Token"
                  value={`#${result.booking.token}`}
                />

                <ResultRow
                  icon={Scissors}
                  label="Currently Serving"
                  value={`#${result.currentToken} (${result.currentName})`}
                />

                <ResultRow
                  icon={Hourglass}
                  label="Customers Ahead"
                  value={String(result.ahead)}
                />
              </div>

              {/* STATUS */}
              <div className="px-4 py-3 bg-neutral-950 border-t border-neutral-800">
                <StatusLine status={result.booking.status} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

/* ---------- HELPERS ---------- */

function ResultRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon className="h-4 w-4 text-neutral-400" />
      <span className="w-36 text-neutral-400">{label}</span>
      <span className="font-medium text-neutral-100">{value}</span>
    </div>
  );
}

function StatusLine({ status }: { status: Booking["status"] }) {
  if (status === "waiting") {
    return (
      <p className="flex items-center gap-2 text-sm text-yellow-400">
        <Hourglass className="h-4 w-4" />
        Waiting for your turn
      </p>
    );
  }

  if (status === "processing") {
    return (
      <p className="flex items-center gap-2 text-sm text-amber-400">
        <Scissors className="h-4 w-4" />
        Your turn is now
      </p>
    );
  }

  if (status === "completed") {
    return (
      <p className="flex items-center gap-2 text-sm text-green-400">
        <CheckCircle2 className="h-4 w-4" />
        Service completed
      </p>
    );
  }

  return (
    <p className="flex items-center gap-2 text-sm text-red-400">
      <AlertCircle className="h-4 w-4" />
      You missed your turn
    </p>
  );
}
