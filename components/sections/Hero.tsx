"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  PoundSterling,
  Star,
} from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/effects/HeroVisual";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.55]);

  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative isolate">
      <div className="relative overflow-hidden bg-[var(--color-brand-pink)] px-4 pb-12 pt-6 text-white sm:px-6 sm:pb-16 sm:pt-9">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
        >
          <div className="absolute -right-16 top-0 h-52 w-52 rounded-full bg-white/20 blur-3xl sm:-right-20 sm:h-64 sm:w-64" />
          <div className="absolute -bottom-8 left-4 h-40 w-40 rounded-full bg-black/10 blur-2xl sm:-bottom-10 sm:left-10 sm:h-48 sm:w-48" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <motion.div style={{ y, opacity }} className="relative z-10 order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-xs sm:tracking-[0.2em]"
            >
              UK-wide phone deals
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.04 }}
              className="mt-2 max-w-2xl text-2xl font-bold leading-[1.12] tracking-tight text-white sm:mt-3 sm:text-4xl sm:leading-[1.08] lg:text-[3.05rem]"
            >
              Buy Your Phone in the UK - Upfront or Monthly Instalments
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-3 max-w-xl text-sm font-medium leading-snug text-white/90 sm:mt-4 sm:text-lg sm:leading-normal"
            >
              Best UK Deals | Flexible Upfront Cost | Trusted Retailer
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button
                type="button"
                variant="inverse"
                className="w-full min-h-12 touch-manipulation sm:w-auto sm:min-h-0"
                onClick={scrollToQuote}
              >
                View Phone Deals
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Button>
              <p className="text-center text-[11px] text-white/80 sm:text-left sm:text-sm">
                No hidden fees · Flexible payment plans
              </p>
            </motion.div>
          </motion.div>

          <div className="relative order-1 mx-auto flex w-full max-w-lg justify-center lg:order-2 lg:mx-0 lg:max-w-none">
            <HeroVisual />
          </div>
        </div>
      </div>

      <div className="border-b border-slate-100 bg-white px-3 py-6 sm:px-6 sm:py-8">
        <motion.dl
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto grid max-w-6xl grid-cols-3 gap-2 sm:gap-4"
        >
          {(
            [
              {
                id: "rated",
                term: (
                  <span className="inline-flex items-center justify-center gap-1">
                    <span>4.9</span>
                    <Star
                      className="h-[1.05em] w-[1.05em] fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  </span>
                ),
                desc: "Rated service",
              },
              {
                id: "nationwide",
                term: (
                  <span className="inline-flex items-center justify-center gap-1">
                    <MapPin
                      className="h-[1em] w-[1em] text-[var(--color-brand-pink)]"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    <span>UK</span>
                  </span>
                ),
                desc: "Nationwide",
              },
              {
                id: "fee",
                term: (
                  <span className="inline-flex items-center justify-center gap-1">
                    <PoundSterling
                      className="h-[1em] w-[1em] text-[var(--color-brand-pink)]"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    <span>£0</span>
                  </span>
                ),
                desc: "Setup fee",
              },
            ] as const
          ).map((row) => (
            <div
              key={row.id}
              className="fh-card rounded-xl px-2 py-2.5 text-center shadow-sm sm:rounded-2xl sm:px-4 sm:py-3"
            >
              <dt className="text-sm font-bold text-slate-900 sm:text-base lg:text-lg">
                {row.term}
              </dt>
              <dd className="mt-0.5 text-[9px] leading-tight text-slate-500 sm:text-xs">
                {row.desc}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
