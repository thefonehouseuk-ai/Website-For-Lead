"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Lightweight hero art (no WebGL) — phones + £ cash motif on brand pink */
export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  const drift = (delay: number, y: number) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, y, 0] },
          transition: {
            duration: 4.2 + delay * 0.4,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <div
      className="relative mx-auto flex min-h-[220px] w-full max-w-md items-center justify-center sm:min-h-[280px] lg:max-w-none lg:min-h-[320px]"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[min(72vw,280px)] w-[min(72vw,280px)] rounded-full border border-white/12 sm:h-72 sm:w-72" />
        <div className="absolute h-[min(88vw,340px)] w-[min(88vw,340px)] rounded-full border border-white/8 sm:h-[22rem] sm:w-[22rem]" />
        <div className="absolute -right-4 top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl sm:right-0 sm:top-10" />
        <div className="absolute -left-2 bottom-10 h-20 w-20 rounded-full bg-black/10 blur-2xl" />
      </div>

      {/* Back-left phone */}
      <motion.div
        className="absolute left-[2%] top-[14%] z-0 sm:left-[4%]"
        {...drift(0, -10)}
      >
        <div className="h-36 w-[4.25rem] rotate-[-8deg] rounded-[1.35rem] border border-white/35 bg-white/12 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:h-44 sm:w-[5rem]">
          <div className="h-full w-full rounded-[1.05rem] bg-gradient-to-b from-slate-800/90 to-slate-950/95" />
        </div>
      </motion.div>

      {/* Back-right phone */}
      <motion.div
        className="absolute right-[0%] top-[18%] z-0 sm:right-[2%]"
        {...drift(0.6, -12)}
      >
        <div className="h-40 w-[4.5rem] rotate-[10deg] rounded-[1.35rem] border border-white/40 bg-white/18 p-1 shadow-[0_22px_48px_rgba(0,0,0,0.15)] backdrop-blur-sm sm:h-48 sm:w-[5.25rem]">
          <div className="h-full w-full rounded-[1.05rem] bg-gradient-to-b from-white/90 to-slate-200/95" />
        </div>
      </motion.div>

      {/* Hero phone — centre */}
      <motion.div
        className="relative z-10"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="relative" {...(reduceMotion ? {} : drift(0.2, -14))}>
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-white/25 via-transparent to-black/10 blur-md" />
          <div className="relative flex h-[min(52vw,260px)] w-[min(34vw,170px)] flex-col rounded-[1.75rem] border-2 border-white/50 bg-gradient-to-b from-white/95 to-white/80 p-2 shadow-[0_28px_60px_rgba(15,17,21,0.28)] sm:h-72 sm:w-[11.25rem] sm:rounded-[2rem] sm:p-2.5">
            <div className="relative flex-1 overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-[var(--color-brand-pink)] via-[#ff4fa3] to-[#b80062] sm:rounded-[1.4rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/10 to-transparent sm:h-9" />
              <div className="relative flex h-full flex-col items-center justify-center px-2 pb-6 pt-4 text-white">
                <span className="text-[2.5rem] font-black leading-none tracking-tight drop-shadow-sm sm:text-5xl">
                  £
                </span>
                <span className="mt-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 sm:text-[11px]">
                  Instant
                  <br />
                  cash
                </span>
              </div>
              <div className="absolute bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/35 sm:bottom-2.5 sm:w-12" />
            </div>
          </div>

          <motion.div
            className="absolute -right-2 top-1/4 z-20 translate-x-1/2 rounded-full border border-white/40 bg-[var(--color-nav-dark)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg sm:-right-3 sm:px-3 sm:text-xs"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={reduceMotion ? false : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            Paid today
          </motion.div>

          <motion.div
            className="absolute -left-1 bottom-[22%] z-20 -translate-x-1/3 rounded-xl border border-white/50 bg-white/95 px-2 py-1.5 text-[10px] font-semibold text-[var(--color-brand-pink)] shadow-md sm:bottom-[24%] sm:px-2.5 sm:text-[11px]"
            initial={reduceMotion ? false : { opacity: 0, x: -6 }}
            animate={reduceMotion ? false : { opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            Free UK pickup
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
