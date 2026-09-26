import { SectionHeader } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";

export function AuditReports() {
  return (
    <section className="section container-rail">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div
            className="border border-border bg-white text-[#0a0a0a] p-6 shadow-sm lg:-rotate-2"
            aria-hidden
          >
            <div className="flex justify-between items-start">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em]">
                MIAN DAST · Audit
              </span>
              <span className="font-mono text-[11px] uppercase border border-[#0a0a0a] px-1.5 py-0.5">
                Audit verified
              </span>
            </div>
            <div className="mt-6 space-y-2 font-mono text-[12px]">
              <p>Target: api.sample.corp</p>
              <p>Scope: sha256:9f3a…</p>
              <p>Engines: 26/26</p>
              <p>Outages: 0</p>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square border border-[#e6e6e6]"
                  style={{ background: i % 3 === 0 ? "#0a0a0a" : "#f0f0f0" }}
                />
              ))}
            </div>
          </div>
          <span className="sr-only">Paper mock of an auditor-ready MIAN DAST report.</span>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
          <SectionHeader
            eyebrow="Evidence"
            title={{ a: "Proof your auditors", b: "will actually accept." }}
          />
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>· SOC 2 CC7.1 / CC7.2 mapped</li>
            <li>· Signed timestamps on every finding</li>
            <li>· SARIF export for toolchains</li>
          </ul>
          <Button variant="secondary" size="md" className="mt-6" disabled>
            Preview sample report
          </Button>
        </div>
      </div>
    </section>
  );
}
