"use client";

import { AdminTablePage } from "@/components/dash/admin-table-page";

export default function AttestationsPage() {
  return (
    <AdminTablePage
      crumb="Dash / Attestations"
      title="Attestations"
      description="Named engineer signatures required before probes fire."
      columns={[
        { key: "id", label: "Attestation" },
        { key: "target", label: "Target" },
        { key: "signer", label: "Signed by" },
        { key: "ticket", label: "Ticket" },
        { key: "hash", label: "Hash" },
        { key: "status", label: "Status" },
      ]}
      rows={[
        {
          id: "att_9f3a",
          target: "api.cloudpay.sample",
          signer: "J. Doe · CTO",
          ticket: "JIRA-SEC-214",
          hash: "sha256:9f3a…c21e",
          status: "Active",
        },
        {
          id: "att_12ab",
          target: "fhir.omni.sample",
          signer: "A. Rivera · Sec",
          ticket: "JIRA-SEC-301",
          hash: "sha256:12ab…88d0",
          status: "Active",
        },
        {
          id: "att_pending",
          target: "app.cartflow.sample",
          signer: "—",
          ticket: "—",
          hash: "—",
          status: "Draft",
        },
      ]}
    />
  );
}
