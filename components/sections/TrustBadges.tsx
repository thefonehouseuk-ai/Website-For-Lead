"use client";

import { motion } from "framer-motion";
import { MotionSection } from "@/components/ui/MotionSection";

const badges = [
  { label: "UK Based", sub: "Nationwide coverage" },
  { label: "Secure Process", sub: "Data-safe handling" },
  { label: "Fast Payments", sub: "Quick verification" },
] as const;

export function TrustBadges() {
  return (
    <MotionSection className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {badges.map((b, i) => (
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
            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-[var(--color-brand-pink)]/25 to-pink-200/60 ring-1 ring-slate-200" />
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
}
