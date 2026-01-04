"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import LoginModal from "@/components/login-modal";
import { storage } from "@/lib/storage";
import { Session } from "@/lib/types";

import {
  Scissors,
  LogIn,
  Shield,
  LogOut,
  Menu,
  X,
  User,
  Settings,
} from "lucide-react";

export default function Header() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<"admin" | "barber">("admin");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(storage.getSession());
  }, []);

  function handleLogout() {
    storage.clearSession();
    setSession(null);
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="w-full border-b border-neutral-800 bg-neutral-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-100">
              <Scissors className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <h1 className="text-lg font-semibold text-neutral-100">
                ClipperPro
              </h1>
              <p className="text-xs text-neutral-400">Barber Booking System</p>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            {!session && (
              <>
                <Button
                  variant="outline"
                  className="border-neutral-700 bg-neutral-900 text-neutral-200"
                  onClick={() => {
                    setRole("barber");
                    setOpen(true);
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Barber Login
                </Button>

                <Button
                  className="
                 bg-neutral-100 text-neutral-900
                 hover:bg-neutral-300
                  transition-colors
                  "
                  onClick={() => {
                    setRole("admin");
                    setOpen(true);
                  }}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Login
                </Button>
              </>
            )}

            {session && (
              <Button
                variant="outline"
                className="border-neutral-700 bg-neutral-900 text-neutral-200"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden rounded-md p-2 text-neutral-200 hover:bg-neutral-800"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`
          fixed right-0 top-0 z-50 h-full
          w-3/4 max-w-sm
          bg-neutral-950 border-l border-neutral-800
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-800 text-neutral-100">
              <Scissors className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-neutral-100">
                ClipperPro
              </p>
              <p className="text-[11px] text-neutral-400">Barber Booking</p>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-md p-2 hover:bg-neutral-800"
          >
            <X className="h-5 w-5 text-neutral-300" />
          </button>
        </div>

        {/* Drawer content */}
        <div className="px-4 py-5 space-y-6">
          {!session && (
            <>
              {/* Barber section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-500">
                  <User className="h-3.5 w-3.5" />
                  <span>Barber Access</span>
                </div>

                <button
                  onClick={() => {
                    setRole("barber");
                    setOpen(true);
                    setMenuOpen(false);
                  }}
                  className="
                    w-full flex items-center gap-3
                    rounded-md border border-neutral-800
                    bg-neutral-900 px-3 py-2.5
                    text-sm text-neutral-200
                    hover:bg-neutral-800 hover:border-neutral-700
                    active:scale-[0.97]
                    transition-all
                  "
                >
                  <LogIn className="h-4 w-4 text-neutral-300" />
                  Login as Barber
                </button>
              </div>

              {/* Admin section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-500">
                  <Settings className="h-3.5 w-3.5" />
                  <span>Admin Access</span>
                </div>

                <button
                  onClick={() => {
                    setRole("admin");
                    setOpen(true);
                    setMenuOpen(false);
                  }}
                  className="
                    w-full flex items-center gap-3
                    rounded-md bg-neutral-100
                    px-3 py-2.5
                    text-sm font-medium text-neutral-900
                    hover:bg-neutral-300
                    active:scale-[0.97]
                    transition-all
                  "
                >
                  <Shield className="h-4 w-4" />
                  Login as Admin
                </button>
              </div>
            </>
          )}

          {/* Logout section */}
          {session && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-500">
                <User className="h-3.5 w-3.5" />
                <span>Session</span>
              </div>

              <button
                onClick={handleLogout}
                className="
                  w-full flex items-center gap-3
                  rounded-md border border-red-900/40
                  bg-red-950/40
                  px-3 py-2.5
                  text-sm text-red-300
                  hover:bg-red-900/40
                  active:scale-[0.97]
                  transition-all
                "
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Login modal */}
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
