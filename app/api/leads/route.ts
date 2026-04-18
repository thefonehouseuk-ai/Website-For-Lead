import { NextResponse } from "next/server";
import type { LeadPayload } from "@/types/lead";

function formatPakistanDateTime(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Karachi",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const day = get("day");
  const month = get("month");
  const year = get("year");
  const hour = get("hour");
  const minute = get("minute");
  const dayPeriod = get("dayPeriod").toUpperCase();

  return `${day} ${month} ${year}, ${hour}:${minute} ${dayPeriod}`;
}

function isLeadPayload(value: unknown): value is LeadPayload {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return (
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    typeof data.phone === "string" &&
    typeof data.model === "string" &&
    (data.condition === "new" || data.condition === "used" || data.condition === "broken") &&
    typeof data.createdAt === "string"
  );
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    if (!isLeadPayload(payload)) {
      return NextResponse.json({ message: "Invalid lead payload." }, { status: 400 });
    }

    const scriptUrl =
      process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!scriptUrl?.trim()) {
      return NextResponse.json(
        { message: "Submission URL is not configured on server." },
        { status: 500 },
      );
    }

    const createdAtPakistan = formatPakistanDateTime(new Date());
    const payloadWithPakistanTime: LeadPayload = {
      ...payload,
      // Leading apostrophe forces Google Sheets to keep this as plain text.
      createdAt: `'${createdAtPakistan}`,
    };

    const upstream = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadWithPakistanTime),
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { message: "Could not submit lead to Google Script." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Unexpected error while submitting lead." },
      { status: 500 },
    );
  }
}
