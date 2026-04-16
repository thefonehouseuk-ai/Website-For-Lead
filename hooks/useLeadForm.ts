"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trackMetaLead } from "@/lib/meta-pixel";
import { submitLeadToGoogleScript, LeadSubmissionError } from "@/lib/submit-lead";
import type { LeadPayload, PhoneCondition } from "@/types/lead";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(120, "Name is too long"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid UK number")
    .max(20, "Number is too long")
    .regex(/^[\d+\s()-]+$/, "Use digits and optional + / spaces"),
  model: z.string().trim().min(1, "Choose your phone model"),
  condition: z.enum(["new", "used", "broken"], {
    message: "Select a condition",
  }),
});

export type LeadFormValues = z.infer<typeof schema>;

export function useLeadForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      model: "",
      condition: "used",
    },
    mode: "onTouched",
  });

  const submit = useCallback(
    async (values: LeadFormValues) => {
      setSubmitError(null);
      const payload: LeadPayload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        model: values.model,
        condition: values.condition as PhoneCondition,
        createdAt: new Date().toISOString(),
      };

      try {
        await submitLeadToGoogleScript(payload);
        trackMetaLead();
        router.push("/thank-you");
      } catch (err) {
        const message =
          err instanceof LeadSubmissionError
            ? err.message
            : "Something went wrong. Please try again.";
        setSubmitError(message);
      }
    },
    [router],
  );

  return { form, submitForm: form.handleSubmit(submit), submitError };
}
