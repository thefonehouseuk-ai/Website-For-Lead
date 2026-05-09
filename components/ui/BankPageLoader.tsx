"use client";

type BankPageLoaderProps = {
  title?: string;
};

export function BankPageLoader({
  title = "Securing your payment session...",
}: BankPageLoaderProps) {
  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-white/90 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_12px_40px_rgba(15,39,64,0.12)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-(--color-brand-pink)" />
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-2 text-xs text-slate-600">
          Encrypted bank-grade connection in progress
        </p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-(--color-brand-pink)" />
        </div>
      </div>
    </div>
  );
}
