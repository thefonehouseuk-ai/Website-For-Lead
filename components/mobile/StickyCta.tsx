"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function StickyCta() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 28 }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(15,39,64,0.08)] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-center">
        <Button
          type="button"
          className="w-full min-h-12 touch-manipulation text-base"
          onClick={() =>
            document.getElementById("quote")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Get Instant Quote
        </Button>
      </div>
    </motion.div>
  );
}
