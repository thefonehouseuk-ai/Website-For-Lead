"use client";

import { motion } from "framer-motion";
import { MotionSection } from "@/components/ui/MotionSection";
import { TrustpilotStarRating } from "@/components/ui/TrustpilotStarRating";

const quotes = [
  {
    name: "Sarah L.",
    place: "Manchester",
    text: "Straightforward from start to finish. Paid the same day they collected my iPhone.",
  },
  {
    name: "Daniel K.",
    place: "London",
    text: "Best quote I received in the UK. Polite team and zero pressure.",
  },
  {
    name: "Amelia R.",
    place: "Bristol",
    text: "Sold a damaged Samsung — still got a fair price. Would use again.",
  },
] as const;

export function Testimonials() {
  return (
    <MotionSection className="mx-auto max-w-6xl px-3 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-pink)]">
          Testimonials
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          Loved by sellers nationwide
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
        {quotes.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="relative flex h-full flex-col rounded-2xl border border-slate-200/90 bg-[#f2f2f5] p-5 shadow-sm sm:p-6"
          >
            <TrustpilotStarRating size="md" className="shrink-0" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-800">
              “{q.text}”
            </blockquote>
            <figcaption className="mt-5 border-t border-slate-200/80 pt-4 text-xs text-slate-500">
              <span className="font-semibold text-slate-900">{q.name}</span> ·{" "}
              {q.place}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </MotionSection>
  );
}
