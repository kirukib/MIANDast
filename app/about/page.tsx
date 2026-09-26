import { MarketingShell } from "@/components/site/marketing-shell";
import Link from "next/link";

export default function AboutPage() {
  return (
    <MarketingShell
      eyebrow="About"
      title={{ a: "MIAN DAST", b: "safe-by-default security testing." }}
    >
      <section className="container-rail pb-[var(--section-y)] max-w-[60ch] space-y-4 text-muted-foreground">
        <p>
          Founded by Dave Mian in Abu Dhabi. This route is a marketing shell — expand from the
          founder section on the landing page.
        </p>
        <Link href="/#team" className="label-mono text-foreground inline-flex">
          Back to founder →
        </Link>
      </section>
    </MarketingShell>
  );
}
