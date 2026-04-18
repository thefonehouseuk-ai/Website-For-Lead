"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "inverse";
  loading?: boolean;
};

export function Button({
  children,
  className,
  variant = "primary",
  loading,
  disabled,
  ...props
}: Props) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold tracking-tight shadow-sm transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-pink)] disabled:pointer-events-none disabled:opacity-50";

  const styles = {
    primary:
      "bg-[var(--color-brand-pink)] text-white hover:bg-[var(--color-brand-pink-hover)] hover:shadow-md",
    inverse:
      "border-0 bg-white text-[var(--color-brand-pink)] shadow-md hover:bg-white/95 hover:shadow-lg",
    ghost:
      "border border-slate-300 bg-white text-slate-800 shadow-none hover:border-slate-400 hover:bg-slate-50",
  }[variant];

  const spinnerLight = variant === "ghost" || variant === "inverse";

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(base, styles, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "h-4 w-4 animate-spin rounded-full border-2",
              spinnerLight
                ? "border-slate-300 border-t-[var(--color-brand-pink)]"
                : "border-white/50 border-t-white",
            )}
            aria-hidden
          />
          <span>Sending…</span>
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
