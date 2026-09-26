"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = [
  {
    id: "actions",
    label: "GitHub Actions",
    code: `name: mian-dast
on: [push]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          curl -X POST "$MIAN_URL/scan" \\
            -H "Authorization: Bearer $MIAN_TOKEN" \\
            -d '{"target":"\${{ github.event.repository.html_url }}"}'`,
  },
  {
    id: "curl",
    label: "Curl",
    code: `curl -X POST https://api.askmian.com/v1/scan \\
  -H "Authorization: Bearer $MIAN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"target":"https://app.example.com","mode":"safe"}'`,
  },
  {
    id: "python",
    label: "Python",
    code: `import requests

r = requests.post(
    "https://api.askmian.com/v1/scan",
    headers={"Authorization": f"Bearer {token}"},
    json={"target": "https://app.example.com", "mode": "safe"},
)
print(r.json()["findings"])`,
  },
] as const;

export function DeveloperFirst() {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(TABS[tab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="section container-rail">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Developer first"
            title={{ a: "Fail the build,", b: "not the database." }}
          />
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>· Block merges on critical findings</li>
            <li>· SARIF into GitHub Security</li>
            <li>· Safe mode default in CI</li>
          </ul>
        </div>
        <div className="lg:col-span-7 border border-code-border bg-code text-code-foreground">
          <div className="flex items-center border-b border-code-border">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className={cn(
                  "px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em]",
                  i === tab ? "text-code-foreground border-b border-code-foreground -mb-px" : "text-[#6e6e6e]",
                )}
                onClick={() => setTab(i)}
              >
                {t.label}
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-code-foreground hover:bg-[#1a1a1a]"
              onClick={copy}
            >
              {copied ? "Copied ✓" : "Copy"}
            </Button>
          </div>
          <pre className="p-4 overflow-x-auto text-[13px] leading-[1.6] font-mono text-[#a1a1a1] whitespace-pre-wrap">
            {TABS[tab].code}
          </pre>
        </div>
      </div>
    </section>
  );
}
