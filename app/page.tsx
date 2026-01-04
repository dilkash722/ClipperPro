"use client";

import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { seedBarbersIfNeeded } from "@/lib/utils";
import { Barber } from "@/lib/types";
import { BarberCard } from "@/components/barber-card";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    seedBarbersIfNeeded();
    setBarbers(storage.getBarbers());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950">
      {/* ================= MAIN ================= */}
      <main className="flex-1">
        <div className="container mx-auto px-6 py-14 space-y-14">
          {/* ================= HERO ================= */}
          <section className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Find the right barber.
              <br className="hidden sm:block" />
              Book your slot in minutes.
            </h1>

            <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
              Discover trusted barber shops near you, check availability, and
              manage your booking effortlessly — no calls, no waiting.
            </p>
          </section>

          {/* ================= LIST HEADER ================= */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Available Barber Shops
              </h2>
              <p className="text-sm text-neutral-400">
                Choose a shop and book your preferred time
              </p>
            </div>

            {barbers.length === 0 ? (
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-8 text-center">
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
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}
