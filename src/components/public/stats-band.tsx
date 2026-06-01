import { CountUp } from "@/components/ui/count-up";
import { DotGrid } from "@/components/brand/gradient-mesh";
import { heroStats } from "@/lib/demo-data/marketing";

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-primary-container py-16">
      <DotGrid className="opacity-[0.12]" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4">
        {heroStats.map((s) => (
          <div key={s.etiqueta} className="text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight text-on-primary sm:text-5xl">
              <CountUp
                value={s.valor}
                prefix={s.prefijo}
                suffix={s.sufijo}
                decimals={"decimales" in s ? (s.decimales as number) : 0}
              />
            </p>
            <p className="mt-2 text-sm text-primary-fixed-dim">{s.etiqueta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
