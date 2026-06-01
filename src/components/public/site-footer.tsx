import Link from "next/link";
import { Linkedin, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const groups = [
  {
    title: "Producto",
    links: [
      { label: "Cómo funciona", href: "/como-funciona" },
      { label: "Precios", href: "/precios" },
      { label: "Casos de éxito", href: "/casos-de-exito" },
      { label: "Solicitar demo", href: "/sign-up" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "/contacto" },
      { label: "Contacto", href: "/contacto" },
      { label: "Soporte", href: "/contacto" },
      { label: "Estado del servicio", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Aviso de privacidad", href: "/contacto" },
      { label: "Términos del servicio", href: "/contacto" },
      { label: "Cumplimiento", href: "/contacto" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-surface-variant">
              El sistema operativo de capital humano para empresas de seguridad
              privada en México. Expediente digital, incidencias y control total
              de tu personal de campo.
            </p>
            <div className="mt-5 flex gap-2">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="/contacto"
                  className="grid size-9 place-items-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-low hover:text-secondary"
                  aria-label="Red social"
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="label-meta text-on-surface-variant">{g.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-outline-variant pt-6 sm:flex-row">
          <p className="text-xs text-on-surface-variant">
            © {new Date().getFullYear()} San Antonio Seguridad Privada. Todos los
            derechos reservados.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <span className="size-2 rounded-full bg-success" />
            Todos los sistemas operativos · 99.9% uptime
          </p>
        </div>
      </div>
    </footer>
  );
}
