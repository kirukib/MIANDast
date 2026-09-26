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
        title={{ a: "Twenty-six engines.", b: "Five vectors." }}
      />
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -m-px">
        {CELLS.map((c) => (
          <div
            key={c.title}
            className="group border border-border p-5 hover:bg-card transition-colors relative"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              {c.tag}
            </span>
            <h3 className="mt-2 text-[20px] font-medium tracking-[-0.01em]">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/sandbox"
        className="mt-8 inline-flex label-mono text-muted-foreground hover:text-foreground"
      >
        Explore all 26 engines →
      </Link>
    </section>
  );
}
