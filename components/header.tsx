"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import LoginModal from "@/components/login-modal";
import { Session } from "@/lib/types";

import { Scissors, LogIn, Shield, LogOut } from "lucide-react";

export default function Header() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<"admin" | "barber">("admin");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(storage.getSession());
  }, []);

  function handleLogout() {
    storage.clearSession();
    setSession(null);
    router.push("/");
  }

  return (
    <>
      {/* ===== DARK HEADER ===== */}
      <header className="w-full border-b border-neutral-800 bg-neutral-950">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* ===== BRAND ===== */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-100 shadow">
              <Scissors className="h-5 w-5" />
            </div>

            <div className="leading-tight">
              <h1 className="text-lg font-extrabold tracking-tight text-neutral-100">
                ClipperPro
              </h1>
              <p className="text-xs font-medium text-neutral-400">
                Barber Booking System
              </p>
            </div>
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex items-center gap-2">
            {!session && (
              <>
                {/* Barber Login */}
                <Button
                  variant="outline"
                  className="
                    gap-2
                    border-neutral-700
                    bg-neutral-900
                    text-neutral-200
                    hover:bg-neutral-800
                    hover:text-white
                    transition-colors
                  "
                  onClick={() => {
                    setRole("barber");
                    setOpen(true);
                  }}
                >
                  <LogIn className="h-4 w-4" />
                  Barber Login
                </Button>

                {/* Admin Login */}
                <Button
                  className="
                    gap-2
                    bg-neutral-100
                    text-neutral-900
                    hover:bg-neutral-300
                    transition-colors
                  "
                  onClick={() => {
                    setRole("admin");
                    setOpen(true);
                  }}
                >
                  <Shield className="h-4 w-4" />
                  Admin Login
                </Button>
              </>
            )}

            {/* Logout */}
            {session && (
              <Button
                variant="outline"
                className="
                  gap-2
                  border-neutral-700
                  bg-neutral-900
                  text-neutral-200
                  hover:bg-neutral-800
                  hover:text-white
                  transition-colors
                "
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ===== LOGIN MODAL ===== */}
      <LoginModal
        open={open}
        role={role}
        onClose={() => {
          setOpen(false);
          setSession(storage.getSession());
        }}
      />
    </>
  );
}
