"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { FloatingPhonesFallback } from "./FloatingPhonesFallback";

const HeroPhoneModelScene = dynamic(
  () =>
    import("./HeroPhoneModelScene").then((m) => ({
      default: m.HeroPhoneModelScene,
    })),
  { ssr: false, loading: () => <FloatingPhonesFallback /> },
);

export function HeroFloatingPhones() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduceMotion) {
    return <FloatingPhonesFallback />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.98]">
      <Suspense fallback={<FloatingPhonesFallback />}>
        <HeroPhoneModelScene />
      </Suspense>
    </div>
  );
}
