import Link from "next/link";
import { SectionHeader } from "@/components/site/primitives";

const CASES = [
  {
    tag: "Fintech",
    date: "2025-11",
    title: "CloudPay closed a BOLA path on checkout",
    result: "Critical object-level flaw proven and patched in 48h.",
  },
  {
    tag: "Healthtech",
    date: "2026-01",
    title: "OmniHealth mapped 42 FHIR endpoints safely",
    result: "Zero downtime across staging + production canaries.",
  },
  {
    tag: "SaaS",
    date: "2026-03",
    title: "CartFlow caught a race before launch",
    result: "Concurrency proof blocked a cart-duplication bug.",
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="section container-rail">
      <SectionHeader
        eyebrow="Case studies"
        title={{ a: "Production stories,", b: "not slideware." }}
      />
      <div className="mt-12 flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x md:overflow-visible">
        {CASES.map((c) => (
          <Link
            key={c.title}
            href="/case-studies"
            className="group relative snap-start shrink-0 w-[85%] md:w-auto border border-border p-5 hover:border-border-strong transition-colors"
          >
            <span
              className="absolute top-0 right-0 w-4 h-4 bg-background"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                boxShadow: "inset 0 0 0 1px var(--border)",
              }}
              aria-hidden
            />
            <span className="eyebrow !py-1">{c.tag}</span>
            <p className="mt-3 font-mono text-[11px] text-muted-foreground">{c.date}</p>
            <h3 className="mt-2 text-[20px] font-medium tracking-[-0.01em]">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.result}</p>
            <span className="mt-4 inline-block label-mono text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-transform">
              Read →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
