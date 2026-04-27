import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Phone House UK collects, uses, stores, and protects personal data in line with UK data protection standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <div
        className="header-spacer shrink-0"
        style={{ height: "var(--header-total-height)" }}
        aria-hidden
      />
      <main className="bg-white pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Last updated: 27 April 2026
          </p>
          <p className="mt-6 text-sm leading-relaxed text-slate-700">
            This Privacy Policy explains how The Phone House UK collects and
            processes personal data when you use our website and submit a deal
            enquiry. We are committed to handling personal data responsibly and
            in line with UK data protection law, including the UK GDPR and the
            Data Protection Act 2018.
          </p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-700">
            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                1. Information we collect
              </h2>
              <p className="mt-2">
                When you submit our enquiry form, we collect your name, email
                address, phone number, preferred phone model, and phone
                condition. We may also collect limited technical information
                such as browser type, device type, and page activity for
                website security and analytics.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                2. How we use your information
              </h2>
              <p className="mt-2">
                We use personal data to respond to your enquiry, provide quote
                options, improve service quality, prevent fraud, and maintain
                records required for legal and operational purposes. We do not
                sell your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                3. Legal basis for processing
              </h2>
              <p className="mt-2">
                Under UK GDPR, we process your data based on one or more of the
                following legal bases:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>
                  Legitimate interests in operating and improving our services.
                </li>
                <li>Performance of a contract or pre-contract enquiries.</li>
                <li>Compliance with legal obligations.</li>
                <li>Consent, where required (including certain marketing).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                4. Marketing and Meta campaigns
              </h2>
              <p className="mt-2">
                We may use advertising and analytics tools, including Meta
                technologies, to measure campaign performance and improve lead
                quality. Where consent is required, we rely on your consent
                preferences. You can manage cookie and tracking preferences in
                your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                5. Sharing your data
              </h2>
              <p className="mt-2">
                We only share personal data with trusted service providers where
                necessary to run our business (for example hosting, analytics,
                lead processing, and communications support). These providers
                are required to protect data and use it only for instructed
                purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                6. International transfers
              </h2>
              <p className="mt-2">
                If personal data is transferred outside the UK, we use
                appropriate safeguards such as UK-approved contractual clauses
                or equivalent legal transfer mechanisms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                7. Data retention
              </h2>
              <p className="mt-2">
                We retain personal data only as long as necessary for the
                purposes described in this policy, including customer support,
                legal, and regulatory requirements. Retention periods are
                reviewed regularly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                8. Your rights
              </h2>
              <p className="mt-2">
                Subject to applicable law, you have rights to access, rectify,
                erase, restrict, object to processing, and request data
                portability. You also have the right to withdraw consent where
                processing is based on consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                9. Security
              </h2>
              <p className="mt-2">
                We use reasonable technical and organisational controls to
                protect personal data against unauthorised access, misuse,
                alteration, or loss.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900">
                10. Contact and complaints
              </h2>
              <p className="mt-2">
                For privacy requests or questions, contact us through the same
                website channels used for your enquiry. If you are not satisfied
                with how your data is handled, you may lodge a complaint with
                the UK Information Commissioner&apos;s Office (ICO):{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--color-brand-pink)] hover:underline"
                >
                  ico.org.uk
                </a>
                .
              </p>
            </section>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
