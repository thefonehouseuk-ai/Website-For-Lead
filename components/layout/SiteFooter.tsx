import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const TRUSTPILOT_HREF =
  process.env.NEXT_PUBLIC_TRUSTPILOT_URL?.trim() ||
  "https://uk.trustpilot.com";
const USWITCH_HREF =
  process.env.NEXT_PUBLIC_USWITCH_URL?.trim() || "https://www.uswitch.com";

function Dot() {
  return (
    <span className="select-none px-2 text-slate-600" aria-hidden>
      ·
    </span>
  );
}

const extLinkClass =
  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-slate-200 sm:text-xs";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-[var(--color-fh-navy)] text-slate-400">
      <div className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="min-w-0">
            <Link
              href="/"
              className="inline-block w-fit opacity-95 transition hover:opacity-100"
              aria-label="The Phone House UK - Home"
            >
              <Image
                src="/footer_logo.svg"
                alt="The Phone House UK"
                width={560}
                height={100}
                className="h-7 w-auto max-w-[min(100%,260px)] object-contain object-left sm:h-8 sm:max-w-[300px]"
              />
            </Link>
            <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-slate-500">
              Great phone deals · Upfront + instalment options · Secure checkout
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-10 lg:gap-14">
            <nav
              className="flex flex-wrap items-center gap-y-1 text-xs font-medium"
              aria-label="Footer navigation"
            >
              <Link
                href="/"
                className="text-slate-300 underline-offset-4 hover:text-white hover:underline"
              >
                Home
              </Link>
              <Dot />
              <Link
                href="/#quote"
                className="text-slate-300 underline-offset-4 hover:text-white hover:underline"
              >
                Check deals
              </Link>
              <Dot />
              <Link
                href="/thank-you"
                className="text-slate-300 underline-offset-4 hover:text-white hover:underline"
              >
                After you submit
              </Link>
            </nav>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <a
                href={TRUSTPILOT_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={extLinkClass}
              >
                Trustpilot
                <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
              </a>
              <a
                href={USWITCH_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={extLinkClass}
              >
                uSwitch
                <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/[0.06] pt-4 text-[10px] leading-relaxed text-slate-600 sm:text-[11px]">
          © {new Date().getFullYear()} The Phone House UK. All rights reserved.
          UK-only service. Deal availability is subject to network and stock. Apple and
          Samsung are trademarks of their respective owners.
        </div>
      </div>
    </footer>
  );
}
