"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Tag, Trophy, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/precios", label: "Precios", icon: Tag },
  { href: "/casos-de-exito", label: "Casos", icon: Trophy },
  { href: "/app", label: "Abrir app", icon: LayoutDashboard, primary: true },
];

/** App-style fixed bottom tab bar for the public site on mobile. */
export function PublicBottomBar() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-outline-variant bg-surface/95 px-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl md:hidden"
      aria-label="Navegación"
    >
      {tabs.map((t) => {
        const active = t.href === pathname;
        const Icon = t.icon;
        return (
          <Link
            key={t.href}
            href={t.href}
            className="relative flex flex-1 flex-col items-center gap-0.5 py-1 transition-transform active:scale-90"
          >
            <span
              className={cn(
                "grid place-items-center rounded-full px-4 py-1 transition-colors",
                t.primary
                  ? "bg-secondary text-on-secondary"
                  : active
                    ? "bg-secondary/12 text-secondary"
                    : "text-on-surface-variant",
              )}
            >
              <Icon className="size-5" strokeWidth={active || t.primary ? 2 : 1.6} />
            </span>
            <span
              className={cn(
                "text-[10px] font-medium",
                active || t.primary ? "text-on-surface" : "text-on-surface-variant",
              )}
            >
              {t.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
