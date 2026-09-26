import { MarketingShell } from "@/components/site/marketing-shell";
import { Pricing } from "@/components/site/pricing";
import { PLANS } from "@/lib/pricing";

const ROWS = [
  { group: "Scanning", cells: ["26 engines", "Auth scans", "Fleet multi-scan", "Custom pack"] },
  { group: "Integrations", cells: ["Webhooks", "CI/CD", "Jira / Linear", "White-label"] },
  { group: "Compliance", cells: ["PDF", "PDF + SARIF", "Auditor portal", "MSP seats"] },
  { group: "Support", cells: ["Email", "Chat", "Priority", "Dedicated"] },
];

export default function PricingPage() {
  return (
    <MarketingShell
      eyebrow="Pricing"
      title={{ a: "Plans for every", b: "stage of the fleet." }}
      sub="UI skeleton — wire startCheckout() and payment methods in lib/integrations.ts."
    >
      <Pricing showCompareLink={false} />
      <section className="section container-rail">
        <h2 className="text-h2 two-tone">
          Compare <span className="tone-2">all features.</span>
        </h2>
        <div className="mt-10 overflow-x-auto border border-border">
          <table className="w-full min-w-[720px] text-left">
            <thead className="sticky top-0 bg-card">
              <tr className="border-b border-border">
                <th className="p-3 font-mono text-[11px] uppercase tracking-[0.08em] font-normal text-muted-foreground">
                  Feature
                </th>
                {PLANS.map((p) => (
                  <th
                    key={p.id}
                    className="p-3 font-mono text-[11px] uppercase tracking-[0.08em] font-normal"
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.group} className="border-b border-border hover:bg-card">
                  <td className="p-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    {row.group}
                  </td>
                  {row.cells.map((c) => (
                    <td key={c} className="p-3 text-sm">
                      {c.startsWith("—") ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        <span className="font-mono text-xs">+ {c}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MarketingShell>
  );
}
