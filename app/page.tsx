"use client";

import { useEffect, useState } from "react";
import { Barber } from "@/lib/types";
import { storage } from "@/lib/storage";
import { seedBarbersIfNeeded } from "@/lib/utils";

import HeroSection from "@/components/HeroSection";
import { BarberCard } from "@/components/barber-card";
import TrackBooking from "@/components/TrackBooking";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    seedBarbersIfNeeded();
    setBarbers(storage.getBarbers());
  }, []);

  return (
    // ✅ SAME BG AS FOOTER
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* ================= HERO ================= */}
      <HeroSection />

      {/* ================= MAIN ================= */}
      <main className="flex-1 container mx-auto px-6 py-20 space-y-20">
        {/* BARBER LIST */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Available Barber Shops
            </h2>
            <p className="text-sm text-neutral-400">
              Choose a barber and book your slot
            </p>
          </div>

          {barbers.length === 0 ? (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-10 text-center">
              <p className="text-neutral-400 text-sm">
                No barber shops available right now.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {barbers.map((b) => (
                <BarberCard key={b.id} barber={b} />
              ))}
            </div>
          )}
        </section>

        {/* TRACK BOOKING */}
        <TrackBooking />
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}
