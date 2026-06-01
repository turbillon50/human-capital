"use client";

import Link from "next/link";
import {
  CalendarClock,
  Clock,
  FileSignature,
  MapPin,
  PenTool,
  ShieldAlert,
  ShieldCheck,
  Sun,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CountUp } from "@/components/ui/count-up";
import { SectionCard, useSimulatedLoad } from "@/components/dashboard/parts";
import { AreaTrend } from "@/components/charts";
import { DotGrid } from "@/components/brand/gradient-mesh";
import { demoUsers } from "@/lib/demo-data/marketing";
import { monthly } from "@/lib/demo-data";
import { relativeTime } from "@/lib/utils";

const user = demoUsers.usuario;

const quickStats = [
  { label: "Días de vacaciones", value: 12, icon: CalendarClock, suffix: " días" },
  { label: "Expediente completo", value: 90, icon: ShieldCheck, suffix: "%" },
  { label: "Asistencia del mes", value: 98, icon: TrendingUp, suffix: "%" },
  { label: "Docs. por firmar", value: 2, icon: FileSignature, suffix: "" },
];

const acciones = [
  { href: "/app/vacaciones", label: "Solicitar vacaciones", icon: CalendarClock, desc: "Pide tus días de descanso" },
  { href: "/app/incidencias", label: "Reportar incidencia", icon: ShieldAlert, desc: "Desde tu puesto, en segundos" },
  { href: "/app/documentos", label: "Firmar documentos", icon: PenTool, desc: "2 pendientes de firma" },
];

const misIncidencias = [
  { tipo: "Reporte de Campo", sitio: "Corporativo Reforma 222", fecha: 0, status: "resuelta" },
  { tipo: "Reconocimiento", sitio: "Plaza Antara", fecha: 2, status: "resuelta" },
  { tipo: "Reporte de Campo", sitio: "Torre Bancomer", fecha: 5, status: "en_proceso" },
];

export default function AppDashboard() {
  const loading = useSimulatedLoad(900);
  const asistencia = monthly.map((m) => ({ mes: m.mes, asistencia: m.asistencia }));

  return (
    <div className="space-y-6">
      {/* Hero greeting + next shift */}
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border border-outline-variant bg-primary-container p-6 text-on-primary sm:p-7"
        >
          <DotGrid />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 text-sm text-primary-fixed-dim">
              <Sun className="size-4" strokeWidth={1.75} /> Buen día, turno matutino
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Hola, {user.nombre.split(" ")[0]} 👋
            </h2>
            <p className="mt-1 max-w-md text-sm text-primary-fixed-dim">
              Tu próximo turno está confirmado. Recuerda registrar tu bitácora de ronda al iniciar.
            </p>
            {loading ? (
              <Skeleton className="mt-5 h-20 w-full bg-white/10" />
            ) : (
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-primary-fixed-dim">Próximo turno</p>
                  <p className="mt-0.5 flex items-center gap-1.5 font-semibold">
                    <Clock className="size-4 text-secondary-container" /> Mañana · 07:00 – 19:00
                  </p>
                </div>
                <div className="h-9 w-px bg-white/10" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-primary-fixed-dim">Sitio asignado</p>
                  <p className="mt-0.5 flex items-center gap-1.5 font-semibold">
                    <MapPin className="size-4 text-secondary-container" /> Corporativo Reforma 222
                  </p>
                </div>
                <Badge tone="success" className="ml-auto">Confirmado</Badge>
              </div>
            )}
          </div>
        </motion.div>

        <SectionCard title="Asistencia · últimos meses">
          {loading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <AreaTrend
              data={asistencia}
              dataKey="asistencia"
              formatter={(v) => `${v}%`}
              height={200}
            />
          )}
        </SectionCard>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickStats.map((s, i) =>
          loading ? (
            <Skeleton key={i} className="h-28" />
          ) : (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-outline-variant bg-surface p-5"
            >
              <s.icon className="size-5 text-secondary" strokeWidth={1.75} />
              <p className="mt-3 font-display text-2xl font-bold tracking-tight text-on-surface">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-0.5 text-xs text-on-surface-variant">{s.label}</p>
            </motion.div>
          ),
        )}
      </div>

      {/* Quick actions + my incidents */}
      <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <SectionCard title="Acciones rápidas">
          <div className="space-y-2.5">
            {acciones.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group flex items-center gap-3 rounded-xl border border-outline-variant p-3.5 transition-all hover:border-secondary/40 hover:bg-secondary/5"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-on-secondary">
                  <a.icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-on-surface">{a.label}</p>
                  <p className="text-xs text-on-surface-variant">{a.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Mis incidencias recientes"
          action={
            <Button asChild variant="ghost" size="sm">
              <Link href="/app/historial">Ver historial</Link>
            </Button>
          }
        >
          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-14" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {misIncidencias.map((inc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-lg border border-outline-variant px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-secondary/10 text-secondary">
                      <ShieldAlert className="size-4" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-on-surface">{inc.tipo}</p>
                      <p className="text-xs text-on-surface-variant">
                        {inc.sitio} · {relativeTime(new Date(Date.now() - inc.fecha * 86400000))}
                      </p>
                    </div>
                  </div>
                  <Badge tone={inc.status === "resuelta" ? "success" : "warning"}>
                    {inc.status === "resuelta" ? "Resuelta" : "En proceso"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
