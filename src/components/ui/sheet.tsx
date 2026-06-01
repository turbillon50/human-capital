"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Lightweight modal + right-side sheet primitive (no external dialog dep). */
export function Modal({
  open,
  onClose,
  children,
  className,
  side = "center",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  side?: "center" | "right";
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
          />
          <motion.div
            initial={side === "right" ? { x: "100%" } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={side === "right" ? { x: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={side === "right" ? { x: "100%" } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className={cn(
              "relative z-10 bg-surface shadow-2xl",
              side === "right"
                ? "ml-auto h-full w-full max-w-md overflow-y-auto thin-scroll"
                : "m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-xl border border-outline-variant thin-scroll",
              className,
            )}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-20 rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-high"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ModalHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-outline-variant px-6 py-5 pr-12">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-on-surface-variant">{subtitle}</p>}
    </div>
  );
}
