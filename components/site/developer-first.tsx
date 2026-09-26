"use client";

import { useState } from "react";
import { BulletList, SectionHeader } from "@/components/site/primitives";
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
    try {
      await navigator.clipboard.writeText(TABS[tab].code);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const lines = TABS[tab].code.split("\n");

  return (
    <section className="section container-rail">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        <div className="lg:col-span-5 lg:pr-10">
          <SectionHeader
            eyebrow="Developer first"
            title={{ a: "Fail the build,", b: "not the database." }}
          />
          <BulletList
            className="mt-8"
            items={[
              "Block merges on critical findings.",
              "SARIF into GitHub code scanning.",
              "Safe mode by default.",
            ]}
          />
        </div>
        <div data-reveal className="lg:col-span-7 bracket border border-code-border bg-code text-code-foreground min-w-0">
          <div role="tablist" aria-label="Integration examples" className="flex items-center border-b border-code-border overflow-x-auto">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === tab}
                className={cn(
                  "px-4 h-11 shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] border-b transition-colors",
                  i === tab
                    ? "text-code-foreground border-code-foreground"
                    : "text-code-foreground/50 border-transparent hover:text-code-foreground/80",
                )}
                onClick={() => setTab(i)}
              >
                {t.label}
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto mr-1 shrink-0 text-code-foreground/70 hover:text-code-foreground hover:bg-code-border"
              onClick={copy}
            >
              {copied ? "Copied ✓" : "Copy"}
            </Button>
          </div>
          <pre className="py-4 overflow-x-auto text-[13px] leading-[1.7] font-mono min-h-[300px]">
            <code className="grid grid-cols-[3rem_1fr]">
              {lines.map((line, i) => (
                <span key={i} className="contents">
                  <span aria-hidden className="select-none text-right pr-4 text-code-foreground/30 nums">
                    {i + 1}
                  </span>
                  <span className={cn("pr-4 whitespace-pre", line.trimStart().startsWith("#") ? "text-code-foreground/40" : "text-code-foreground/80")}>
                    {line || " "}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
