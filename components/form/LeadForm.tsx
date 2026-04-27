"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useLeadForm } from "@/hooks/useLeadForm";
import { Button } from "@/components/ui/Button";
import { PhoneModelCombobox } from "@/components/form/PhoneModelCombobox";
import { cn } from "@/lib/utils";

const inputClass = (err?: string) =>
  cn(
    "min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 outline-none transition-[border,box-shadow] placeholder:text-slate-400 sm:min-h-0 sm:text-sm",
    err
      ? "border-rose-400 focus:border-rose-500"
      : "border-slate-300 focus:border-[var(--color-brand-pink)] focus:shadow-[0_0_0_3px_rgba(228,0,127,0.18)]",
  );

export function LeadForm() {
  const { form, submitForm, submitError } = useLeadForm();
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <motion.div
      id="quote"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel glow-ring relative overflow-hidden p-4 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-[var(--color-brand-pink)]/10 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-pink)]">
          Deal enquiry
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
          Tell us what phone deal you need
        </h2>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Complete the form - our UK team will share the best upfront and
          monthly options that match your needs.
        </p>

        <form
          onSubmit={submitForm}
          className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5"
          noValidate
        >
          <div className="sm:col-span-1">
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Full name
            </label>
            <motion.input
              whileFocus={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={inputClass(errors.name?.message)}
              placeholder="e.g. James Mitchell"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name?.message ? (
              <p className="mt-1.5 text-xs text-rose-600" role="alert">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-1">
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              type="email"
              className={inputClass(errors.email?.message)}
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email?.message ? (
              <p className="mt-1.5 text-xs text-rose-600" role="alert">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-1">
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Phone number
            </label>
            <motion.input
              whileFocus={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              type="tel"
              className={inputClass(errors.phone?.message)}
              placeholder="07xxx xxxxxx"
              autoComplete="tel"
              {...register("phone")}
            />
            {errors.phone?.message ? (
              <p className="mt-1.5 text-xs text-rose-600" role="alert">
                {errors.phone.message}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-1">
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <PhoneModelCombobox
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.model?.message}
                />
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <span className="mb-2 block text-xs font-medium text-slate-700">
              Preferred device type
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {(
                [
                  { id: "new", label: "Brand new" },
                  { id: "used", label: "Refurbished / like new" },
                  { id: "broken", label: "Budget-friendly options" },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.id}
                  className={cn(
                    "flex min-h-11 cursor-pointer touch-manipulation items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-colors sm:min-h-0",
                    form.watch("condition") === opt.id
                      ? "border-[var(--color-brand-pink)] bg-pink-50 text-slate-900 ring-1 ring-[var(--color-brand-pink)]/25"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                  )}
                >
                  <input
                    type="radio"
                    value={opt.id}
                    className="accent-[var(--color-brand-pink)]"
                    {...register("condition")}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.condition?.message ? (
              <p className="mt-2 text-xs text-rose-600" role="alert">
                {errors.condition.message}
              </p>
            ) : null}
          </div>

          {submitError ? (
            <div
              className="sm:col-span-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
              role="alert"
            >
              {submitError}
            </div>
          ) : null}

          <div className="sm:col-span-2">
            <Button
              type="submit"
              className="min-h-12 w-full touch-manipulation sm:min-h-0 sm:w-auto"
              loading={isSubmitting}
            >
              Get my best deal
              <Send className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
            </Button>
            <p className="mt-3 text-xs text-slate-500">
              By submitting, you agree to be contacted about available deals. We
              never sell your data. Read our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-[var(--color-brand-pink)] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
