import Link from "next/link";
import { SectionHeader } from "@/components/site/primitives";

const CELLS = [
  { tag: "Injection", title: "SQL / NoSQL", body: "Time-based and error-based probes with canary-guarded concurrency." },
  { tag: "Auth", title: "BOLA / IDOR", body: "Object-level authorization faults across authenticated sessions." },
  { tag: "Client", title: "XSS", body: "Reflected, stored, and DOM vectors with proof payloads." },
  { tag: "Cloud", title: "SSRF & metadata", body: "IMDSv1/v2, GCP metadata, and internal VPC path checks." },
  { tag: "Secrets", title: "Exposed secrets", body: "OSINT + response leakage for keys, tokens, and dumps." },
  { tag: "Headers", title: "Headers & CORS", body: "TLS posture, HSTS, CSP, and CORS boundary rules." },
];

export function Coverage() {
  return (
    <section className="section container-rail">
      <SectionHeader
        eyebrow="Coverage"
        title={{ a: "Twenty-six engines.", b: "Six attack classes." }}
      />
      <div className="mt-12 md:mt-16 hairline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {CELLS.map((c, i) => (
          <Link
            key={c.title}
            href="/sandbox"
            className="group relative p-5 md:p-6 md:min-h-[188px] flex flex-col transition-colors duration-150 hover:!bg-card"
          >
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 bg-foreground" />
                {c.tag}
              </span>
              <span className="nums">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-auto pt-6 md:pt-8 text-[20px] font-medium tracking-[-0.01em]">{c.title}</h3>
            <p className="mt-2 text-[15px] text-muted-foreground text-pretty">{c.body}</p>
            <span
              aria-hidden
              className="absolute bottom-5 right-5 font-mono text-sm opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-150"
            >
              →
            </span>
          </Link>
        ))}
      </div>
      <Link
        href="/sandbox"
        className="mt-8 inline-flex items-center h-10 px-4 border border-border bg-secondary label-mono hover:border-border-strong transition-colors"
      >
        Explore all 26 engines →
      </Link>
    </section>
  );
}
