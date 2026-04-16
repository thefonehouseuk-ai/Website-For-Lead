"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrustpilotStarRating } from "@/components/ui/TrustpilotStarRating";

const TRUSTPILOT_HREF =
  process.env.NEXT_PUBLIC_TRUSTPILOT_URL?.trim() ||
  "https://uk.trustpilot.com";
const USWITCH_HREF =
  process.env.NEXT_PUBLIC_USWITCH_URL?.trim() || "https://www.uswitch.com";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/90 bg-white shadow-sm"
    >
      {/* Top bar — logo + Trustpilot + Uswitch (fonehouse-style) */}
      <div className="mx-auto max-w-6xl px-3 py-2 sm:px-6 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="relative flex min-w-0 shrink-0 items-center py-0.5"
            aria-label="Home"
          >
            <Image
              src="/logo.svg"
              alt="Sell your phone"
              width={220}
              height={60}
              className="h-7 w-auto max-w-[min(148px,42vw)] object-contain object-left sm:h-9 sm:max-w-[200px]"
              priority
            />
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4 md:gap-5">
            <a
              href={TRUSTPILOT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 max-w-[58%] flex-col items-end gap-0.5 sm:max-w-none sm:flex-row sm:items-center sm:gap-2"
            >
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <TrustpilotStarRating size="sm" />
                <span className="hidden text-[10px] font-semibold text-slate-600 sm:inline sm:text-xs">
                  Excellent
                </span>
              </div>
              <Image
                src="/trustpilot.svg"
                alt="Trustpilot"
                width={200}
                height={62}
                className="h-5 w-auto max-h-6 max-w-full object-contain object-right opacity-95 transition group-hover:opacity-100 sm:h-7 sm:max-h-8"
              />
            </a>

            <a
              href={USWITCH_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-md border border-slate-200/80 bg-slate-50/80 px-1.5 py-1 transition hover:border-slate-300 hover:bg-white sm:px-2 sm:py-1.5"
              aria-label="uSwitch — compare deals"
            >
              <Image
                src="/uswitch.svg"
                alt="uSwitch"
                width={120}
                height={62}
                className="h-5 w-auto max-w-[min(92px,26vw)] object-contain sm:h-7 sm:max-w-[110px]"
              />
            </a>
          </div>
        </div>

        <p className="mt-1.5 hidden border-t border-slate-100 pt-1.5 text-right text-[11px] leading-snug text-slate-600 md:block md:text-xs">
          <span className="font-semibold text-slate-800">UK service</span>
          <span className="text-slate-400"> · </span>
          <span className="text-slate-500">Free collection · Fast payout</span>
        </p>
      </div>

      {/* Main nav — dark bar */}
      <div className="bg-[var(--color-nav-dark)]">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-2 px-3 sm:h-12 sm:gap-3 sm:px-6">
          <nav className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-white/95 sm:gap-x-4 sm:text-sm">
            <span className="hidden truncate text-white/70 lg:inline">
              Sell your phone
            </span>
            <span className="shrink-0 rounded bg-[var(--color-brand-pink)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white sm:px-2.5 sm:text-xs">
              Cash offers
            </span>
          </nav>
          <button
            type="button"
            className="shrink-0 touch-manipulation rounded-md bg-[var(--color-brand-pink)] px-3 py-2 text-xs font-semibold text-white transition active:scale-[0.98] hover:bg-[var(--color-brand-pink-hover)] sm:px-4 sm:py-2 sm:text-sm"
            onClick={() =>
              document.getElementById("quote")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Get quote
          </button>
        </div>
      </div>
    </motion.header>
  );
}
