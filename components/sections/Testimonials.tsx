"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MotionSection } from "@/components/ui/MotionSection";
import { TrustpilotStarRating } from "@/components/ui/TrustpilotStarRating";

const quotes = [
  {
    name: "Sarah L.",
    place: "Manchester",
    text: "Great deal on my new iPhone. The upfront and monthly breakdown was crystal clear.",
  },
  {
    name: "Daniel K.",
    place: "London",
    text: "Best contract deal I found in the UK. Helpful team and zero pressure.",
  },
  {
    name: "Amelia R.",
    place: "Bristol",
    text: "I picked a Samsung with a small upfront cost and the process was smooth.",
  },
  {
    name: "James T.",
    place: "Birmingham",
    text: "Order arrived on time and setup support was brilliant from start to finish.",
  },
  {
    name: "Priya M.",
    place: "Leeds",
    text: "Clear updates at every step. I knew exactly what I was paying each month.",
  },
  {
    name: "Oliver H.",
    place: "Edinburgh",
    text: "Upgraded both our family phones on one plan. Much easier than comparing dozens of sites.",
  },
  {
    name: "Hannah W.",
    place: "Cardiff",
    text: "I had questions about network coverage and they guided me to the right deal.",
  },
  {
    name: "Marcus P.",
    place: "Glasgow",
    text: "Competitive Pixel deal with fair monthly payments. Everything was sorted quickly.",
  },
  {
    name: "Emma S.",
    place: "Newcastle",
    text: "No hidden extras. The deal shown online matched exactly what I paid.",
  },
] as const;

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const edge = 2;
    setCanPrev(scrollLeft > edge);
    setCanNext(scrollLeft < scrollWidth - clientWidth - edge);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [updateArrows]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const gap = 16;
    const step = (first?.offsetWidth ?? 300) + gap;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <MotionSection className="mx-auto max-w-6xl px-3 py-10 sm:px-6 sm:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:max-w-xl sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-pink)]">
            Testimonials
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Loved by buyers nationwide
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Swipe or use the arrows to read more reviews from across the UK.
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            disabled={!canPrev}
            aria-label="Show previous testimonials"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-[var(--color-brand-pink)]/40 hover:bg-pink-50/80 hover:text-[var(--color-brand-pink)] disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            disabled={!canNext}
            aria-label="Show next testimonials"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-[var(--color-brand-pink)]/40 hover:bg-pink-50/80 hover:text-[var(--color-brand-pink)] disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {quotes.map((q, i) => (
            <motion.figure
              key={`${q.name}-${q.place}`}
              data-testimonial-card
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ delay: Math.min(i * 0.04, 0.2), duration: 0.45 }}
              whileHover={{ y: -3 }}
              className="relative flex w-[min(100%,19rem)] shrink-0 snap-start flex-col rounded-2xl border border-slate-200/90 bg-[#f2f2f5] p-5 shadow-sm sm:w-80 sm:p-6 md:w-[22rem]"
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
      </div>
    </MotionSection>
  );
}
