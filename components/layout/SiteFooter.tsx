import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-[var(--color-fh-navy)] py-12 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs leading-relaxed text-slate-400">
          © {new Date().getFullYear()} Sell Your Phone UK. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
          <Link
            href="/"
            className="text-slate-300 transition hover:text-[var(--color-brand-pink-soft)]"
          >
            Home
          </Link>
          <Link
            href="/thank-you"
            className="text-slate-300 transition hover:text-[var(--color-brand-pink-soft)]"
          >
            Thank you
          </Link>
        </div>
      </div>
    </footer>
  );
}
