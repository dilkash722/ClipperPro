import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui utility
 * used by button, card, badge, etc.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ---------------------------------- */
/* App specific utils                  */
/* ---------------------------------- */

import { storage } from "./storage";
import { Barber } from "./types";

/**
 * Seed default barber shops
 * Runs only once (when no barbers exist)
 */
export function seedBarbersIfNeeded() {
  if (storage.getBarbers().length > 0) return;

  const data: Barber[] = [
    ["Downtown Clippers", "Alex Rivera", "12 Market St"],
    ["Edge Barbers", "Sam Cohen", "44 Elm Ave"],
    ["Classic Cuts", "Rita Gomez", "7 Pine Rd"],
  ].map((b, i) => ({
    id: `barber_${i + 1}`,
    shop: b[0],
    owner: b[1],
    address: b[2],
    paid: true,
    status: "open", // ✅ REQUIRED BY Barber TYPE
  }));

  storage.saveBarbers(data);
}
