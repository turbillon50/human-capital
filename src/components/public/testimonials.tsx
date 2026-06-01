import { Quote } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/demo-data/marketing";

export function Testimonials() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <Reveal key={t.nombre} index={i}>
          <figure className="flex h-full flex-col rounded-2xl border border-outline-variant bg-surface p-6">
            <Quote className="size-7 text-secondary/30" strokeWidth={1.5} />
            <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-on-surface">
              “{t.texto}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-outline-variant pt-4">
              <Avatar src={t.avatar} name={t.nombre} />
              <div>
                <p className="text-sm font-semibold text-on-surface">{t.nombre}</p>
                <p className="text-xs text-on-surface-variant">
                  {t.cargo} · {t.empresa}
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
