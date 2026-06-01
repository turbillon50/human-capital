"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ShieldAlert, CalendarClock, FileText, PenTool, Settings } from "lucide-react";
import { notifications } from "@/lib/demo-data";
import type { NotificationKind } from "@/lib/demo-data/types";
import { relativeTime } from "@/lib/utils";

const kindIcon: Record<NotificationKind, React.ElementType> = {
  incidencia: ShieldAlert,
  vacacion: CalendarClock,
  contrato: FileText,
  firma: PenTool,
  sistema: Settings,
};

export function NotificationsPopover({ basePath }: { basePath: string }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.leida).length;

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-9 place-items-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-high"
        aria-label="Notificaciones"
      >
        <Bell className="size-5" strokeWidth={1.5} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-error text-[9px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-outline-variant px-4 py-3">
              <span className="font-semibold">Notificaciones</span>
              <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">
                {unread} nuevas
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto thin-scroll">
              {notifications.slice(0, 5).map((n) => {
                const Icon = kindIcon[n.kind];
                return (
                  <div
                    key={n.id}
                    className="flex gap-3 border-b border-outline-variant px-4 py-3 last:border-0 hover:bg-surface-low"
                  >
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug text-on-surface">{n.titulo}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-on-surface-variant">{n.detalle}</p>
                      <p className="mt-1 text-[11px] text-on-surface-variant/70">{relativeTime(n.fecha)}</p>
                    </div>
                    {!n.leida && <span className="mt-1 size-2 shrink-0 rounded-full bg-secondary" />}
                  </div>
                );
              })}
            </div>
            <Link
              href={basePath}
              onClick={() => setOpen(false)}
              className="block border-t border-outline-variant px-4 py-3 text-center text-sm font-semibold text-secondary hover:bg-surface-low"
            >
              Ver todas
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
