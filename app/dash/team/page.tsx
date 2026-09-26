"use client";

import { AdminTablePage } from "@/components/dash/admin-table-page";

export default function TeamPage() {
  return (
    <AdminTablePage
      crumb="Dash / Team"
      title="Team"
      description="Seats and roles across security leads, developers, and auditors."
      columns={[
        { key: "name", label: "Member" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "status", label: "Status" },
      ]}
      rows={[
        {
          name: "Dave Mian",
          email: "dave@askmian.com",
          role: "Owner",
          status: "Active",
        },
        {
          name: "J. Doe",
          email: "j.doe@cloudpay.sample",
          role: "Security lead",
          status: "Active",
        },
        {
          name: "A. Rivera",
          email: "a.rivera@omni.sample",
          role: "Developer",
          status: "Invited",
        },
      ]}
    />
  );
}
