"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const items = [
  { label: "Free UK collection" },
  { label: "Fast secure payment" },
  { label: "Trusted UK service" },
] as const;

export function TrustStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
      className="sticky z-30 border-b border-slate-200/90 bg-[var(--color-fh-trust-bar)] text-slate-700"
      style={{ top: "var(--header-total-height)" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-3 py-3 text-[10px] font-medium leading-tight sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:px-6 sm:py-3 sm:text-xs">
        {items.map((item) => (
          <span
            key={item.label}
            className="inline-flex flex-col items-center justify-center gap-1 text-center text-slate-700 sm:flex-row sm:justify-center mt-2 sm:gap-2 sm:text-left"
          >
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white sm:h-[1.35rem] sm:w-[1.35rem]"
              aria-hidden
            >
              <Check className="h-3 w-3 stroke-[2.75] sm:h-3.5 sm:w-3.5" />
            </span>
            <span className="leading-tight">{item.label}</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
