"use client";

import { DashboardShell } from "@/components/dashboard/shell";
import { adminNav } from "@/components/dashboard/nav-config";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell nav={adminNav} mode="admin">
      {children}
    </DashboardShell>
  );
}
