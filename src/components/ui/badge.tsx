import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-tight tracking-wide",
  {
    variants: {
      tone: {
        neutral: "bg-surface-high text-on-surface-variant",
        success: "bg-success-container text-on-success-container",
        warning: "bg-warning-container text-on-warning-container",
        error: "bg-error-container text-on-error-container",
        info: "bg-secondary/12 text-secondary",
        primary: "bg-primary-container/10 text-primary-container dark:text-primary-fixed-dim",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

/** Maps an arbitrary status string to a badge tone + Spanish label. */
const statusMap: Record<string, { tone: NonNullable<BadgeProps["tone"]>; label: string }> = {
  activo: { tone: "success", label: "Activo" },
  vigente: { tone: "success", label: "Vigente" },
  aprobada: { tone: "success", label: "Aprobada" },
  resuelta: { tone: "success", label: "Resuelta" },
  inactivo: { tone: "error", label: "Inactivo" },
  vencido: { tone: "error", label: "Vencido" },
  rechazada: { tone: "error", label: "Rechazada" },
  abierta: { tone: "error", label: "Abierta" },
  pendiente: { tone: "warning", label: "Pendiente" },
  por_vencer: { tone: "warning", label: "Por vencer" },
  en_proceso: { tone: "warning", label: "En proceso" },
  vacaciones: { tone: "info", label: "Vacaciones" },
  incapacidad: { tone: "warning", label: "Incapacidad" },
  en_negociacion: { tone: "info", label: "En negociación" },
  cancelada: { tone: "neutral", label: "Cancelada" },
  baja: { tone: "neutral", label: "Baja" },
  media: { tone: "warning", label: "Media" },
  alta: { tone: "error", label: "Alta" },
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const cfg = statusMap[status] ?? { tone: "neutral" as const, label: status };
  return (
    <Badge tone={cfg.tone} className={className}>
      {cfg.label}
    </Badge>
  );
}
