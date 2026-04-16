"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const wa =
  process.env.NEXT_PUBLIC_WHATSAPP_E164?.replace(/\D/g, "") || "441234567890";

export function ThankYouClient() {
  const router = useRouter();

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-3 py-16 sm:px-4 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-72 w-[min(600px,90vw)] -translate-x-1/2 rounded-full bg-[var(--color-brand-pink)]/20 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-48 w-48 rounded-full bg-[var(--color-brand-pink)]/15 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel glow-ring relative z-10 w-full max-w-lg border-slate-200 p-5 text-center shadow-2xl sm:p-8"
      >
        <div className="mx-auto mb-6 flex justify-center">
          <Image
            src="/logo1.svg"
            alt="Sell your phone"
            width={200}
            height={54}
            className="h-8 w-auto object-contain"
          />
        </div>
        <motion.div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 ring-2 ring-emerald-200"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        >
          <CheckCircle2
            className="h-9 w-9 text-emerald-600"
            strokeWidth={1.65}
            aria-hidden
          />
        </motion.div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Your quote is being prepared
        </h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          We will contact you shortly with your personalised offer. Keep an eye
          on your inbox and phone.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            variant="whatsapp"
            className="w-full sm:w-auto"
            onClick={() => {
              window.open(`https://wa.me/${wa}`, "_blank", "noopener,noreferrer");
            }}
          >
            Message us on WhatsApp
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full sm:w-auto"
            onClick={() => router.push("/")}
          >
            Return home
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
