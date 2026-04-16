import type { LeadPayload } from "@/types/lead";

export class LeadSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LeadSubmissionError";
  }
}

export async function submitLeadToGoogleScript(
  payload: LeadPayload,
): Promise<void> {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  if (!url?.trim()) {
    throw new LeadSubmissionError(
      "Submission URL is not configured. Set NEXT_PUBLIC_GOOGLE_SCRIPT_URL.",
    );
  }

  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new LeadSubmissionError(
      `Could not send your details (${res.status}). Please try again.`,
    );
  }
}
