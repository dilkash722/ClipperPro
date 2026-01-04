"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { Barber } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import {
  Shield,
  LogOut,
  Scissors,
  Store,
  User,
  MapPin,
  CheckCircle2,
  XCircle,
  Users,
} from "lucide-react";

/* ================= ADMIN CONFIG ================= */

const ADMIN_NAME = "Md Dilkash";
const ADMIN_ROLE = "Platform Owner · Admin";

/* ================= PAGE ================= */

export default function AdminDashboardPage() {
  const router = useRouter();

  const [session, setSession] = useState<null | { role: string }>(null); // ✅ ADD
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [shop, setShop] = useState("");
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    const s = storage.getSession(); // ✅ localStorage ab client me hi chalega

    if (!s || s.role !== "admin") {
      router.push("/");
      return;
    }

    setSession(s); // ✅ store session
    setBarbers(storage.getBarbers());
  }, [router]);
  /* ---------------- REGISTER BARBER ---------------- */

  function registerBarber(e: React.FormEvent) {
    e.preventDefault();

    const newBarber: Barber = {
      id: "barber_" + Date.now(),
      shop: shop.trim(),
      owner: owner.trim(),
      address: address.trim(),
      paid: true,
    };

    const updated = [...barbers, newBarber];
    storage.saveBarbers(updated);
    setBarbers(updated);

    setShop("");
    setOwner("");
    setAddress("");
  }

  /* ---------------- TOGGLE PAYMENT ---------------- */

  function togglePaid(id: string) {
    const updated = barbers.map((b) =>
      b.id === id ? { ...b, paid: !b.paid } : b
    );

    storage.saveBarbers(updated);
    setBarbers(updated);
  }

  /* ---------------- LOGOUT ---------------- */

  function logout() {
    storage.clearSession();
    router.push("/");
  }

  /* ---------------- STATS ---------------- */

  const total = barbers.length;
  const paid = barbers.filter((b) => b.paid).length;
  const unpaid = total - paid;

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="container mx-auto px-6 py-10 space-y-10 text-neutral-100">
        {/* ================= HEADER ================= */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800">
              <Shield className="h-6 w-6 text-neutral-200" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                {ADMIN_NAME}
              </h1>
              <p className="text-sm text-neutral-400">{ADMIN_ROLE}</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={logout}
            className="
              border-neutral-700
              text-neutral-200
              hover:bg-neutral-800
              gap-2
            "
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </header>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard title="Total Barbers" value={total} icon={Users} />
          <StatCard
            title="Paid"
            value={paid}
            icon={CheckCircle2}
            accent="green"
          />
          <StatCard title="Unpaid" value={unpaid} icon={XCircle} accent="red" />
        </section>

        {/* ================= CONTENT ================= */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* ---------- REGISTER BARBER ---------- */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <Scissors className="h-5 w-5 text-neutral-300" />
                <h2 className="text-lg font-semibold tracking-tight">
                  Register New Barber
                </h2>
              </div>

              <form onSubmit={registerBarber} className="space-y-4">
                <Field
                  icon={Store}
                  placeholder="Shop name"
                  value={shop}
                  onChange={setShop}
                />

                <Field
                  icon={User}
                  placeholder="Owner name"
                  value={owner}
                  onChange={setOwner}
                />

                <Field
                  icon={MapPin}
                  placeholder="Shop address"
                  value={address}
                  onChange={setAddress}
                />

                <Button
                  type="submit"
                  className="
                    w-full
                    bg-white
                    text-neutral-900
                    hover:bg-neutral-200
                    font-semibold
                  "
                >
                  Register Barber
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* ---------- BARBER LIST ---------- */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Store className="h-5 w-5 text-neutral-300" />
                <h2 className="text-lg font-semibold tracking-tight">
                  Barber Shops
                </h2>
              </div>

              {barbers.length === 0 && (
                <p className="text-sm text-neutral-400">
                  No barber shops registered yet.
                </p>
              )}

              <div className="space-y-3">
                {barbers.map((b) => (
                  <div
                    key={b.id}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-lg
                      border
                      border-neutral-800
                      bg-neutral-950
                      p-4
                    "
                  >
                    <div>
                      <p className="font-medium text-neutral-100">{b.shop}</p>
                      <p className="text-xs text-neutral-400">
                        {b.owner} · {b.address}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePaid(b.id)}
                      className={`gap-1 ${
                        b.paid
                          ? "border-green-700 text-green-400 hover:bg-green-900/20"
                          : "border-red-700 text-red-400 hover:bg-red-900/20"
                      }`}
                    >
                      {b.paid ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          PAID
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" />
                          UNPAID
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  title,
  value,
  icon: Icon,
  accent,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  accent?: "green" | "red";
}) {
  const accentClass =
    accent === "green"
      ? "text-green-400"
      : accent === "red"
      ? "text-red-400"
      : "text-neutral-200";

  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-neutral-800">
          <Icon className={`h-5 w-5 ${accentClass}`} />
        </div>

        <div>
          <p className="text-sm text-neutral-400">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ================= INPUT FIELD ================= */

function Field({
  icon: Icon,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ElementType;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="
          pl-9
          bg-neutral-950
          border-neutral-800
          text-neutral-100
          placeholder:text-neutral-500
        "
      />
    </div>
  );
}
