import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import { ConsolePreview } from "@/components/site/console-preview";
import { LogosCompliance } from "@/components/site/logos-compliance";
import { SafetyModel } from "@/components/site/safety-model";
import { InstantAudit } from "@/components/site/instant-audit";
import { HowItWorks } from "@/components/site/how-it-works";
import { Coverage } from "@/components/site/coverage";
import { DeveloperFirst } from "@/components/site/developer-first";
import { AuditReports } from "@/components/site/audit-reports";
import { CaseStudies } from "@/components/site/case-studies";
import { Founder } from "@/components/site/founder";
import { Pricing } from "@/components/site/pricing";
import { Faq } from "@/components/site/faq";
import { FinalCta } from "@/components/site/final-cta";
import { SiteFooter } from "@/components/site/site-footer";
import { FadeIn } from "@/components/motion";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <FadeIn>
          <ConsolePreview />
        </FadeIn>
        <FadeIn>
          <LogosCompliance />
        </FadeIn>
        <FadeIn>
          <SafetyModel />
        </FadeIn>
        <FadeIn>
          <InstantAudit />
        </FadeIn>
        <FadeIn>
          <HowItWorks />
        </FadeIn>
        <FadeIn>
          <Coverage />
        </FadeIn>
        <FadeIn>
          <DeveloperFirst />
        </FadeIn>
        <FadeIn>
          <AuditReports />
        </FadeIn>
        <FadeIn>
          <CaseStudies />
        </FadeIn>
        <FadeIn>
          <Founder />
        </FadeIn>
        <FadeIn>
          <Pricing />
        </FadeIn>
        <FadeIn>
          <Faq />
        </FadeIn>
        <FadeIn>
          <FinalCta />
        </FadeIn>
      </main>
      <SiteFooter />
    </>
  );
}
