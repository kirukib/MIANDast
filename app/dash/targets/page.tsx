"use client";

import { AdminTablePage } from "@/components/dash/admin-table-page";

export default function TargetsPage() {
  return (
    <AdminTablePage
      crumb="Dash / Targets"
      title="Targets"
      description="Signed scopes and domain fences for production-safe scanning."
      primaryHref="/dash/attestations"
      primaryLabel="Attest scope →"
      columns={[
        { key: "name", label: "Target" },
        { key: "host", label: "Host" },
        { key: "env", label: "Env" },
        { key: "attest", label: "Attestation" },
        { key: "last", label: "Last scan" },
      ]}
      rows={[
        {
          name: "CloudPay API",
          host: "api.cloudpay.sample",
          env: "Production",
          attest: "Signed",
          last: "2h ago",
        },
        {
          name: "OmniHealth FHIR",
          host: "fhir.omni.sample",
          env: "Staging",
          attest: "Signed",
          last: "1d ago",
        },
        {
          name: "CartFlow Web",
          host: "app.cartflow.sample",
          env: "Staging",
          attest: "Pending",
          last: "Never",
        },
      ]}
    />
  );
}
