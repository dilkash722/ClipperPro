"use client";

import { useState } from "react";
import { Barber } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookingModal } from "./booking-modal";
import {
  Phone,
  MessageCircle,
  Scissors,
  DoorOpen,
  DoorClosed,
} from "lucide-react";

export function BarberCard({ barber }: { barber: Barber }) {
  const [open, setOpen] = useState(false);

  // ✅ ONLY THIS BARBER STATUS (comes from dashboard)
  const status: "open" | "closed" = barber.status ?? "closed";

  const iconBtnBase =
    "h-10 w-10 bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 transition-colors disabled:opacity-60";

  const statusConfig = {
    open: {
      className: "text-green-400 border-neutral-700",
      label: "Open",
      Icon: DoorOpen,
    },
    closed: {
      className: "text-red-400 border-neutral-700",
      label: "Closed",
      Icon: DoorClosed,
    },
  };

  const StatusIcon = statusConfig[status].Icon;

  return (
    <>
      <Card className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors">
        <CardContent className="p-5 space-y-4">
          {/* ---------- HEADER ---------- */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800">
              <Scissors className="h-5 w-5 text-neutral-200" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                {barber.shop}
              </h3>
              <p className="text-sm text-neutral-400">Owner: {barber.owner}</p>
            </div>

            {/* ✅ STATUS (ICON + OPEN / CLOSED) */}
            <span
              className={`
                inline-flex h-8 min-w-[90px]
                items-center justify-center gap-1
                rounded-lg border bg-neutral-900 px-3
                text-xs font-medium
                ${statusConfig[status].className}
              `}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {statusConfig[status].label}
            </span>
          </div>

          {/* ---------- ADDRESS ---------- */}
          <p className="text-sm text-neutral-300">{barber.address}</p>

          {/* ---------- ACTIONS ---------- */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              className="flex-1 bg-white text-neutral-900 hover:bg-neutral-200"
              onClick={() => setOpen(true)}
              disabled={status === "closed"}
            >
              Book Slot
            </Button>

            <Button
              type="button"
              className={iconBtnBase}
              disabled={!barber.phone}
              onClick={() => barber.phone && window.open(`tel:${barber.phone}`)}
            >
              <Phone className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              className={iconBtnBase}
              disabled={!barber.phone}
              onClick={() =>
                barber.phone && window.open(`https://wa.me/${barber.phone}`)
              }
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ---------- BOOKING MODAL ---------- */}
      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        barber={barber}
      />
    </>
  );
}
