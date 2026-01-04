"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Booking } from "@/lib/types";

import {
  Users,
  Hourglass,
  Scissors,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

type Props = {
  bookings: Booking[];
};

export default function StatusCards({ bookings, onNext }: Props) {
  const newCount = bookings.filter((b) => b.status === "new").length;
  const waiting = bookings.filter((b) => b.status === "waiting").length;
  const processing = bookings.filter((b) => b.status === "processing").length;
  const completed = bookings.filter((b) => b.status === "completed").length;
  const total = bookings.length;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {/* TOTAL */}
      <CardBox title="Total Customers" count={total} icon={Users} />

      {/* WAITING — GLOBAL NEXT ONLY WHEN NEW EXISTS */}
      <CardBox
        title="Waiting"
        count={waiting}
        icon={Hourglass}
        action={newCount > 0 ? <NextButton onClick={onNext} /> : null}
      />

      {/* PROCESSING */}
      <CardBox title="Processing" count={processing} icon={Scissors} />

      {/* COMPLETED */}
      <CardBox title="Completed" count={completed} icon={CheckCircle2} />
    </div>
  );
}

/* ---------- CARD BOX ---------- */

function CardBox({
  title,
  count,
  icon: Icon,
  action,
}: {
  title: string;
  count: number;
  icon: React.ElementType;
  action?: React.ReactNode;
}) {
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800">
            <Icon className="h-5 w-5 text-neutral-200" />
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-neutral-300 uppercase">
              {title}
            </h4>
            <div className="mt-1">
              <Badge className="bg-neutral-800 text-neutral-100">{count}</Badge>
            </div>
          </div>
        </div>

        {action}
      </CardContent>
    </Card>
  );
}
