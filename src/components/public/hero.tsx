"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  ShieldCheck,
  Activity,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientMesh, DotGrid } from "@/components/brand/gradient-mesh";
import { CountUp } from "@/components/ui/count-up";
import { kpis } from "@/lib/demo-data";

export function Hero() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMock = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yMesh = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y: yMesh }} className="absolute inset-0">
        <GradientMesh />
      </motion.div>
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface/70 px-3 py-1.5 text-xs font-medium text-on-surface-variant backdrop-blur"
            >
              <span className="flex size-2 items-center justify-center">
                <span className="absolute size-2 animate-ping rounded-full bg-success/60" />
                <span className="size-2 rounded-full bg-success" />
              </span>
              Plataforma #1 de RRHH para seguridad privada en México
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-on-surface sm:text-5xl lg:text-6xl"
            >
              El sistema operativo de tu{" "}
              <span className="bg-gradient-to-r from-secondary to-primary-fixed-dim bg-clip-text text-transparent dark:from-secondary-container dark:to-primary-fixed-dim">
                fuerza de seguridad
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-on-surface-variant"
            >
              Expediente digital, control de incidencias, firma de documentos y
              reportes ejecutivos. Todo tu personal de campo —guardias,
              supervisores y escoltas— en un solo panel de control.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg">
                <Link href="/sign-up">
                  Solicitar demo gratis
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/como-funciona">
                  <PlayCircle className="size-4" />
                  Ver cómo funciona
                </Link>
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-surface-variant"
            >
              {["Implementación en 3 semanas", "Sin tarjeta de crédito", "Soporte en español 24/7"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" strokeWidth={2} />
                    {t}
                  </li>
                ),
              )}
            </motion.ul>
          </div>

          {/* Product preview mockup */}
          <motion.div
            style={{ y: yMock }}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-outline-variant bg-primary-container shadow-2xl">
              <DotGrid />
              {/* mock topbar */}
              <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                <div className="flex items-center gap-2 text-on-primary">
                  <ShieldCheck className="size-5 text-secondary-container" strokeWidth={1.75} />
                  <span className="text-sm font-semibold">Panel Ejecutivo</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-secondary-container" />
                </div>
              </div>
              <div className="relative space-y-3 p-5">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Users, label: "Activos", value: kpis.empleadosActivos, suffix: "" },
                    { icon: Activity, label: "Incidencias", value: kpis.incidenciasMes, suffix: "" },
                    { icon: ShieldCheck, label: "En campo", value: kpis.guardiasEnCampo, suffix: "" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                    >
                      <s.icon className="size-4 text-secondary-container" strokeWidth={1.75} />
                      <p className="mt-2 font-display text-2xl font-bold text-on-primary">
                        <CountUp value={s.value} suffix={s.suffix} />
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-primary-fixed-dim">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                {/* fake chart */}
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] uppercase tracking-wider text-primary-fixed-dim">
                    Asistencia verificada · 12 meses
                  </p>
                  <div className="mt-3 flex h-24 items-end gap-1.5">
                    {[42, 55, 48, 63, 58, 71, 66, 78, 73, 84, 80, 92].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.6, delay: 0.5 + i * 0.04 }}
                        className="flex-1 rounded-t bg-gradient-to-t from-secondary/40 to-secondary-container"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* floating chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-xl border border-outline-variant bg-surface px-3.5 py-2.5 shadow-lg sm:flex"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-success-container text-on-success-container">
                <CheckCircle2 className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-on-surface">Contrato firmado</p>
                <p className="text-[10px] text-on-surface-variant">Mateo R. · hace 2 min</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
