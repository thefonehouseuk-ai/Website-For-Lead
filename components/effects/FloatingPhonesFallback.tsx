"use client";

import { motion } from "framer-motion";

export function FloatingPhonesFallback() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-95"
      aria-hidden
    >
      <div className="relative h-[min(420px,55vh)] w-full max-w-lg">
        <motion.div
          className="absolute left-[8%] top-[18%] h-48 w-24 rounded-2xl border border-slate-300 bg-gradient-to-b from-slate-700 to-slate-900 shadow-xl"
          animate={{ y: [0, -14, 0], rotateZ: [-6, -4, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[10%] top-[22%] h-52 w-[6.5rem] rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-300 shadow-xl"
          animate={{ y: [0, -18, 0], rotateZ: [8, 10, 8] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[38%] top-[32%] h-44 w-[5.5rem] rounded-2xl border border-slate-300 bg-gradient-to-b from-slate-800 to-slate-950 shadow-lg"
          animate={{ y: [0, -12, 0], rotateZ: [2, -2, 2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
