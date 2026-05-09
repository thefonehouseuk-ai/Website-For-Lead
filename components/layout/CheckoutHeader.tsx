import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-17 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="The Phone House UK - Home"
        >
          <Image
            src="/logo1.svg"
            alt="The Phone House UK"
            width={220}
            height={60}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          <span>Secure checkout</span>
        </div>
      </div>
    </header>
  );
}
