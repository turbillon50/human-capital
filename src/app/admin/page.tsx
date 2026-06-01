"use client";

import Link from "next/link";
import {
  Banknote,
  FileWarning,
  ShieldAlert,
  Users,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader, SectionCard, useSimulatedLoad } from "@/components/dashboard/parts";
import { AreaTrend, BarsChart, DonutChart } from "@/components/charts";
import { DotGrid } from "@/components/brand/gradient-mesh";
import {
  kpis,
  monthly,
  incidents,
  contracts,
  activity,
  zonaDistribucion,
} from "@/lib/demo-data";
import { formatMXNCompact, relativeTime, formatDate } from "@/lib/utils";

export default function AdminDashboard() {
  const loading = useSimulatedLoad(850);
  const empSpark = monthly.map((m) => ({ v: m.empleados }));
  const incSpark = monthly.map((m) => ({ v: m.incidencias }));
  const ingSpark = monthly.map((m) => ({ v: m.ingresos }));

  const porVencer = contracts
    .filter((c) => c.status === "por_vencer" || c.status === "vencido")
    .slice(0, 4);
  const recientes = incidents.slice(0, 5);
  const zonaData = zonaDistribucion.map((z) => ({ name: z.zona, value: z.total }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard ejecutivo"
        subtitle="Resumen operativo de tu fuerza de seguridad en tiempo real."
      >
        <Button asChild variant="outline">
          <Link href="/admin/reportes">Ver reportes</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/usuarios">
            <Plus className="size-4" /> Nuevo empleado
          </Link>
        </Button>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-36" />)
        ) : (
          <>
            <KpiCard
              label="Empleados activos"
              value={kpis.empleadosActivos}
              icon={Users}
              trend={{ value: "+5", positive: true, note: "este mes" }}
              spark={empSpark}
            />
            <KpiCard
              label="Incidencias del mes"
              value={kpis.incidenciasMes}
              icon={ShieldAlert}
              trend={{ value: "-3.2%", positive: true, note: "vs mes anterior" }}
              spark={incSpark}
              sparkColor="#b45309"
            />
            <KpiCard
              label="Ingreso mensual"
              value={kpis.ingresoMensual}
              prefix="$"
              icon={Banknote}
              trend={{ value: "+12.4%", positive: true, note: "vs mes anterior" }}
              spark={ingSpark}
              sparkColor="#15803d"
            />
            <KpiCard
              label="Contratos por vencer"
              value={kpis.contratosPorVencer}
              icon={FileWarning}
              trend={{ value: "Atención", positive: false, note: "próx. 60 días" }}
            />
          </>
        )}
      </div>

      {/* Charts row */}
      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <SectionCard
          title="Plantilla e ingresos · 12 meses"
          action={<Badge tone="info">Tendencia +18%</Badge>}
        >
          {loading ? <Skeleton className="h-[260px]" /> : <AreaTrend data={monthly} dataKey="empleados" />}
        </SectionCard>
        <SectionCard title="Distribución por zona">
          {loading ? (
            <Skeleton className="h-[260px]" />
          ) : (
            <>
              <DonutChart data={zonaData} />
              <div className="mt-3 grid grid-cols-3 gap-2">
                {zonaDistribucion.map((z) => (
                  <div key={z.zona} className="rounded-lg border border-outline-variant py-2 text-center">
                    <p className="font-display text-xl font-bold text-secondary">{z.total}</p>
                    <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">{z.zona}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </SectionCard>
      </div>

      {/* Bento: incidents, contracts, activity */}
      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard
          title="Incidencias recientes"
          action={<Button asChild variant="ghost" size="sm"><Link href="/admin/incidencias">Ver todas</Link></Button>}
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-outline-variant">
            {recientes.map((inc) => (
              <li key={inc.id} className="flex items-start gap-3 px-5 py-3.5">
                <span
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${
                    inc.severidad === "alta"
                      ? "bg-error shadow-[0_0_8px_rgba(186,26,26,0.5)]"
                      : inc.severidad === "media"
                        ? "bg-warning"
                        : "bg-secondary"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-on-surface">{inc.tipo}</p>
                  <p className="truncate text-xs text-on-surface-variant">
                    {inc.empleadoNombre} · {inc.sitio}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-on-surface-variant">{relativeTime(inc.fecha)}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Contratos por vencer"
          action={<Badge tone="warning">{porVencer.length}</Badge>}
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-outline-variant">
            {porVencer.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-on-surface">{c.cliente}</p>
                  <p className="text-xs text-on-surface-variant">{c.ciudad} · {formatMXNCompact(c.valorMensual)}/mes</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={c.status} />
                  <p className="mt-1 text-[11px] text-on-surface-variant">{formatDate(c.vence)}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Actividad reciente" bodyClassName="p-0">
          <ul className="divide-y divide-outline-variant">
            {activity.slice(0, 5).map((a) => (
              <li key={a.id} className="flex gap-3 px-5 py-3.5">
                <Avatar src={a.avatar} name={a.actor} className="size-8" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug text-on-surface">
                    <span className="font-semibold">{a.actor}</span>{" "}
                    <span className="text-on-surface-variant">{a.accion}</span>{" "}
                    <span className="font-medium">{a.objetivo}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-on-surface-variant/70">{relativeTime(a.fecha)}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Field distribution band */}
      <SectionCard title="Personal en campo por mes">
        {loading ? <Skeleton className="h-[260px]" /> : <BarsChart data={monthly} dataKey="incidencias" color="#2d5dab" />}
        <div className="relative mt-2">
          <DotGrid className="rounded-lg" />
        </div>
      </SectionCard>
    </div>
  );
}
