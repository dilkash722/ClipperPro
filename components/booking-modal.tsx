"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barber, Booking } from "@/lib/types";
import { storage } from "@/lib/storage";

import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Phone,
  Hash,
  Scissors,
  Store,
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

  function submit(form: FormData) {
    const booking: Booking = {
      id: "B" + Date.now(),
      barberId: barber.id,
      customerName: form.get("name") as string,
      mobile: form.get("mobile") as string,
      date: form.get("date") as string,
      time: form.get("time") as string,
      status: "waiting",
      createdAt: Date.now(),
    };

    const all = storage.getBookings();
    storage.saveBookings([...all, booking]);
    setSuccess(booking);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-950 border-neutral-800 text-neutral-100">
        {!success ? (
          <>
            {/* ---------- HEADER ---------- */}
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800">
                  <Scissors className="h-5 w-5 text-neutral-200" />
                </div>

                <div>
                  <DialogTitle className="text-lg font-bold tracking-tight">
                    Book Appointment
                  </DialogTitle>
                  <p className="text-sm text-neutral-400 flex items-center gap-1">
                    <Store className="h-3.5 w-3.5" />
                    {barber.shop}
                  </p>
                </div>
              </div>
            </DialogHeader>

            {/* ---------- FORM ---------- */}
            <form action={submit} className="space-y-4 pt-4">
              <IconInput
                name="name"
                icon={User}
                placeholder="Customer full name"
              />

              <IconInput
                name="mobile"
                icon={Phone}
                placeholder="Mobile number"
              />

              <div className="grid grid-cols-2 gap-3">
                <IconInput name="date" icon={Calendar} type="date" />

                <IconInput name="time" icon={Clock} type="time" />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-neutral-900 hover:bg-neutral-200 font-semibold"
              >
                Confirm Booking
              </Button>
            </form>
          </>
        ) : (
          /* ---------- SUCCESS ---------- */
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-green-500">
                Booking Confirmed
              </h3>
              <p className="text-sm text-neutral-400">
                Your barber slot is locked
              </p>
            </div>

            <div className="space-y-2 text-sm text-left">
              <Detail icon={Hash} label="Booking ID" value={success.id} />
              <Detail
                icon={User}
                label="Customer"
                value={success.customerName}
              />
              <Detail icon={Phone} label="Mobile" value={success.mobile} />
              <Detail icon={Calendar} label="Date" value={success.date} />
              <Detail icon={Clock} label="Time" value={success.time} />
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-white text-neutral-900 hover:bg-neutral-200"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ---------- ICON INPUT ---------- */

function IconInput({
  icon: Icon,
  ...props
}: {
  icon: React.ElementType;
} & React.ComponentProps<typeof Input>) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
      <Input
        {...props}
        required
        className="
          pl-9
          bg-neutral-900
          border-neutral-800
          text-neutral-100
          placeholder:text-neutral-500
        "
      />
    </div>
  );
}

/* ---------- DETAIL ROW ---------- */

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-neutral-400" />
      <span className="w-24 text-neutral-400">{label}</span>
      <span className="font-medium text-neutral-100">{value}</span>
    </div>
  );
}
