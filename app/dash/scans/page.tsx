"use client";

import { AdminTablePage } from "@/components/dash/admin-table-page";

export default function ScansPage() {
  return (
    <AdminTablePage
      crumb="Dash / Scans"
      title="Scans"
      description="Queue and history for DAST runs across the fleet."
      primaryHref="/sandbox"
      primaryLabel="New scan →"
      columns={[
        { key: "id", label: "Scan" },
        { key: "target", label: "Target" },
        { key: "mode", label: "Mode" },
        { key: "status", label: "Status" },
        { key: "findings", label: "Findings" },
        { key: "started", label: "Started" },
      ]}
      rows={[
        {
          id: "scn_01",
          target: "api.cloudpay.sample",
          mode: "Safe",
          status: "Complete",
          findings: "12",
          started: "2026-09-26 14:02",
        },
        {
          id: "scn_02",
          target: "fhir.omni.sample",
          mode: "Safe",
          status: "Running",
          findings: "—",
          started: "2026-09-26 15:10",
        },
        {
          id: "scn_03",
          target: "app.cartflow.sample",
          mode: "Destructive",
          status: "Queued",
          findings: "—",
          started: "—",
        },
      ]}
    />
  );
}
