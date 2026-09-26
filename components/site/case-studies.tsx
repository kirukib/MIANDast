import Link from "next/link";
import { SectionHeader } from "@/components/site/primitives";

const CASES = [
  {
    tag: "Fintech",
    date: "2025-11",
    title: "CloudPay closed a BOLA path on checkout",
    result: "Critical object-level flaw proven and patched in 48h.",
    metric: ["48h", "to patch"],
  },
  {
    tag: "Healthtech",
    date: "2026-01",
    title: "OmniHealth mapped 42 FHIR endpoints safely",
    result: "Zero downtime across staging and production canaries.",
    metric: ["42", "endpoints"],
  },
  {
    tag: "SaaS",
    date: "2026-03",
    title: "CartFlow caught a race before launch",
    result: "A concurrency proof blocked a cart-duplication bug.",
    metric: ["1", "race condition"],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="section container-rail">
      <SectionHeader
        eyebrow="Case studies"
        title={{ a: "Production stories,", b: "not slideware." }}
      />
      <div data-reveal-stagger className="mt-12 md:mt-16 -mx-[var(--gutter)] px-[var(--gutter)] md:mx-0 md:px-0 flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-2 md:pb-0">
        {CASES.map((c) => (
          <Link
            key={c.title}
            href="/case-studies"
            className="fold group snap-start shrink-0 w-[85%] md:w-auto flex flex-col border border-border bg-background p-5 md:p-6 hover:border-border-strong hover:bg-card transition-colors duration-150"
          >
            <div className="flex items-center justify-between pr-4">
              <span className="eyebrow !py-1">{c.tag}</span>
              <span className="font-mono text-[11px] text-muted-foreground nums">{c.date}</span>
            </div>
            <h3 className="mt-8 mb-10 text-[20px] leading-[1.3] font-medium tracking-[-0.01em] text-balance">{c.title}</h3>
            <div className="mt-auto pt-4 flex items-end justify-between border-t border-border">
              <p>
                <span className="block text-[32px] leading-none tracking-[-0.02em] nums">{c.metric[0]}</span>
                <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  {c.metric[1]}
                </span>
              </p>
              <span className="label-mono text-muted-foreground group-hover:text-foreground transition-colors">
                Read <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
