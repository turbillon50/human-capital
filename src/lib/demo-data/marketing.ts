import type { DemoUser } from "./types";
import { avatarUrl } from "./seed";

/** The two demo identities the login flow "authenticates" into. */
export const demoUsers: Record<"usuario" | "admin", DemoUser> = {
  usuario: {
    id: "EMP-1287",
    nombre: "Mateo Rivera López",
    puesto: "Guardia de Seguridad · Turno matutino",
    email: "mateo.rivera@sanantonio.mx",
    avatar: avatarUrl(12),
    rol: "usuario",
  },
  admin: {
    id: "ADM-001",
    nombre: "Sofía Hernández García",
    puesto: "Directora de Capital Humano",
    email: "sofia.hernandez@sanantonio.mx",
    avatar: avatarUrl(5),
    rol: "admin",
  },
};

export interface Plan {
  nombre: string;
  precio: number; // MXN / mes
  unidad: string;
  destacado: boolean;
  resumen: string;
  cta: string;
  features: string[];
}

export const planes: Plan[] = [
  {
    nombre: "Caseta",
    precio: 49,
    unidad: "por guardia / mes",
    destacado: false,
    resumen: "Para empresas que arrancan la digitalización de su personal de campo.",
    cta: "Empezar gratis 14 días",
    features: [
      "Hasta 25 guardias",
      "Expediente digital",
      "Control de incidencias",
      "App móvil para personal",
      "Soporte por correo",
    ],
  },
  {
    nombre: "Operación",
    precio: 39,
    unidad: "por guardia / mes",
    destacado: true,
    resumen: "El estándar para empresas de seguridad con operación multi-sitio.",
    cta: "Agendar demo",
    features: [
      "Guardias ilimitados",
      "Todo lo de Caseta",
      "Firma digital de documentos",
      "Reportes y export CSV",
      "Control de contratos y vacaciones",
      "Geolocalización de personal",
      "Soporte prioritario 24/7",
    ],
  },
  {
    nombre: "Corporativo",
    precio: 0,
    unidad: "precio a la medida",
    destacado: false,
    resumen: "Para corporativos con cumplimiento, SSO y multi-empresa.",
    cta: "Hablar con ventas",
    features: [
      "Todo lo de Operación",
      "SSO / SAML y auditoría",
      "Multi-empresa y roles avanzados",
      "Integraciones de nómina",
      "Gerente de cuenta dedicado",
      "SLA 99.99%",
    ],
  },
];

export interface Feature {
  icon: string; // lucide icon name
  titulo: string;
  descripcion: string;
}

export const features: Feature[] = [
  {
    icon: "FolderLock",
    titulo: "Expediente digital",
    descripcion:
      "Cada guardia con su expediente completo: certificaciones SEDENA, contratos, exámenes y documentos, listos para auditoría en segundos.",
  },
  {
    icon: "ShieldAlert",
    titulo: "Control de incidencias",
    descripcion:
      "Retardos, faltas, actas administrativas e incidentes de seguridad capturados desde campo, con severidad y seguimiento hasta su resolución.",
  },
  {
    icon: "PenTool",
    titulo: "Firma digital",
    descripcion:
      "Contratos, actas y avisos firmados desde el celular del personal, con validez y trazabilidad. Cero papel, cero traslados.",
  },
  {
    icon: "MapPin",
    titulo: "Personal geolocalizado",
    descripcion:
      "Distribución de tu fuerza por zona y sitio en tiempo real. Sabe quién está en cada caseta y cubre vacantes al instante.",
  },
  {
    icon: "CalendarClock",
    titulo: "Vacaciones y turnos",
    descripcion:
      "Solicitudes de descanso con aprobación en un toque y un calendario que evita que un sitio se quede sin cobertura.",
  },
  {
    icon: "BarChart3",
    titulo: "Reportes ejecutivos",
    descripcion:
      "Rotación, asistencia, incidencias y rentabilidad por contrato. Exporta a CSV o preséntalo en tu junta de consejo.",
  },
];

export interface HowStep {
  numero: string;
  titulo: string;
  descripcion: string;
  icon: string;
}

export const howSteps: HowStep[] = [
  {
    numero: "01",
    titulo: "Carga tu plantilla",
    descripcion:
      "Importa a tus guardias y supervisores desde Excel o nómina. En minutos cada uno tiene su expediente digital y acceso a la app.",
    icon: "Upload",
  },
  {
    numero: "02",
    titulo: "Tu personal opera desde el celular",
    descripcion:
      "Checan turno, reportan incidencias, firman documentos y piden vacaciones. Todo desde su teléfono, incluso sin internet en campo.",
    icon: "Smartphone",
  },
  {
    numero: "03",
    titulo: "Tú controlas desde el panel",
    descripcion:
      "Apruebas, supervisas y resuelves. Cada movimiento queda registrado con bitácora de auditoría y notificaciones en tiempo real.",
    icon: "MonitorCog",
  },
  {
    numero: "04",
    titulo: "Decides con datos",
    descripcion:
      "Reportes ejecutivos de rotación, asistencia y rentabilidad por contrato para crecer tu operación con números, no corazonadas.",
    icon: "TrendingUp",
  },
];

export interface Testimonial {
  nombre: string;
  cargo: string;
  empresa: string;
  avatar: string;
  texto: string;
}

export const testimonials: Testimonial[] = [
  {
    nombre: "Renata Mendoza",
    cargo: "Directora de Operaciones",
    empresa: "Vértice Protección Industrial",
    avatar: avatarUrl(31),
    texto:
      "Pasamos de 9 días a 4 horas para cerrar la nómina de incidencias. La auditoría de la STPS la resolvimos desde el panel sin mover un solo papel.",
  },
  {
    nombre: "Joaquín Cervantes",
    cargo: "Gerente General",
    empresa: "Escudo Norte Seguridad",
    avatar: avatarUrl(33),
    texto:
      "Bajamos la rotación 22% en seis meses. Por fin sabemos quién está en cada sitio y cubrimos una falta en minutos, no en horas.",
  },
  {
    nombre: "Valentina Ortega",
    cargo: "Coordinadora de RRHH",
    empresa: "Grupo Centinela",
    avatar: avatarUrl(35),
    texto:
      "Los guardias firman su contrato desde el celular el primer día. Lo que antes era una carpeta física hoy es un expediente que nunca se pierde.",
  },
];

export interface CaseStudy {
  empresa: string;
  ciudad: string;
  reto: string;
  resultado: string;
  metricas: { valor: string; etiqueta: string }[];
  logoSeed: string;
}

export const caseStudies: CaseStudy[] = [
  {
    empresa: "Escudo Norte Seguridad",
    ciudad: "Monterrey",
    reto: "Rotación del 38% anual y cero visibilidad de quién cubría cada sitio.",
    resultado:
      "Implementaron expediente digital y control de turnos en 3 semanas para 340 guardias.",
    metricas: [
      { valor: "-22%", etiqueta: "rotación de personal" },
      { valor: "4 h", etiqueta: "para cerrar incidencias (antes 9 días)" },
      { valor: "98.7%", etiqueta: "asistencia verificada" },
    ],
    logoSeed: "EN",
  },
  {
    empresa: "Vértice Protección Industrial",
    ciudad: "Querétaro",
    reto: "Auditorías de cumplimiento que tomaban semanas de recopilar papelería.",
    resultado:
      "Centralizaron 1,200 expedientes y firma digital de contratos en una sola plataforma.",
    metricas: [
      { valor: "100%", etiqueta: "expedientes digitalizados" },
      { valor: "$1.8M", etiqueta: "ahorro anual en gestión documental" },
      { valor: "12 días", etiqueta: "menos por auditoría" },
    ],
    logoSeed: "VP",
  },
  {
    empresa: "Grupo Centinela",
    ciudad: "CDMX",
    reto: "Crecimiento a 5 ciudades sin un sistema central de RRHH.",
    resultado:
      "Escalaron a 880 elementos en 5 plazas con un solo panel de control multi-sitio.",
    metricas: [
      { valor: "5", etiqueta: "ciudades en un panel" },
      { valor: "+31%", etiqueta: "contratos ganados" },
      { valor: "99.9%", etiqueta: "uptime de la plataforma" },
    ],
    logoSeed: "GC",
  },
];

export const heroStats = [
  { valor: 42000, prefijo: "", sufijo: "+", etiqueta: "elementos gestionados" },
  { valor: 500, prefijo: "", sufijo: "+", etiqueta: "empresas de seguridad" },
  { valor: 99.9, prefijo: "", sufijo: "%", etiqueta: "uptime garantizado", decimales: 1 },
  { valor: 184, prefijo: "$", sufijo: "M", etiqueta: "MXN en nómina procesada" },
] as const;

/** Placeholder client brands rendered as elegant SVG wordmarks. */
export const trustedBrands = [
  "VÉRTICE",
  "ESCUDO NORTE",
  "CENTINELA",
  "GRUPO ÉGIDA",
  "BLINDAJE MX",
  "FORTIS",
] as const;
