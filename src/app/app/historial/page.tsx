"use client";

import * as React from "react";
import {
  CalendarClock,
  Clock,
  FileSignature,
  PenTool,
  ShieldAlert,
  Star,
} from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageHeader, SectionCard } from "@/components/dashboard/parts";
import { relativeTime } from "@/lib/utils";

type Cat = "todo" | "turnos" | "incidencias" | "documentos";

const eventos: {
  cat: Exclude<Cat, "todo">;
  icon: React.ElementType;
  titulo: string;
  detalle: string;
  daysAgo: number;
  tone: "info" | "success" | "warning";
}[] = [
  { cat: "turnos", icon: Clock, titulo: "Turno completado", detalle: "Corporativo Reforma 222 · 07:00–19:00", daysAgo: 0, tone: "success" },
  { cat: "incidencias", icon: ShieldAlert, titulo: "Reporte de campo enviado", detalle: "Bitácora de ronda sin novedad", daysAgo: 0, tone: "info" },
  { cat: "documentos", icon: PenTool, titulo: "Documento firmado", detalle: "Reglamento interno de trabajo", daysAgo: 1, tone: "success" },
  { cat: "incidencias", icon: Star, titulo: "Reconocimiento recibido", detalle: "Atención ejemplar a cliente VIP", daysAgo: 3, tone: "success" },
  { cat: "turnos", icon: Clock, titulo: "Turno completado", detalle: "Plaza Antara · 07:00–19:00", daysAgo: 4, tone: "success" },
  { cat: "incidencias", icon: ShieldAlert, titulo: "Incidente reportado", detalle: "Activación de alarma perimetral zona C", daysAgo: 5, tone: "warning" },
  { cat: "documentos", icon: FileSignature, titulo: "Documento pendiente", detalle: "Contrato de renovación 2026", daysAgo: 6, tone: "warning" },
  { cat: "turnos", icon: CalendarClock, titulo: "Vacaciones aprobadas", detalle: "18–24 jun · 6 días", daysAgo: 11, tone: "info" },
];

const tabs = [
  { value: "todo", label: "Todo" },
  { value: "turnos", label: "Turnos" },
  { value: "incidencias", label: "Incidencias" },
  { value: "documentos", label: "Documentos" },
];

export default function HistorialPage() {
  const [cat, setCat] = React.useState<Cat>("todo");
  const filtered = eventos.filter((e) => cat === "todo" || e.cat === cat);

  return (
    <div>
      <PageHeader title="Historial de actividad" subtitle="Todo lo que ha pasado en tu cuenta, en orden cronológico." />

      <Tabs tabs={tabs} value={cat} onValueChange={(v) => setCat(v as Cat)} className="mb-6" />

      <SectionCard>
        <ol className="relative space-y-6 before:absolute before:left-[18px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-outline-variant">
          {filtered.map((e, i) => (
            <li key={i} className="relative flex gap-4">
              <span
                className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-full border-2 border-surface ${
                  e.tone === "success"
                    ? "bg-success-container text-on-success-container"
                    : e.tone === "warning"
                      ? "bg-warning-container text-on-warning-container"
                      : "bg-secondary/15 text-secondary"
                }`}
              >
                <e.icon className="size-4" strokeWidth={1.75} />
              </span>
              <div className="flex flex-1 flex-wrap items-center justify-between gap-2 pb-1">
                <div>
                  <p className="text-sm font-semibold text-on-surface">{e.titulo}</p>
                  <p className="text-xs text-on-surface-variant">{e.detalle}</p>
                </div>
                <Badge tone="neutral">{relativeTime(new Date(Date.now() - e.daysAgo * 86400000))}</Badge>
              </div>
            </li>
          ))}
        </ol>
      </SectionCard>
    </div>
  );
}
