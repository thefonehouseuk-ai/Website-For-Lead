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
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = `Could not send your details (${res.status}). Please try again.`;
    try {
      const data = (await res.json()) as { message?: string };
      if (data?.message) message = data.message;
    } catch {
      // Keep fallback message when response is not JSON.
    }

    throw new LeadSubmissionError(
      message,
    );
  }
}
