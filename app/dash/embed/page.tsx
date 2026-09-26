"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ConsoleShell } from "@/components/dash/console-shell";
import { EmbedHostPreview } from "@/components/dash/embed-host-preview";
import { Button } from "@/components/ui/button";

export default function EmbedGuidePage() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const origin = typeof window !== "undefined" ? window.location.origin : "https://your-domain";

  const snippet = useMemo(
    () => `<!-- Floating badge + expand-on-hover panel (host styles yours) -->
<div id="mian-dast-host" style="position:fixed;bottom:16px;right:16px;z-index:9999">
  <iframe
    src="${origin}/embed/report"
    title="MIAN DAST report"
    style="width:360px;height:520px;border:1px solid #1f1f1f;background:#0a0a0a;border-radius:2px"
    allow="clipboard-write"
  ></iframe>
</div>

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
        Drop this iframe on any host page. Hover the corner badge in the preview to see the same
        expand panel customers get — logo mark included. Submits upsert into the dash store and{" "}
        <code className="font-mono text-xs">postMessage</code> the parent for cross-origin wiring.
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

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 border border-code-border p-4 text-sm text-[#a1a1a1] space-y-2">
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
          <p className="pt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-code-foreground">
            Host UX
          </p>
          <p className="text-sm">
            Corner badge with the MIAN logo → hover / focus expands the report iframe. Click the
            badge to pin it open.
          </p>
        </div>
        <div className="lg:col-span-3 space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
            Live host preview · hover the badge
          </p>
          <EmbedHostPreview height={360} />
        </div>
      </div>
    </ConsoleShell>
  );
}
