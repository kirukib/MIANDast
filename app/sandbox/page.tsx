"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { runSandboxScan } from "@/lib/integrations";

const ENGINES = [
  "sqli", "xss", "dom_xss", "cmd_injection", "template_injection",
  "authz", "session", "csrf", "http_method", "header_injection",
  "cors", "excessive_data", "api_contract", "mass_assignment",
  "ssrf", "deserialization", "file_upload", "business_logic", "open_redirect",
  "osint_subdomains", "osint_secrets", "osint_cloud", "osint_shodan",
  "osint_email", "osint_passive", "osint_wayback",
];

export default function SandboxPage() {
  const [target, setTarget] = useState("");
  const [attested, setAttested] = useState(false);
  const [lines, setLines] = useState<string[]>(["› waiting for attestation…"]);
  const [busy, setBusy] = useState(false);

  async function run() {
    if (!attested) {
      setLines((l) => [...l, "› blocked — sign attestation first"]);
      return;
    }
    setBusy(true);
    const res = await runSandboxScan({ target, attested });
    setLines(res.lines);
    setBusy(false);
  }

  return (
    <div className="dark min-h-svh bg-code text-code-foreground flex">
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-code-border p-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
          <span className="size-3 bg-code-foreground" /> MIAN DAST
        </Link>
        <NavGroup label="Fleet" items={["Scans", "Queue", "Targets", "EASM"]} active="Scans" />
        <NavGroup label="Findings" items={["DAST", "SAST", "AI/LLM", "Attack paths"]} />
        <NavGroup label="Governance" items={["Attestations", "RBAC", "Reports"]} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-code-border flex items-center gap-3 px-4">
          <span className="text-sm text-[#a1a1a1]">Sandbox / 26 engines</span>
          <span className="eyebrow !border-[#2e2e2e] !text-[#a1a1a1] ml-auto hidden sm:inline-flex">
            ● Attestation gate active
          </span>
          <ThemeToggle className="!text-[#a1a1a1]" />
          <Link href="/" className="label-mono text-[#a1a1a1] hover:text-code-foreground">
            Exit
          </Link>
        </header>

        <div className="p-6 space-y-6 overflow-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-normal tracking-[-0.02em]">Interactive sandbox</h1>
              <p className="mt-1 text-sm text-[#a1a1a1]">
                UI skeleton — wire <code className="font-mono text-xs">runSandboxScan()</code>.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              disabled={busy}
              onClick={run}
              className="dark:bg-[#ededed] dark:text-[#0a0a0a]"
            >
              {busy ? "Working…" : "Run"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
                Target URL
              </span>
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="https://staging.example.com"
                className="mt-1 w-full h-10 px-3 border border-code-border bg-[#111] outline-none focus:border-[#ededed]"
              />
            </label>
            <label className="flex items-center gap-3 border border-code-border px-3 h-10 mt-6 lg:mt-[22px]">
              <input
                type="checkbox"
                checked={attested}
                onChange={(e) => setAttested(e.target.checked)}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.08em]">
                I attest authorized scope
              </span>
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 -m-px">
            {ENGINES.map((e) => (
              <div
                key={e}
                className="border border-code-border p-2 flex items-center gap-2 font-mono text-[11px]"
              >
                <span className="size-1.5 rounded-full bg-success" />
                {e}
              </div>
            ))}
          </div>

          <div className="border border-code-border bg-[#0a0a0a] p-4 font-mono text-[12px] space-y-1 max-h-64 overflow-auto">
            {lines.map((l, i) => (
              <p key={`${l}-${i}`} className="text-[#a1a1a1]">
                <span className="text-[#6e6e6e] mr-2">00:00:{String(i).padStart(2, "0")}</span>
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavGroup({
  label,
  items,
  active,
}: {
  label: string;
  items: string[];
  active?: string;
}) {
  return (
    <div className="mt-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">{label}</p>
      <ul className="mt-2 space-y-0.5">
        {items.map((item) => (
          <li
            key={item}
            className={
              item === active
                ? "bg-[#1a1a1a] border-l-2 border-[#ededed] pl-2 py-1.5 text-sm"
                : "pl-2 py-1.5 text-sm text-[#a1a1a1]"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
