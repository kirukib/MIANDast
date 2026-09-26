"use client";

import { usePathname } from "next/navigation";
import { ConsoleShell } from "@/components/dash/console-shell";
import { ThemeToggle } from "@/components/site/theme-toggle";

export default function SettingsPage() {
  const pathname = usePathname();

  return (
    <ConsoleShell crumb="Dash / Settings" pathname={pathname}>
      <h1 className="text-2xl font-normal tracking-[-0.02em]">Settings</h1>
      <p className="mt-1 text-sm text-[#a1a1a1] max-w-[60ch]">
        Org preferences for the control plane skeleton.
      </p>

      <div className="mt-6 max-w-xl space-y-4">
        <label className="block border border-code-border p-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
            Organization name
          </span>
          <input
            defaultValue="MIAN DAST Demo Org"
            className="mt-2 w-full h-10 px-3 border border-code-border bg-[#111] outline-none focus:border-[#ededed]"
          />
        </label>
        <label className="block border border-code-border p-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
            Default scan mode
          </span>
          <select className="mt-2 w-full h-10 px-3 border border-code-border bg-[#111]">
            <option>Safe-by-default</option>
            <option>Destructive (staging only)</option>
          </select>
        </label>
        <div className="border border-code-border p-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
              Appearance
            </p>
            <p className="mt-1 text-sm text-[#a1a1a1]">Toggle light / dark for marketing surfaces.</p>
          </div>
          <ThemeToggle />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6e6e6e]">
          Console shell stays forced dark per ui-spec §6.2
        </p>
      </div>
    </ConsoleShell>
  );
}
