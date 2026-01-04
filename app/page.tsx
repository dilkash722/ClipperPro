"use client";

import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { seedBarbersIfNeeded } from "@/lib/utils";
import { Barber } from "@/lib/types";
import { BarberCard } from "@/components/barber-card";
import Footer from "@/components/Footer";

import { Typewriter } from "react-simple-typewriter";

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
        <div className="container mx-auto px-5 sm:px-6 py-12 sm:py-14 space-y-16">
          {/* ================= HERO ================= */}
          <section className="max-w-3xl space-y-5">
            <h1
              className="
                text-2xl sm:text-3xl md:text-4xl
                font-extrabold tracking-tight
                leading-snug sm:leading-tight
                text-white
              "
            >
              Find the right barber.
              <br className="hidden sm:block" />
              <span className="block mt-1 text-neutral-300">
                <Typewriter
                  words={[
                    "Book your slot in minutes.",
                    "No calls. No waiting.",
                    "Fast, simple & reliable.",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={55}
                  deleteSpeed={35}
                  delaySpeed={1400}
                />
              </span>
            </h1>

            <p
              className="
                text-sm sm:text-base md:text-lg
                leading-relaxed sm:leading-relaxed
                text-neutral-400
                max-w-2xl
              "
            >
              Discover trusted barber shops near you, check real-time
              availability, and manage your bookings effortlessly — without
              phone calls or long waiting.
            </p>
          </section>

          {/* ================= LIST HEADER ================= */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2
                className="
                  text-lg sm:text-xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                Available Barber Shops
              </h2>
              <p
                className="
                  text-xs sm:text-sm
                  text-neutral-400
                "
              >
                Choose a shop and book your preferred time
              </p>
            </div>

            {barbers.length === 0 ? (
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-8 text-center">
                <p className="text-sm text-neutral-400">
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
