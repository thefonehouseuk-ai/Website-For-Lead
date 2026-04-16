"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Truck, Zap } from "lucide-react";
import { MotionSection } from "@/components/ui/MotionSection";

const items: readonly {
  title: string;
  body: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Free Pickup",
    body: "Doorstep collection across the UK — no hidden fees, no faff.",
    Icon: Truck,
  },
  {
    title: "Same Day Payment",
    body: "Once your device is verified, we move quickly so you get paid.",
    Icon: Zap,
  },
  {
    title: "Trusted UK Service",
    body: "Clear communication, secure handling, and honest grading.",
    Icon: ShieldCheck,
  },
];

export function WhyChooseUs() {
  return (
    <MotionSection className="mx-auto max-w-6xl px-3 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-pink)]">
          Why choose us
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          Built around trust, speed, and clarity
        </h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          We make selling your phone feel effortless — from quote to cash in
          your account.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.Icon;
          return (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="fh-card glow-ring relative overflow-hidden p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-pink)]/12 to-pink-100/80 text-[var(--color-brand-pink)] ring-1 ring-[var(--color-brand-pink)]/15">
              <Icon className="h-6 w-6" strokeWidth={1.65} aria-hidden />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {item.body}
            </p>
          </motion.article>
          );
        })}
      </div>
    </MotionSection>
  );
}
