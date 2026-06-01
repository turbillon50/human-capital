"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  value,
  onValueChange,
  className,
}: {
  tabs: { value: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onValueChange: (v: string) => void;
  className?: string;
}) {
  const id = React.useId();
  return (
    <div
      className={cn(
        "inline-flex flex-wrap gap-1 rounded-xl border border-outline-variant bg-surface-container p-1",
        className,
      )}
    >
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            onClick={() => onValueChange(t.value)}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              active ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface",
            )}
          >
            {active && (
              <motion.span
                layoutId={`tab-${id}`}
                className="absolute inset-0 rounded-lg bg-surface shadow-sm"
                transition={{ type: "spring", damping: 26, stiffness: 320 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {t.icon}
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
