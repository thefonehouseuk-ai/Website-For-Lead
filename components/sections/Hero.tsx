"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { HeroFloatingPhones } from "@/components/effects/HeroFloatingPhones";

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
              UK-wide phone buying
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.04 }}
              className="mt-2 max-w-2xl text-2xl font-bold leading-[1.12] tracking-tight text-white sm:mt-3 sm:text-4xl sm:leading-[1.08] lg:text-[3.05rem]"
            >
              Sell Your Phone in the UK – Get Instant Cash
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-3 max-w-xl text-sm font-medium leading-snug text-white/90 sm:mt-4 sm:text-lg sm:leading-normal"
            >
              Free Collection | Fast Payment | Trusted Service
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
                Get Instant Quote
              </Button>
              <p className="text-center text-[11px] text-white/80 sm:text-left sm:text-sm">
                No obligation · Same-day payouts typical
              </p>
            </motion.div>
          </motion.div>

          <div className="relative order-1 mx-auto h-[min(240px,42vh)] w-full max-w-md sm:h-[min(320px,46vh)] sm:max-w-lg lg:order-2 lg:mx-0 lg:h-[min(440px,56vh)]">
            <HeroFloatingPhones />
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
          {[
            ["4.9★", "Rated service"],
            ["UK", "Nationwide"],
            ["£0", "Collection fee"],
          ].map(([k, v]) => (
            <div
              key={v}
              className="fh-card rounded-xl px-2 py-2.5 text-center shadow-sm sm:rounded-2xl sm:px-4 sm:py-3"
            >
              <dt className="text-sm font-bold text-slate-900 sm:text-base lg:text-lg">
                {k}
              </dt>
              <dd className="mt-0.5 text-[9px] leading-tight text-slate-500 sm:text-xs">
                {v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
