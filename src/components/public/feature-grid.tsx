"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { features } from "@/lib/demo-data/marketing";
import { iconMap } from "@/components/icon-map";

/** Feature card with a subtle 3D tilt on hover. */
function FeatureCard({ index }: { index: number }) {
  const f = features[index];
  const Icon = iconMap[f.icon];
  const ref = React.useRef<HTMLDivElement>(null);
  const [t, setT] = React.useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 6, ry: px * 6 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      style={{ transform: `perspective(800px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      className="group relative rounded-2xl border border-outline-variant bg-surface p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(16,29,51,0.35)]"
    >
      <span className="grid size-12 place-items-center rounded-xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-on-secondary">
        <Icon className="size-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-on-surface">{f.titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{f.descripcion}</p>
    </motion.div>
  );
}

export function FeatureGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((_, i) => (
        <FeatureCard key={i} index={i} />
      ))}
    </div>
  );
}
