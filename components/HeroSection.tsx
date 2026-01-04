"use client";

import { Typewriter } from "react-simple-typewriter";
import { Scissors, Clock, CalendarCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* ===== FULL COVER IMAGE ===== */}
      <img
        src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1170&auto=format&fit=crop"
        alt="Barber dark aesthetic"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-center
          scale-105
        "
      />

      {/* ===== DARK OVERLAY ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/80 to-black/95" />

      {/* ===== HERO CONTENT (TOP ALIGNED) ===== */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-6 pt-28 sm:pt-32 md:pt-36">
          <div className="max-w-2xl space-y-7">
            {/* MAIN HEADING */}
            <h1
              className="
                text-4xl sm:text-5xl md:text-6xl xl:text-7xl
                font-extrabold
                tracking-tight
                leading-[1.05]
                text-white
              "
            >
              Smart Barber
              <br />
              <span className="block mt-4 text-neutral-300 font-semibold">
                <Typewriter
                  words={[
                    "Book your haircut without waiting",
                    "Track your queue in real time",
                    "Arrive exactly when your turn comes",
                    "Built for modern barbers & customers",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={52}
                  deleteSpeed={32}
                  delaySpeed={1600}
                />
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                max-w-xl
                text-base sm:text-lg
                text-neutral-300
                leading-relaxed
              "
            >
              A smart barber booking and queue management web app that helps
              customers save time and helps barbers manage appointments
              efficiently — all without phone calls or crowding.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-6 pt-3 text-sm text-neutral-300">
              <Feature icon={CalendarCheck} text="Easy online slot booking" />
              <Feature icon={Clock} text="Live queue & wait-time updates" />
              <Feature icon={Scissors} text="Designed specially for barbers" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM FADE ===== */}
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-neutral-950 to-transparent" />
    </section>
  );
}

/* ---------- FEATURE ---------- */

function Feature({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-neutral-300" />
      <span>{text}</span>
    </div>
  );
}
