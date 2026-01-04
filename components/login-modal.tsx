"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { Barber, Session } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Scissors, User, Lock, Store } from "lucide-react";

type LoginRole = "admin" | "barber";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  role: LoginRole;
}

export default function LoginModal({ open, onClose, role }: LoginModalProps) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarber, setSelectedBarber] = useState("");

  useEffect(() => {
    if (role === "barber") {
      const list = storage.getBarbers();
      setBarbers(list);
      if (list.length) setSelectedBarber(list[0].id);
    }
  }, [role]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let session: Session;

    if (role === "admin") {
      session = { role: "admin" };
      storage.setSession(session);
      onClose();
      router.push("/admin/dashboard");
      return;
    }

    if (!selectedBarber) return;

    session = { role: "barber", barberId: selectedBarber };
    storage.setSession(session);
    onClose();
    router.push("/barber/dashboard");
  }

  function resetAndClose() {
    setUsername("");
    setPassword("");
    setSelectedBarber("");
    onClose();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) resetAndClose();
      }}
    >
      <DialogContent className="sm:max-w-md bg-neutral-950 border-neutral-800 text-neutral-100">
        {/* ===== HEADER ===== */}
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800 text-neutral-200">
              <Scissors className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-lg font-bold tracking-tight">
                {role === "admin" ? "Admin Login" : "Barber Login"}
              </DialogTitle>
              <p className="text-sm text-neutral-400">
                Demo access · No real credentials
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Username */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-neutral-400">
              Username
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500"
                placeholder="Enter username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wide text-neutral-400">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500"
                placeholder="Enter password"
              />
            </div>
          </div>

          {/* Barber select */}
          {role === "barber" && (
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wide text-neutral-400">
                Barber Shop
              </Label>
              <div className="relative">
                <Store className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                <select
                  value={selectedBarber}
                  onChange={(e) => setSelectedBarber(e.target.value)}
                  className="
                    w-full
                    rounded-md
                    bg-neutral-900
                    border
                    border-neutral-800
                    pl-9
                    pr-3
                    py-2
                    text-sm
                    text-neutral-100
                  "
                >
                  {barbers.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.shop}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="border-neutral-700 text-neutral-200 hover:bg-neutral-800"
              onClick={resetAndClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-white text-neutral-900 hover:bg-neutral-200 font-semibold"
            >
              Sign In
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
