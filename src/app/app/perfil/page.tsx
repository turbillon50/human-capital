"use client";

import * as React from "react";
import { BadgeCheck, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs } from "@/components/ui/tabs";
import { SectionCard } from "@/components/dashboard/parts";
import { DotGrid } from "@/components/brand/gradient-mesh";
import { demoUsers } from "@/lib/demo-data/marketing";

const user = demoUsers.usuario;

const metadatos = [
  { label: "ID Empleado", value: "EMP-1287" },
  { label: "Fecha de ingreso", value: "02/01/2022" },
  { label: "Antigüedad", value: "4 años, 5 meses" },
  { label: "Supervisor", value: "Luis Fernando Gómez" },
  { label: "Zona", value: "Centro · CDMX" },
  { label: "Turno", value: "Matutino 07:00–19:00" },
];

const certs = [
  "Manejo de armas (SEDENA)",
  "Primeros auxilios",
  "Defensa personal",
  "Control de accesos",
];

export default function PerfilPage() {
  const [tab, setTab] = React.useState("info");
  const [prefs, setPrefs] = React.useState({ push: true, email: true, turnos: true, marketing: false });

  const save = (key: keyof typeof prefs, value: boolean) => {
    setPrefs((p) => ({ ...p, [key]: value }));
    toast.success("Preferencia guardada", { description: "Tus cambios se guardan automáticamente." });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-outline-variant bg-primary-container p-6 sm:p-8">
        <DotGrid />
        <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-end">
          <div className="relative">
            <Avatar src={user.avatar} name={user.nombre} className="size-24 ring-4 ring-white/20" />
            <span className="absolute bottom-1 right-1 size-5 rounded-full border-4 border-primary-container bg-success" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <h2 className="font-display text-2xl font-bold tracking-tight text-on-primary">{user.nombre}</h2>
              <Badge tone="success">Activo</Badge>
            </div>
            <p className="mt-0.5 text-primary-fixed-dim">{user.puesto}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-sm text-primary-fixed-dim sm:justify-start">
              <span className="flex items-center gap-1.5"><Mail className="size-4" /> {user.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="size-4" /> +52 55 1234 5678</span>
              <span className="flex items-center gap-1.5"><MapPin className="size-4" /> CDMX</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        tabs={[
          { value: "info", label: "Información" },
          { value: "config", label: "Configuración" },
        ]}
        value={tab}
        onValueChange={setTab}
      />

      {tab === "info" ? (
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <SectionCard title="Datos laborales">
            <dl className="grid grid-cols-2 gap-5">
              {metadatos.map((m) => (
                <div key={m.label}>
                  <dt className="label-meta text-on-surface-variant">{m.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-on-surface">{m.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>
          <SectionCard title="Certificaciones">
            <ul className="space-y-2.5">
              {certs.map((c) => (
                <li key={c} className="flex items-center gap-2.5 rounded-lg border border-outline-variant px-3.5 py-2.5">
                  <BadgeCheck className="size-5 shrink-0 text-success" strokeWidth={1.75} />
                  <span className="text-sm text-on-surface">{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-success-container/40 p-3 text-xs text-on-success-container">
              <ShieldCheck className="size-4 shrink-0" /> Expediente 90% completo · al corriente
            </div>
          </SectionCard>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard title="Datos de contacto">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="tel">Teléfono</Label>
                <Input id="tel" defaultValue="+52 55 1234 5678" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="em">Correo</Label>
                <Input id="em" type="email" defaultValue={user.email} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dir">Domicilio</Label>
                <Input id="dir" defaultValue="Col. Roma Norte, CDMX" />
              </div>
              <Button onClick={() => toast.success("Datos actualizados")}>Guardar cambios</Button>
            </div>
          </SectionCard>
          <SectionCard title="Notificaciones">
            <ul className="space-y-1">
              {[
                { key: "push" as const, label: "Notificaciones push", desc: "Alertas en tu dispositivo" },
                { key: "email" as const, label: "Correo electrónico", desc: "Resumen y avisos por correo" },
                { key: "turnos" as const, label: "Recordatorio de turnos", desc: "1 hora antes de tu turno" },
                { key: "marketing" as const, label: "Novedades del producto", desc: "Tips y anuncios" },
              ].map((row) => (
                <li key={row.key} className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 hover:bg-surface-low">
                  <div>
                    <p className="text-sm font-medium text-on-surface">{row.label}</p>
                    <p className="text-xs text-on-surface-variant">{row.desc}</p>
                  </div>
                  <Switch checked={prefs[row.key]} onCheckedChange={(v) => save(row.key, v)} />
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
