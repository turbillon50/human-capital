"use client";

import * as React from "react";
import { Mail, MoreVertical, Plus, Shield } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input, Label } from "@/components/ui/input";
import { Modal, ModalHeader } from "@/components/ui/sheet";
import { PageHeader, SectionCard } from "@/components/dashboard/parts";
import { avatarUrl } from "@/lib/demo-data";
import { relativeTime } from "@/lib/utils";

type Rol = "Administrador" | "RRHH" | "Supervisor" | "Solo lectura";

interface Miembro {
  id: string;
  nombre: string;
  email: string;
  avatar: string;
  rol: Rol;
  ultimoAcceso: string;
}

const rolTone: Record<Rol, "primary" | "info" | "warning" | "neutral"> = {
  Administrador: "primary",
  RRHH: "info",
  Supervisor: "warning",
  "Solo lectura": "neutral",
};

const seed: Miembro[] = [
  { id: "T1", nombre: "Sofía Hernández García", email: "sofia.hernandez@sanantonio.mx", avatar: avatarUrl(5), rol: "Administrador", ultimoAcceso: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: "T2", nombre: "Mateo Rivera López", email: "mateo.rivera@sanantonio.mx", avatar: avatarUrl(12), rol: "Supervisor", ultimoAcceso: new Date(Date.now() - 3 * 3600000).toISOString() },
  { id: "T3", nombre: "Camila Torres Flores", email: "camila.torres@sanantonio.mx", avatar: avatarUrl(20), rol: "RRHH", ultimoAcceso: new Date(Date.now() - 26 * 3600000).toISOString() },
  { id: "T4", nombre: "Diego Ramírez Sánchez", email: "diego.ramirez@sanantonio.mx", avatar: avatarUrl(8), rol: "Supervisor", ultimoAcceso: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: "T5", nombre: "Valentina Ortega Mendoza", email: "valentina.ortega@sanantonio.mx", avatar: avatarUrl(35), rol: "Solo lectura", ultimoAcceso: new Date(Date.now() - 8 * 86400000).toISOString() },
];

const permisos = [
  { rol: "Administrador", desc: "Control total: empleados, contratos, configuración y facturación." },
  { rol: "RRHH", desc: "Gestiona expedientes, incidencias, vacaciones y reportes." },
  { rol: "Supervisor", desc: "Aprueba solicitudes y da seguimiento a su zona asignada." },
  { rol: "Solo lectura", desc: "Consulta dashboards y reportes sin editar." },
];

export default function EquipoPage() {
  const [team, setTeam] = React.useState(seed);
  const [invite, setInvite] = React.useState(false);

  function onInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const rol = String(form.get("rol")) as Rol;
    setTeam((t) => [
      { id: `T${t.length + 1}`, nombre: email.split("@")[0].replace(/\./g, " "), email, avatar: "", rol, ultimoAcceso: new Date().toISOString() },
      ...t,
    ]);
    setInvite(false);
    toast.success("Invitación enviada", { description: `Se invitó a ${email} como ${rol}.` });
  }

  return (
    <div>
      <PageHeader title="Equipo y roles" subtitle="Gestiona quién puede acceder al panel y con qué permisos.">
        <Button onClick={() => setInvite(true)}>
          <Plus className="size-4" /> Invitar miembro
        </Button>
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <SectionCard title={`Miembros (${team.length})`} bodyClassName="p-0">
          <ul className="divide-y divide-outline-variant">
            {team.map((m) => (
              <li key={m.id} className="flex items-center gap-3 px-5 py-4">
                <Avatar src={m.avatar} name={m.nombre} className="size-10" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-on-surface">{m.nombre}</p>
                  <p className="truncate text-xs text-on-surface-variant">{m.email}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <Badge tone={rolTone[m.rol]}>{m.rol}</Badge>
                  <p className="mt-1 text-[11px] text-on-surface-variant">{relativeTime(m.ultimoAcceso)}</p>
                </div>
                <button
                  onClick={() => toast("Opciones de miembro", { description: m.nombre })}
                  className="grid size-8 place-items-center rounded-lg text-on-surface-variant hover:bg-surface-low"
                  aria-label="Opciones"
                >
                  <MoreVertical className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Roles y permisos">
          <ul className="space-y-3">
            {permisos.map((p) => (
              <li key={p.rol} className="rounded-xl border border-outline-variant p-4">
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-secondary" strokeWidth={1.75} />
                  <span className="text-sm font-semibold text-on-surface">{p.rol}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-on-surface-variant">{p.desc}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <Modal open={invite} onClose={() => setInvite(false)}>
        <ModalHeader title="Invitar miembro" subtitle="Enviaremos un correo con acceso al panel." />
        <form onSubmit={onInvite} className="space-y-5 p-6">
          <div className="space-y-1.5">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant/60" />
              <Input id="email" name="email" type="email" required className="pl-10" placeholder="nombre@sanantonio.mx" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rol">Rol</Label>
            <select id="rol" name="rol" className="flex h-11 w-full rounded-lg border border-outline-variant bg-surface px-3.5 text-sm">
              {(["RRHH", "Supervisor", "Administrador", "Solo lectura"] as Rol[]).map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setInvite(false)}>Cancelar</Button>
            <Button type="submit"><Mail className="size-4" /> Enviar invitación</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
