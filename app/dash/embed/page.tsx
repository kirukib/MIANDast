"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ConsoleShell } from "@/components/dash/console-shell";
import { Button } from "@/components/ui/button";

export default function EmbedGuidePage() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const origin = typeof window !== "undefined" ? window.location.origin : "https://your-domain";

  const snippet = useMemo(
    () => `<iframe
  src="${origin}/embed/report"
  title="MIAN DAST report"
  style="width:100%;height:640px;border:1px solid #1f1f1f;background:#0a0a0a"
  allow="clipboard-write"
></iframe>

<script>
  window.addEventListener("message", (e) => {
    if (e.data?.source !== "mian-dast") return;
    // e.data.type: "report:upsert" | "report:delete"
    // e.data.report — forward to your API / dash
    console.log("MIAN report event", e.data);
  });
</script>`,
    [origin],
  );

  async function copy() {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <ConsoleShell crumb="Dash / Embed" pathname={pathname}>
      <h1 className="text-2xl font-normal tracking-[-0.02em]">Embed iframe</h1>
      <p className="mt-2 text-sm text-[#a1a1a1] max-w-[60ch]">
        Drop this iframe on any host page. When a report is submitted inside the embed, it upserts
        into the dash store (same origin) and{" "}
        <code className="font-mono text-xs">postMessage</code>s the parent for cross-origin wiring.
      </p>

      <div className="mt-6 border border-code-border bg-[#0a0a0a]">
        <div className="flex items-center border-b border-code-border px-3 py-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
            Snippet
          </span>
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
          {snippet}
        </pre>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-code-border p-4 text-sm text-[#a1a1a1] space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-code-foreground">
            Message contract
          </p>
          <p>
            <code className="font-mono text-xs text-code-foreground">source: &quot;mian-dast&quot;</code>
          </p>
          <p>
            <code className="font-mono text-xs text-code-foreground">type: &quot;report:upsert&quot;</code>{" "}
            + <code className="font-mono text-xs">report</code>
          </p>
          <p>
            <code className="font-mono text-xs text-code-foreground">type: &quot;report:delete&quot;</code>{" "}
            + <code className="font-mono text-xs">id</code>
          </p>
        </div>
        <div className="border border-code-border p-4 text-sm text-[#a1a1a1] space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-code-foreground">
            Live preview
          </p>
          <iframe
            title="Embed preview"
            src="/embed/report"
            className="w-full h-[280px] border border-code-border bg-[#111]"
          />
        </div>
      </div>
    </ConsoleShell>
  );
}
