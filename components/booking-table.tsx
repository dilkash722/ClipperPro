"use client";

import { Booking } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  User,
  Phone,
  Calendar,
  Clock,
  Scissors,
  Hourglass,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

type Props = {
  bookings: Booking[];
  onNext: () => void;
};

export default function BookingCards({ bookings, onNext }: Props) {
  return (
    <div className="space-y-5">
      {/* ===== GLOBAL NEXT ===== */}
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          className="
            bg-white text-neutral-900
            hover:bg-neutral-200
            font-semibold gap-2
          "
        >
          Next Customer
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* ===== CARDS ===== */}
      {bookings.length === 0 && (
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 text-center text-neutral-400">
          No bookings yet
        </div>
      )}

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
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-800">
                  <User className="h-4 w-4 text-neutral-200" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-100">
                    {b.customerName}
                  </p>
                  <p className="text-xs text-neutral-400">
                    Customer #{index + 1}
                  </p>
                </div>
              </div>

              <StatusBadge status={b.status} />
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm text-neutral-300">
              <InfoRow icon={Phone} value={b.mobile} />
              <InfoRow icon={Calendar} value={b.date} />
              <InfoRow icon={Clock} value={b.time} />
            </div>

            {/* Footer accent */}
            <div className="pt-2 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
              <Scissors className="h-3.5 w-3.5" />
              Barber Queue
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- INFO ROW ---------- */

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

/* ---------- STATUS BADGE ---------- */

function StatusBadge({ status }: { status: Booking["status"] }) {
  if (status === "waiting") {
    return (
      <Badge className="bg-neutral-800 text-neutral-200 gap-1">
        <Hourglass className="h-3 w-3" />
        Waiting
      </Badge>
    );
  }

  if (status === "processing") {
    return (
      <Badge className="bg-amber-500/15 text-amber-400 gap-1">
        <Scissors className="h-3 w-3" />
        Processing
      </Badge>
    );
  }

  return (
    <Badge className="bg-green-500/15 text-green-400 gap-1">
      <CheckCircle2 className="h-3 w-3" />
      Completed
    </Badge>
  );
}
