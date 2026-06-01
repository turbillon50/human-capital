"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationsPopover } from "@/components/dashboard/notifications-popover";
import type { NavItem } from "@/components/dashboard/nav-config";
import { useDemoStore, type DemoMode } from "@/lib/store";
import { demoUsers } from "@/lib/demo-data/marketing";
import type { DemoUser } from "@/lib/demo-data/types";
import { cn } from "@/lib/utils";

function SidebarNav({
  nav,
  pathname,
  onNavigate,
}: {
  nav: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 space-y-1 px-3">
      {nav.map((item) => {
        const active =
          item.href === pathname ||
          (item.href !== "/app" && item.href !== "/admin" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-r-full rounded-l-lg px-4 py-2.5 text-sm font-medium transition-all",
              active
                ? "bg-secondary-container font-semibold text-on-secondary-container dark:bg-secondary dark:text-on-secondary"
                : "text-primary-fixed-dim hover:translate-x-0.5 hover:bg-white/10 hover:text-on-primary",
            )}
          >
            <Icon className="size-5 shrink-0" strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardShell({
  nav,
  mode,
  children,
}: {
  nav: NavItem[];
  mode: Extract<DemoMode, "usuario" | "admin">;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawer, setDrawer] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const storeUser = useDemoStore((s) => s.user);
  const setMode = useDemoStore((s) => s.setMode);
  const signOut = useDemoStore((s) => s.signOut);

  // Ensure the demo identity & mode are coherent for this section.
  React.useEffect(() => {
    setMounted(true);
    setMode(mode);
    if (!useDemoStore.getState().user) {
      useDemoStore.setState({ user: mode === "admin" ? demoUsers.admin : demoUsers.usuario });
    }
  }, [mode, setMode]);

  const fallback: DemoUser = mode === "admin" ? demoUsers.admin : demoUsers.usuario;
  const user = (mounted && storeUser) || fallback;

  const title = nav.find((n) => n.href === pathname)?.label ??
    nav.find((n) => n.href !== "/app" && n.href !== "/admin" && pathname.startsWith(n.href))?.label ??
    nav[0].label;

  const basePath = mode === "admin" ? "/admin" : "/app/notificaciones";
  const logout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col bg-primary-container py-6 md:flex">
        <div className="px-6 pb-7">
          <Logo inverted />
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-fixed-dim">
            {mode === "admin" ? "Panel administrativo" : "Portal del personal"}
          </span>
        </div>
        <SidebarNav nav={nav} pathname={pathname} />
        <div className="mt-auto px-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <Avatar src={user.avatar} name={user.nombre} className="size-10" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-on-primary">{user.nombre}</p>
              <p className="truncate text-[11px] text-primary-fixed-dim">{user.puesto}</p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg p-1.5 text-primary-fixed-dim transition-colors hover:bg-white/10 hover:text-on-primary"
              aria-label="Cerrar sesión"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-primary-container py-6"
            >
              <div className="flex items-center justify-between px-6 pb-6">
                <Logo inverted />
                <button onClick={() => setDrawer(false)} className="text-primary-fixed-dim" aria-label="Cerrar">
                  <X className="size-5" />
                </button>
              </div>
              <SidebarNav nav={nav} pathname={pathname} onNavigate={() => setDrawer(false)} />
              <div className="mt-auto px-4">
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-primary-fixed-dim"
                >
                  <LogOut className="size-4" /> Cerrar sesión
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="md:ml-[264px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-outline-variant bg-surface/85 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawer(true)}
              className="rounded-lg p-1.5 text-on-surface md:hidden"
              aria-label="Menú"
            >
              <Menu className="size-6" />
            </button>
            <h1 className="font-display text-lg font-bold tracking-tight text-on-surface sm:text-xl">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              className="hidden size-9 place-items-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-high sm:grid"
              aria-label="Buscar"
            >
              <Search className="size-5" strokeWidth={1.5} />
            </button>
            <NotificationsPopover basePath={basePath} />
            <ThemeToggle />
            <div className="ml-1 hidden items-center gap-2.5 sm:flex">
              <Avatar src={user.avatar} name={user.nombre} className="size-9" />
              <span className="hidden text-sm font-medium text-on-surface lg:block">
                {user.nombre.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
          </div>
        </header>

        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-6 md:pb-10"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
