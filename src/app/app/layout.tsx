"use client";

import { DashboardShell } from "@/components/dashboard/shell";
import { userNav } from "@/components/dashboard/nav-config";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell nav={userNav} mode="usuario">
      {children}
    </DashboardShell>
  );
}
