"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-on-surface-variant">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export function SectionCard({
  title,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-outline-variant bg-surface", className)}>
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant px-5 py-3.5">
          <h3 className="font-semibold tracking-tight text-on-surface">{title}</h3>
          {action}
        </div>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface px-6 py-14 text-center"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-secondary/10 text-secondary">
        <Icon className="size-7" strokeWidth={1.5} />
      </span>
      <h3 className="mt-4 font-semibold text-on-surface">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-on-surface-variant">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}

/** Simulates a network fetch with a realistic delay; returns loading state. */
export function useSimulatedLoad(ms = 800) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return loading;
}
