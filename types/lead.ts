export type PhoneCondition = "new" | "used" | "broken";

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  model: string;
  condition: PhoneCondition;
  createdAt: string;
};

declare global {
  interface Window {
    fbq?: (
      action: "track" | "trackCustom",
      event: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}
