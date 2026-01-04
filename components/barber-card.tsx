"use client";

import { useState } from "react";
import { Barber } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookingModal } from "./booking-modal";
import { Phone, MessageCircle, Scissors } from "lucide-react";

export function BarberCard({ barber }: { barber: Barber }) {
  const [open, setOpen] = useState(false);

  const iconBtnBase =
    "h-10 w-10 bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <>
      <Card className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors">
        <CardContent className="p-5 space-y-4">
          {/* ---------- HEADER ---------- */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800 text-neutral-200">
              <Scissors className="h-5 w-5" />
            </div>

            <div className="leading-tight">
              <h3 className="text-lg font-semibold text-white tracking-tight">
                {barber.shop}
              </h3>
              <p className="text-sm text-neutral-400">Owner: {barber.owner}</p>
            </div>
          </div>

          {/* ---------- ADDRESS ---------- */}
          <p className="text-sm text-neutral-300 leading-relaxed">
            {barber.address}
          </p>

          {/* ---------- ACTIONS ---------- */}
          <div className="flex items-center gap-2 pt-2">
            {/* Book Slot */}
            <Button
              className="
                flex-1
                bg-white
                text-neutral-900
                font-medium
                hover:bg-neutral-200
                transition-colors
              "
              onClick={() => setOpen(true)}
            >
              Book Slot
            </Button>

            {/* Call */}
            <Button
              type="button"
              className={iconBtnBase}
              onClick={() => {
                if (barber.phone) {
                  window.open(`tel:${barber.phone}`);
                }
              }}
              disabled={!barber.phone}
            >
              <Phone className="h-4 w-4" />
            </Button>

            {/* WhatsApp */}
            <Button
              type="button"
              className={iconBtnBase}
              onClick={() => {
                if (barber.phone) {
                  window.open(`https://wa.me/${barber.phone}`, "_blank");
                }
              }}
              disabled={!barber.phone}
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
