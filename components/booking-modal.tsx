"use client";
import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { storage } from "@/lib/storage";
import { Barber, Booking } from "@/lib/types";

import {
  Scissors,
  User,
  Phone,
  Calendar,
  Clock,
  Hash,
  CheckCircle2,
  Store,
  Timer,
} from "lucide-react";

export function BookingModal({
  open,
  onClose,
  barber,
}: {
  open: boolean;
  onClose: () => void;
  barber: Barber;
}) {
  const [success, setSuccess] = useState<Booking | null>(null);
  const [liveBooking, setLiveBooking] = useState<Booking | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const active = storage
      .getBookings()
      .filter((b) => b.barberId === barber.id && b.status !== "completed");

    const token = active.length + 1;

    const booking: Booking = {
      id: "B" + Date.now(),
      barberId: barber.id,
      customerName: form.get("name") as string,
      mobile: form.get("mobile") as string,
      date: form.get("date") as string,
      time: form.get("time") as string,
      status: "waiting",
      token,
      createdAt: Date.now(),
    };

    storage.saveBookings([...storage.getBookings(), booking]);
    setSuccess(booking);
  }
  useEffect(() => {
    if (!success) return;

    const interval = setInterval(() => {
      const latest = storage.getBookings().find((b) => b.id === success.id);

      if (latest) {
        setLiveBooking(latest);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [success]);

  const current = liveBooking ?? success;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-neutral-950 border-neutral-800 text-neutral-100">
        {!success ? (
          <>
            {/* ===== HEADER ===== */}
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800">
                  <Scissors className="h-5 w-5" />
                </div>

                <div>
                  <DialogTitle className="text-lg font-bold">
                    Book Appointment
                  </DialogTitle>
                  <p className="text-sm text-neutral-400 flex items-center gap-1">
                    <Store className="h-3.5 w-3.5" />
                    {barber.shop}
                  </p>
                </div>
              </div>
            </DialogHeader>

            {/* ===== FORM ===== */}
            <form onSubmit={submit} className="space-y-4 pt-4">
              <Field
                label="Customer Name"
                name="name"
                icon={User}
                placeholder="Enter full name"
              />

              <Field
                label="Mobile Number"
                name="mobile"
                icon={Phone}
                placeholder="Enter mobile number"
              />

              <Field label="Date" name="date" type="date" icon={Calendar} />

              <Field label="Time" name="time" type="time" icon={Clock} />

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white text-neutral-900"
                  onClick={onClose}
                >
                  Cancel
                </Button>

                <Button type="submit" className="bg-neutral-900">
                  Confirm
                </Button>
              </div>
            </form>
          </>
        ) : (
          /* ===== SUCCESS / TRACKING ===== */
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-green-500">
                Booking Successful
              </h3>
              <p className="text-sm text-neutral-400">
                Please wait for your turn
              </p>
            </div>

            {/* ===== TRACKING CARD ===== */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 space-y-3 text-sm">
              <TrackRow icon={Hash} label="Booking ID" value={success.id} />
              <TrackRow
                icon={Timer}
                label="Token Number"
                value={`#${success.token}`}
                highlight
              />
              <TrackRow
                icon={Clock}
                label="Current Status"
                value="Waiting"
                status
              />
            </div>

            <p className="text-xs text-neutral-500">
              Your status will move to <b>Processing</b> when the barber starts
              your service.
            </p>

            <Button
              onClick={onClose}
              className="w-full bg-white text-neutral-900"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ===== REUSABLE FIELD ===== */

function Field({
  label,
  icon: Icon,
  ...props
}: {
  label: string;
  icon: React.ElementType;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase text-neutral-400">{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
        <Input
          {...props}
          required
          className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100"
        />
      </div>
    </div>
  );
}

/* ===== TRACK ROW ===== */

function TrackRow({
  icon: Icon,
  label,
  value,
  highlight,
  status,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
  status?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-neutral-400">
        <Icon className="h-4 w-4" />
        {label}
      </div>

      <span
        className={
          highlight
            ? "font-bold text-green-400"
            : status
            ? "rounded-full bg-yellow-500/10 px-3 py-0.5 text-yellow-400 text-xs"
            : "text-neutral-100"
        }
      >
        {value}
      </span>
    </div>
  );
}
