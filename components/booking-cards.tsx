"use client";

import { Booking } from "@/lib/types";
import { Button } from "@/components/ui/button";

import {
  User,
  Phone,
  Calendar,
  Clock,
  Scissors,
  Hourglass,
  CheckCircle2,
} from "lucide-react";

type Props = {
  bookings: Booking[];
  onNext: (id: string) => void;
};

export default function BookingTable({ bookings, onNext }: Props) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 text-center text-neutral-400">
        No bookings yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {bookings.map((b, index) => (
        <div
          key={b.id}
          className="
            rounded-xl border border-neutral-800
            bg-neutral-900 p-4
            space-y-3
            hover:border-neutral-700
            transition
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-800">
                <User className="h-4 w-4 text-neutral-200" />
              </div>

              <div>
                <p className="font-semibold text-neutral-100 leading-tight">
                  {b.customerName}
                </p>

                <p className="text-xs text-neutral-400 leading-snug">
                  Customer #{index + 1}
                </p>

                <p className="text-[11px] font-medium text-neutral-300 tracking-wide">
                  Booking ID: {b.id}
                </p>
              </div>
            </div>

            {/* ✅ SQUARE + CURVE STATUS */}
            <StatusBadge status={b.status} />
          </div>

          {/* INFO */}
          <div className="space-y-2 text-sm text-neutral-300">
            <InfoRow icon={Phone} value={b.mobile} />
            <InfoRow icon={Calendar} value={b.date} />
            <InfoRow icon={Clock} value={b.time} />
          </div>

          {/* NEXT BUTTON */}
          {(b.status === "waiting" || b.status === "processing") && (
            <Button
              size="sm"
              onClick={() => onNext(b.id)}
              className="
              w-full
             bg-neutral-800
             text-neutral-200
             hover:bg-neutral-700
              "
            >
              Next
            </Button>
          )}

          {/* FOOTER */}
          <div className="pt-2 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
            <Scissors className="h-3.5 w-3.5" />
            Barber Queue
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- HELPERS ---------- */

function InfoRow({
  icon: Icon,
  value,
}: {
  icon: React.ElementType;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-neutral-400" />
      <span>{value}</span>
    </div>
  );
}

/* ---------- STATUS (NO PILL, BARBER FEEL) ---------- */

function StatusBadge({ status }: { status: Booking["status"] }) {
  const base =
    "inline-flex h-7 min-w-[96px] items-center justify-center gap-1 rounded-lg border bg-neutral-900 px-2 text-xs font-medium capitalize";

  if (status === "waiting") {
    return (
      <span className={`${base} border-neutral-700 text-yellow-400`}>
        <Hourglass className="h-3 w-3" />
        Waiting
      </span>
    );
  }

  if (status === "processing") {
    return (
      <span className={`${base} border-neutral-700 text-amber-400`}>
        <Scissors className="h-3 w-3" />
        Processing
      </span>
    );
  }

  return (
    <span className={`${base} border-neutral-700 text-green-400`}>
      <CheckCircle2 className="h-3 w-3" />
      Completed
    </span>
  );
}
