import { SiteHeader } from "@/components/layout/SiteHeader";
import { TrustStrip } from "@/components/layout/TrustStrip";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { LeadForm } from "@/components/form/LeadForm";
import { StickyCta } from "@/components/mobile/StickyCta";
import { ExitIntentModal } from "@/components/marketing/ExitIntentModal";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <div
        className="header-spacer shrink-0"
        style={{ height: "var(--header-total-height)" }}
        aria-hidden
      />
      <TrustStrip />
      <main className="bg-white pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        <Hero />
        <TrustBadges />
        <div className="mx-auto max-w-6xl px-3 sm:px-6">
          <LeadForm />
        </div>
        <WhyChooseUs />
        <Testimonials />
        <SiteFooter />
      </main>
      <StickyCta />
      <ExitIntentModal />
    </>
  );
}
