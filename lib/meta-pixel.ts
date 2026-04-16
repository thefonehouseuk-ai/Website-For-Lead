"use client";

export function trackMetaLead(value?: number, currency = "GBP"): void {
  if (typeof window === "undefined" || !window.fbq) return;
  const payload =
    value !== undefined ? { value, currency } : { currency };
  window.fbq("track", "Lead", payload);
}

export function trackMetaPageView(): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "PageView");
}
