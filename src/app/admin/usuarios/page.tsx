"use client";

import * as React from "react";
import { Archive, Download, Mail, MapPin, Phone, Plus, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Input, Label } from "@/components/ui/input";
import { Modal, ModalHeader } from "@/components/ui/sheet";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { PageHeader } from "@/components/dashboard/parts";
import { employees as seed } from "@/lib/demo-data";
import type { Employee } from "@/lib/demo-data/types";
import { formatMXN, formatDate, cn } from "@/lib/utils";

export default function UsuariosPage() {
  const [data, setData] = React.useState(seed);
  const [detail, setDetail] = React.useState<Employee | null>(null);
  const [creating, setCreating] = React.useState(false);
  const [zona, setZona] = React.useState<string>("todas");

  const filtered = zona === "todas" ? data : data.filter((e) => e.zona === zona);

  const columns: Column<Employee>[] = [
    {
      key: "nombre",
      header: "Empleado",
      sortValue: (r) => r.nombre,
      cell: (r) => (
        <div className="flex items-center gap-3">
          <Avatar src={r.avatar} name={r.nombre} className="size-9" />
          <div className="min-w-0">
            <p className="truncate font-medium text-on-surface">{r.nombre}</p>
            <p className="text-xs text-on-surface-variant">{r.id} · {r.puesto}</p>
          </div>
        </div>
      ),
    },
    { key: "ciudad", header: "Ciudad", sortValue: (r) => r.ciudad, cell: (r) => r.ciudad, hideOnMobile: true },
    {
      key: "status",
      header: "Estatus",
      sortValue: (r) => r.status,
      cell: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "expediente",
      header: "Expediente",
      sortValue: (r) => r.expedienteCompleto,
      hideOnMobile: true,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-high">
            <div
              className={cn("h-full rounded-full", r.expedienteCompleto >= 90 ? "bg-success" : r.expedienteCompleto >= 75 ? "bg-warning" : "bg-error")}
              style={{ width: `${r.expedienteCompleto}%` }}
            />
          </div>
          <span className="text-xs text-on-surface-variant">{r.expedienteCompleto}%</span>
        </div>
      ),
    },
    {
      key: "sueldo",
      header: "Sueldo",
      sortValue: (r) => r.sueldoMensual,
      hideOnMobile: true,
      cell: (r) => <span className="tabular-nums">{formatMXN(r.sueldoMensual)}</span>,
    },
  ];

  function createEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nombre = String(form.get("nombre"));
    const nuevo: Employee = {
      id: `EMP-${1200 + data.length}`,
      nombre,
      puesto: "Guardia",
      status: "activo",
      ciudad: (String(form.get("ciudad")) as Employee["ciudad"]) || "CDMX",
      zona: "Centro",
      email: `${nombre.split(" ")[0]?.toLowerCase() || "nuevo"}@sanantonio.mx`,
      telefono: "+52 55 0000 0000",
      avatar: "",
      ingreso: new Date().toISOString(),
      antiguedadMeses: 0,
      supervisor: "Luis Fernando Gómez",
      sueldoMensual: Number(form.get("sueldo")) || 9800,
      expedienteCompleto: 60,
      contratoVence: new Date(Date.now() + 365 * 86400000).toISOString(),
      certificaciones: ["Control de accesos"],
    };
    setData((d) => [nuevo, ...d]);
    setCreating(false);
    toast.success("Empleado dado de alta", { description: `${nombre} se agregó a la plantilla.` });
  }

  return (
    <div>
      <PageHeader title="Empleados" subtitle={`${data.length} elementos en plantilla · gestión de personal.`}>
        <Button variant="outline" onClick={() => toast.success("Exportado", { description: "plantilla.csv generado." })}>
          <Download className="size-4" /> Exportar
        </Button>
        <Button onClick={() => setCreating(true)}>
          <Plus className="size-4" /> Nuevo empleado
        </Button>
      </PageHeader>

      <DataTable
        data={filtered}
        columns={columns}
        searchKeys={["nombre", "id", "puesto", "ciudad"]}
        onRowClick={setDetail}
        selectable
        pageSize={9}
        filters={
          <select
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className="h-10 rounded-lg border border-outline-variant bg-surface px-3 text-sm text-on-surface focus-visible:border-secondary focus-visible:outline-none"
          >
            <option value="todas">Todas las zonas</option>
            <option value="Norte">Norte</option>
            <option value="Centro">Centro</option>
            <option value="Sur">Sur</option>
          </select>
        }
        bulkActions={(selected, clear) => (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                toast.success(`${selected.length} exportados`);
                clear();
              }}
            >
              <Download className="size-4" /> Exportar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setData((d) => d.map((e) => (selected.find((s) => s.id === e.id) ? { ...e, status: "inactivo" } : e)));
                toast.success(`${selected.length} archivados`);
                clear();
              }}
            >
              <Archive className="size-4" /> Archivar
            </Button>
          </>
        )}
      />

      {/* Detail side sheet */}
      <Modal open={!!detail} onClose={() => setDetail(null)} side="right">
        {detail && (
          <>
            <div className="relative overflow-hidden bg-primary-container px-6 py-7 pr-12 text-on-primary">
              <div className="flex items-center gap-4">
                <Avatar src={detail.avatar} name={detail.nombre} className="size-16 ring-2 ring-white/20" />
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight">{detail.nombre}</h2>
                  <p className="text-sm text-primary-fixed-dim">{detail.puesto} · {detail.id}</p>
                  <div className="mt-1.5"><StatusBadge status={detail.status} /></div>
                </div>
              </div>
            </div>
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { l: "Ciudad / zona", v: `${detail.ciudad} · ${detail.zona}` },
                  { l: "Ingreso", v: formatDate(detail.ingreso) },
                  { l: "Antigüedad", v: `${Math.floor(detail.antiguedadMeses / 12)}a ${detail.antiguedadMeses % 12}m` },
                  { l: "Supervisor", v: detail.supervisor },
                  { l: "Sueldo mensual", v: formatMXN(detail.sueldoMensual) },
                  { l: "Contrato vence", v: formatDate(detail.contratoVence) },
                ].map((row) => (
                  <div key={row.l}>
                    <p className="label-meta text-on-surface-variant">{row.l}</p>
                    <p className="mt-0.5 text-sm font-semibold text-on-surface">{row.v}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="label-meta mb-2 text-on-surface-variant">Contacto</p>
                <div className="space-y-1.5 text-sm text-on-surface-variant">
                  <p className="flex items-center gap-2"><Mail className="size-4" /> {detail.email}</p>
                  <p className="flex items-center gap-2"><Phone className="size-4" /> {detail.telefono}</p>
                  <p className="flex items-center gap-2"><MapPin className="size-4" /> {detail.ciudad}, México</p>
                </div>
              </div>

              <div>
                <p className="label-meta mb-2 text-on-surface-variant">Certificaciones</p>
                <div className="flex flex-wrap gap-2">
                  {detail.certificaciones.map((c) => (
                    <Badge key={c} tone="info"><ShieldCheck className="size-3" /> {c}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => toast.success("Cambios guardados")}>Editar expediente</Button>
                <Button variant="outline" onClick={() => { toast("Mensaje enviado a " + detail.nombre.split(" ")[0]); }}>
                  <Mail className="size-4" /> Contactar
                </Button>
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* Create modal */}
      <Modal open={creating} onClose={() => setCreating(false)}>
        <ModalHeader title="Nuevo empleado" subtitle="Da de alta a un nuevo elemento en tu plantilla." />
        <form onSubmit={createEmployee} className="space-y-5 p-6">
          <div className="space-y-1.5">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input id="nombre" name="nombre" required placeholder="Camila Torres Flores" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="ciudad">Ciudad</Label>
              <select id="ciudad" name="ciudad" className="flex h-11 w-full rounded-lg border border-outline-variant bg-surface px-3.5 text-sm">
                {["CDMX", "Monterrey", "Guadalajara", "Querétaro", "Mérida", "Puebla", "Tijuana"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sueldo">Sueldo mensual (MXN)</Label>
              <Input id="sueldo" name="sueldo" type="number" defaultValue={9800} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setCreating(false)}>Cancelar</Button>
            <Button type="submit"><UserPlus className="size-4" /> Dar de alta</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
