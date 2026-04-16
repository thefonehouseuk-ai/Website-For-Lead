"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  /** Minimum time on page before exit intent can fire (ms) */
  delayMs?: number;
  /** Cooldown after dismiss (ms) */
  cooldownMs?: number;
  /** Only fire when cursor leaves near the top of the viewport */
  sensitivityPx?: number;
};

export function useExitIntent(options: Options = {}) {
  const { delayMs = 4000, cooldownMs = 1000 * 60 * 60 * 24, sensitivityPx = 12 } =
    options;
  const [open, setOpen] = useState(false);
  const armedRef = useRef(false);
  const dismissedAtRef = useRef(0);
  const pageEnterRef = useRef<number | null>(null);

  useEffect(() => {
    pageEnterRef.current = Date.now();
    const t = window.setTimeout(() => {
      armedRef.current = true;
    }, delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs]);

  const onMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (!armedRef.current || open) return;
      if (Date.now() - dismissedAtRef.current < cooldownMs) return;
      if (e.clientY > sensitivityPx) return;
      if (pageEnterRef.current && Date.now() - pageEnterRef.current < delayMs)
        return;
      setOpen(true);
    },
    [cooldownMs, delayMs, open, sensitivityPx],
  );

  useEffect(() => {
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () =>
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
  }, [onMouseLeave]);

  const dismiss = useCallback(() => {
    dismissedAtRef.current = Date.now();
    setOpen(false);
  }, []);

  return { open, dismiss, setOpen };
}
