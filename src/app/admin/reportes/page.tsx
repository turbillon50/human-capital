"use client";

import * as React from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { PageHeader, SectionCard } from "@/components/dashboard/parts";
import { AreaTrend, BarsChart, DonutChart } from "@/components/charts";
import { monthly, incidents } from "@/lib/demo-data";
import { formatMXNCompact } from "@/lib/utils";

/** Builds a CSV string and triggers a real client-side download. */
function downloadCSV(filename: string, rows: Record<string, string | number>[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const body = rows
    .map((r) => headers.map((h) => `"${String(r[h]).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const csv = `${headers.join(",")}\n${body}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const tipoCount = Array.from(
  incidents.reduce((map, i) => map.set(i.tipo, (map.get(i.tipo) ?? 0) + 1), new Map<string, number>()),
).map(([name, value]) => ({ name, value }));

export default function ReportesPage() {
  const [tab, setTab] = React.useState("rotacion");

  const exportCurrent = () => {
    if (tab === "rotacion") downloadCSV("reporte-rotacion.csv", monthly.map((m) => ({ mes: m.mes, rotacion: m.rotacion, asistencia: m.asistencia })));
    else if (tab === "incidencias") downloadCSV("reporte-incidencias.csv", tipoCount.map((t) => ({ tipo: t.name, total: t.value })));
    else downloadCSV("reporte-ingresos.csv", monthly.map((m) => ({ mes: m.mes, ingresos: m.ingresos, empleados: m.empleados })));
    toast.success("Reporte exportado", { description: "Archivo CSV descargado." });
  };

  return (
    <div>
      <PageHeader title="Reportes" subtitle="Indicadores ejecutivos exportables para tu junta de consejo.">
        <Button onClick={exportCurrent}>
          <Download className="size-4" /> Exportar CSV
        </Button>
      </PageHeader>

      <Tabs
        tabs={[
          { value: "rotacion", label: "Rotación y asistencia" },
          { value: "incidencias", label: "Incidencias" },
          { value: "ingresos", label: "Ingresos" },
        ]}
        value={tab}
        onValueChange={setTab}
        className="mb-6"
      />

      {tab === "rotacion" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard title="Rotación de personal (%)">
            <AreaTrend data={monthly} dataKey="rotacion" formatter={(v) => `${v}%`} color="#b45309" />
          </SectionCard>
          <SectionCard title="Asistencia verificada (%)">
            <AreaTrend data={monthly} dataKey="asistencia" formatter={(v) => `${v}%`} color="#15803d" />
          </SectionCard>
          <SectionCard title="Resumen ejecutivo" className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { l: "Rotación promedio", v: "2.8%" },
                { l: "Asistencia promedio", v: "96.4%" },
                { l: "Mejor mes", v: "Junio · 98.7%" },
                { l: "Tendencia anual", v: "↓ -1.2 pts" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-outline-variant bg-surface-low p-4">
                  <p className="label-meta text-on-surface-variant">{s.l}</p>
                  <p className="mt-1 font-display text-xl font-bold text-on-surface">{s.v}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {tab === "incidencias" && (
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <SectionCard title="Incidencias por mes">
            <BarsChart data={monthly} dataKey="incidencias" />
          </SectionCard>
          <SectionCard title="Por tipo">
            <DonutChart data={tipoCount} />
            <ul className="mt-4 space-y-1.5">
              {tipoCount.map((t, i) => (
                <li key={t.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-on-surface-variant">
                    <span className="size-2.5 rounded-full" style={{ background: ["#2d5dab", "#101d33", "#80abfe", "#15803d", "#b45309", "#7985a0"][i % 6] }} />
                    {t.name}
                  </span>
                  <span className="font-semibold text-on-surface">{t.value}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      )}

      {tab === "ingresos" && (
        <div className="grid gap-5">
          <SectionCard title="Ingresos mensuales (MXN)" action={<FileSpreadsheet className="size-4 text-on-surface-variant" />}>
            <AreaTrend data={monthly} dataKey="ingresos" formatter={formatMXNCompact} color="#2d5dab" height={320} />
          </SectionCard>
          <SectionCard title="Plantilla vs ingresos">
            <BarsChart data={monthly} dataKey="empleados" color="#101d33" />
          </SectionCard>
        </div>
      )}
    </div>
  );
}
