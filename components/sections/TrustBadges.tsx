"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { MapPin, ShieldCheck, Wallet } from "lucide-react";
import { MotionSection } from "@/components/ui/MotionSection";

const badges: readonly {
  label: string;
  sub: string;
  Icon: LucideIcon;
}[] = [
  { label: "UK Based", sub: "Nationwide coverage", Icon: MapPin },
  { label: "Secure Process", sub: "Data-safe handling", Icon: ShieldCheck },
  { label: "Fast Payments", sub: "Quick verification", Icon: Wallet },
];

export function TrustBadges() {
  return (
    <MotionSection className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {badges.map((b, i) => {
          const Icon = b.Icon;
          return (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="fh-card flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">{b.label}</p>
              <p className="text-xs text-slate-500">{b.sub}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-pink)]/18 to-pink-100/70 text-[var(--color-brand-pink)] ring-1 ring-slate-200/90">
              <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
            </div>
          </motion.div>
          );
        })}
      </div>
    </MotionSection>
  );
}
