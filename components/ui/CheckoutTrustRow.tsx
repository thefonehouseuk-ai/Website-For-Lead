import { Lock, ShieldCheck } from "lucide-react";

type CheckoutTrustRowProps = {
  primary: string;
  secondary: string;
};

export function CheckoutTrustRow({ primary, secondary }: CheckoutTrustRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium text-slate-600 sm:text-xs">
      <span className="inline-flex items-center gap-1.5">
        <Lock className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
        {primary}
      </span>
      <span className="hidden text-slate-400 sm:inline">|</span>
      <span className="inline-flex items-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5 text-sky-600" aria-hidden />
        {secondary}
      </span>
    </div>
  );
}
