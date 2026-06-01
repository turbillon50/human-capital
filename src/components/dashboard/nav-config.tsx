import {
  LayoutDashboard,
  CalendarClock,
  ShieldAlert,
  PenTool,
  History,
  Bell,
  UserRound,
  Users,
  FileText,
  BarChart3,
  Settings,
  UsersRound,
  FolderLock,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** Modo Usuario — el guardia / empleado de seguridad. */
export const userNav: NavItem[] = [
  { href: "/app", label: "Inicio", icon: LayoutDashboard },
  { href: "/app/vacaciones", label: "Vacaciones", icon: CalendarClock },
  { href: "/app/incidencias", label: "Reportar incidencia", icon: ShieldAlert },
  { href: "/app/documentos", label: "Firmar documentos", icon: PenTool },
  { href: "/app/historial", label: "Historial", icon: History },
  { href: "/app/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/app/perfil", label: "Mi perfil", icon: UserRound },
];

/** Modo Admin — RRHH / Director de la empresa de seguridad. */
export const adminNav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/usuarios", label: "Empleados", icon: Users },
  { href: "/admin/incidencias", label: "Incidencias", icon: ShieldAlert },
  { href: "/admin/contratos", label: "Contratos", icon: FileText },
  { href: "/admin/reportes", label: "Reportes", icon: BarChart3 },
  { href: "/admin/equipo", label: "Equipo y roles", icon: UsersRound },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export const navMeta = { FolderLock };
