import { MarketingShell } from "@/components/site/marketing-shell";

export default function PrivacyPage() {
  return (
    <MarketingShell
      eyebrow="Legal"
      title={{ a: "Privacy policy", b: "& data protection." }}
      sub="Last updated · 2026-09-26"
    >
      <article className="container-rail pb-[var(--section-y)] max-w-[680px] prose-like space-y-6 text-[17px] leading-[1.7]">
        <p className="text-muted-foreground">
          At MIAN DAST we adhere to Safe-by-Default and zero unnecessary retention. This page is a
          skeleton — replace with counsel-approved copy.
        </p>
        <h2 className="text-[28px] font-normal tracking-[-0.02em]">What we collect</h2>
        <p className="text-muted-foreground">
          Account email, attestation records, and scan telemetry required to deliver the service.
          Passive audit inputs are processed ephemerally in SAMPLE mode until wired.
        </p>
        <h2 className="text-[28px] font-normal tracking-[-0.02em]">Contact</h2>
        <p className="text-muted-foreground">
          <a href="mailto:security@askmian.com" className="underline underline-offset-[3px]">
            security@askmian.com
          </a>
        </p>
      </article>
    </MarketingShell>
  );
}
