"use client";

import * as React from "react";
import { BellOff, CalendarClock, CheckCheck, FileText, PenTool, Settings, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard, EmptyState } from "@/components/dashboard/parts";
import { notifications as seed } from "@/lib/demo-data";
import type { NotificationKind } from "@/lib/demo-data/types";
import { relativeTime, cn } from "@/lib/utils";

const kindIcon: Record<NotificationKind, React.ElementType> = {
  incidencia: ShieldAlert,
  vacacion: CalendarClock,
  contrato: FileText,
  firma: PenTool,
  sistema: Settings,
};

export default function NotificacionesPage() {
  const [items, setItems] = React.useState(seed);
  const unread = items.filter((n) => !n.leida).length;

  const markAll = () => {
    setItems((it) => it.map((n) => ({ ...n, leida: true })));
    toast.success("Todas marcadas como leídas");
  };

  return (
    <div>
      <PageHeader title="Notificaciones" subtitle={`${unread} sin leer de ${items.length} en total.`}>
        <Button variant="outline" onClick={markAll} disabled={unread === 0}>
          <CheckCheck className="size-4" /> Marcar todas como leídas
        </Button>
      </PageHeader>

      {items.length === 0 ? (
        <EmptyState icon={BellOff} title="Sin notificaciones" description="Cuando ocurra algo importante aparecerá aquí." />
      ) : (
        <SectionCard bodyClassName="p-0">
          <ul className="divide-y divide-outline-variant">
            {items.map((n) => {
              const Icon = kindIcon[n.kind];
              return (
                <li
                  key={n.id}
                  onClick={() => setItems((it) => it.map((x) => (x.id === n.id ? { ...x, leida: true } : x)))}
                  className={cn(
                    "flex cursor-pointer gap-4 px-5 py-4 transition-colors hover:bg-surface-low",
                    !n.leida && "bg-secondary/[0.04]",
                  )}
                >
                  <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-on-surface">{n.titulo}</p>
                      {!n.leida && <span className="size-2 shrink-0 rounded-full bg-secondary" />}
                    </div>
                    <p className="mt-0.5 text-sm text-on-surface-variant">{n.detalle}</p>
                    <p className="mt-1 text-xs text-on-surface-variant/70">{relativeTime(n.fecha)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>
      )}
    </div>
  );
}
