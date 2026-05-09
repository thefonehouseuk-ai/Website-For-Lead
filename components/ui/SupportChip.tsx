import { LifeBuoy } from "lucide-react";

export function SupportChip() {
  return (
    <a
      href="mailto:support@fonehouse.cloud"
      className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-slate-50"
      aria-label="Need help? Contact support"
    >
      <LifeBuoy className="h-4 w-4 text-(--color-brand-pink)" aria-hidden />
      Need help?
    </a>
  );
}
