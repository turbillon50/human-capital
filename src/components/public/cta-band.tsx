"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { GradientMesh } from "@/components/brand/gradient-mesh";

export function CtaBand() {
  const burst = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#2d5dab", "#80abfe", "#bac7e4", "#ffffff"],
      disableForReducedMotion: true,
    });
  };

  return (
    <section className="relative mx-auto my-20 max-w-6xl overflow-hidden rounded-3xl border border-outline-variant bg-primary-container px-6 py-16 text-center sm:px-12">
      <GradientMesh variant="dark" />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-on-primary sm:text-4xl">
          Lleva el control total de tu personal de seguridad
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-primary-fixed-dim">
          Agenda una demostración de 20 minutos. Te mostramos cómo digitalizar
          expedientes, incidencias y firma en tu operación específica.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="secondary" onClick={burst}>
            <Link href="/sign-up">
              Solicitar demo gratis
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <Link href="/precios">Ver planes y precios</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
