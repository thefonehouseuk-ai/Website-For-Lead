"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

type SubmitState = "idle" | "submitting" | "success";

type SubmissionFeedbackProps = {
  state: SubmitState;
  successTitle: string;
  successDescription: string;
};

export function SubmissionFeedback({
  state,
  successTitle,
  successDescription,
}: SubmissionFeedbackProps) {
  return (
    <AnimatePresence mode="wait">
      {state === "idle" ? null : (
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className={`rounded-xl border px-4 py-3 ${
            state === "submitting"
              ? "border-sky-200 bg-sky-50/70"
              : "border-emerald-200 bg-emerald-50/60"
          }`}
        >
          {state === "submitting" ? (
            <div className="flex items-center gap-2 text-[13px] font-medium text-sky-700 sm:text-sm">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Securing your details and submitting...
            </div>
          ) : (
            <div>
              <p className="flex items-center gap-2 text-[13px] font-semibold text-emerald-700 sm:text-sm">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                {successTitle}
              </p>
              <p className="mt-1 text-[12px] text-slate-600 sm:text-xs">{successDescription}</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
