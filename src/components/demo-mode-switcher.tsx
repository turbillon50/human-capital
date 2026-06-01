"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard, Globe, LayoutDashboard, UserRound, X } from "lucide-react";
import { useDemoStore, modeHome, type DemoMode } from "@/lib/store";
import { demoUsers } from "@/lib/demo-data/marketing";
import { cn } from "@/lib/utils";

const OPTIONS: { mode: DemoMode; label: string; icon: React.ElementType }[] = [
  { mode: "publico", label: "Público", icon: Globe },
  { mode: "usuario", label: "Usuario", icon: UserRound },
  { mode: "admin", label: "Admin", icon: LayoutDashboard },
];

export function DemoModeSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, setMode } = useDemoStore();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Hidden on the auth flow (part of the public funnel).
  if (pathname === "/sign-in" || pathname === "/sign-up") return null;
  if (!mounted) return null;

  const go = (next: DemoMode) => {
    setMode(next);
    // Ensure a demo identity exists when jumping into a private mode.
    if (next !== "publico" && !useDemoStore.getState().user) {
      useDemoStore.setState({ user: next === "admin" ? demoUsers.admin : demoUsers.usuario });
    }
    router.push(modeHome[next]);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            className="w-64 overflow-hidden rounded-2xl border border-white/10 bg-primary-container/95 p-2 text-on-primary shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-2.5 py-1.5">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-fixed-dim">
                <Clapperboard className="size-3.5" strokeWidth={2} /> Modo demo
              </span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-primary-fixed-dim transition-colors hover:bg-white/10"
                aria-label="Cerrar"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <div className="mt-1 space-y-1">
              {OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = opt.mode === mode;
                return (
                  <button
                    key={opt.mode}
                    onClick={() => go(opt.mode)}
                    className={cn(
                      "relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      active
                        ? "bg-secondary text-white"
                        : "text-primary-fixed-dim hover:bg-white/10",
                    )}
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                    {opt.label}
                    {active && (
                      <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider opacity-80">
                        Activo
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="px-3 pb-1.5 pt-2 text-[10px] leading-snug text-on-primary-container">
              Salta entre las 3 vistas del producto en cualquier momento de la
              presentación.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        layout
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-primary-container px-4 py-3 text-sm font-semibold text-on-primary shadow-2xl ring-1 ring-secondary/30 transition-all hover:ring-secondary/60"
      >
        <span className="grid size-6 place-items-center rounded-full bg-secondary text-white">
          <Clapperboard className="size-3.5" strokeWidth={2} />
        </span>
        <span className="hidden sm:inline">Modo demo</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary-fixed-dim">
          {OPTIONS.find((o) => o.mode === mode)?.label}
        </span>
      </motion.button>
    </div>
  );
}
