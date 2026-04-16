import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThankYouClient } from "./thank-you-client";

export const metadata: Metadata = {
  title: "Thank you",
  description:
    "Your quote is being prepared. Our UK team will contact you shortly.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <div style={{ height: "var(--header-total-height)" }} aria-hidden />
      <ThankYouClient />
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-600">
        <Link
          href="/"
          className="font-medium text-[var(--color-brand-pink)] hover:underline"
        >
          ← Back to home
        </Link>
      </footer>
    </div>
  );
}
