import { MarketingShell } from "@/components/site/marketing-shell";
import Link from "next/link";

export default function CaseStudiesIndexPage() {
  return (
    <MarketingShell
      eyebrow="Cases"
      title={{ a: "Production stories", b: "with verified proofs." }}
    >
      <section className="container-rail pb-[var(--section-y)]">
        <p className="text-muted-foreground max-w-[60ch]">
          Case study detail template lives under document layout (§6.4). Cards on the landing link
          here as a skeleton index.
        </p>
        <Link href="/#case-studies" className="mt-6 inline-flex label-mono">
          ← Landing cases
        </Link>
      </section>
    </MarketingShell>
  );
}
