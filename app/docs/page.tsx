import { MarketingShell } from "@/components/site/marketing-shell";

export default function DocsPage() {
  return (
    <MarketingShell
      eyebrow="Docs"
      title={{ a: "Documentation", b: "shell." }}
      sub="Point this route at your real docs when ready. Design system lives in /docs/ui."
    >
      <section className="container-rail pb-[var(--section-y)] space-y-2 font-mono text-sm">
        <p>→ docs/ui/ui-spec.md</p>
        <p>→ docs/ui/tokens.css</p>
        <p>→ docs/ui/references.md</p>
      </section>
    </MarketingShell>
  );
}
