"use client";

import { Scissors } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-800 bg-neutral-950">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center gap-3 text-center">
          {/* Icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-900 border border-neutral-800">
            <Scissors className="h-4 w-4 text-neutral-300" />
          </div>

          {/* Text */}
          <p className="text-sm text-neutral-400">
            Design &amp; Developed by{" "}
            <span className="font-medium text-neutral-200">Md Dilkash</span>
          </p>

          {/* Sub text */}
          <p className="text-xs text-neutral-500 tracking-wide">
            Barber Booking Web App
          </p>
        </div>
      </div>
    </footer>
  );
}
