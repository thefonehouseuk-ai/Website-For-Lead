"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useExitIntent } from "@/hooks/useExitIntent";
import { Button } from "@/components/ui/Button";

export function ExitIntentModal() {
  const { open, dismiss } = useExitIntent({ delayMs: 3500 });

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
            aria-label="Close"
            onClick={dismiss}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="glass-panel glow-ring relative z-10 w-full max-w-md border-slate-200 p-4 pt-12 shadow-2xl sm:p-6 sm:pt-14"
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
            <h2
              id="exit-title"
              className="text-xl font-semibold tracking-tight text-slate-900"
            >
              Wait — grab your quote first
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Get a no-obligation cash offer in minutes. Free UK collection when
              you are ready to sell.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row">
              <Button
                type="button"
                className="min-h-12 flex-1 touch-manipulation sm:min-h-0"
                onClick={() => {
                  dismiss();
                  document.getElementById("quote")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Get Instant Quote
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="min-h-12 flex-1 touch-manipulation sm:min-h-0"
                onClick={dismiss}
              >
                Maybe later
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
