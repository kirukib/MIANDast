import { SectionHeader } from "@/components/site/primitives";

export function LegacyCompare() {
  return (
    <section className="section container-rail">
      <SectionHeader
        eyebrow="Outage risk"
        title={{ a: "Traditional scanners", b: "vs safe-by-default." }}
      />
      <div className="mt-12 border border-border grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 bg-background">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            Traditional scanners · outage risk{" "}
            <span className="text-sev-critical border border-sev-critical/30 px-1 ml-1">High</span>
          </p>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            <li>Thread / DB exhaustion under blind payload bursts</li>
            <li>Third-party spidering of Stripe, AWS, CDN origins</li>
            <li>~40% false positives without verified proofs</li>
          </ul>
        </div>
        <div className="p-6 bg-card border-t md:border-t-0 md:border-l border-border">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            MIAN DAST · outage risk{" "}
            <span className="text-success border border-success/30 px-1 ml-1">Zero</span>
          </p>
          <ul className="mt-6 space-y-4 text-sm">
            <li>Sub-85ms adaptive backoff on canary strain</li>
            <li>Fenced hosts — third parties hard-blocked</li>
            <li>Verified proofs with request + OAST evidence</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
