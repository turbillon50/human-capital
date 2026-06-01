# San Antonio HCM — Demo PWA

Demo cinematográfica de una plataforma **HCM (Human Capital Management) para empresas de
seguridad privada**, construida a partir del export crudo de Google Stitch (ver
[`STITCH_ANALYSIS.md`](./STITCH_ANALYSIS.md)).

> **Liga del preview:** se publica automáticamente en Vercel al hacer push. La URL del último
> deploy se comparte en la descripción del Pull Request y al final de esta sección.

## Stack

- **Next.js 16** (App Router) + **TypeScript estricto** (sin `any`)
- **Tailwind CSS v4** con tema custom (paleta migrada de Stitch)
- Componentes propios estilo **shadcn/ui** (CVA)
- **Zustand** (estado global del modo demo + login fake)
- **Framer Motion** (transiciones, stagger, parallax), **Recharts** (gráficas),
  **Lucide** (íconos), **canvas-confetti**, **Sonner** (toasts)
- **PWA** instalable (manifest + service worker + offline) y **SEO** (OG dinámica, sitemap, robots, JSON-LD)

## Los 3 modos + toggle global

La demo tiene un **switcher flotante** (esquina inferior derecha, 🎬 *Modo demo*) que salta entre
los 3 modos en cualquier momento de la presentación. El modo se persiste en `localStorage`.

| Modo | Ruta | Quién | Qué muestra |
|------|------|-------|-------------|
| **Público** | `/` | Prospecto | Landing cinematográfica: hero, features, stats, casos, precios, contacto |
| **Usuario** | `/app` | El guardia | Próximo turno, vacaciones, reportar incidencia, **firmar documentos**, historial, notificaciones, perfil |
| **Admin** | `/admin` | RRHH / Director | Dashboard ejecutivo, empleados (CRUD), incidencias, contratos, reportes con **export CSV**, equipo/roles, configuración |

## Credenciales del demo (login fake)

El login en `/sign-in` acepta **cualquier correo + contraseña de 4+ caracteres**.
El destino depende del correo:

| Para entrar como… | Usa un correo… | Ejemplo | Redirige a |
|-------------------|----------------|---------|------------|
| **Administrador** (Sofía Hernández) | que empiece con `admin@` **o** termine en `@demo.com` | `admin@sanantonio.mx` | `/admin` |
| **Usuario / guardia** (Mateo Rivera) | cualquier otro | `mateo@empresa.mx` | `/app` |

- El campo viene pre-llenado con `admin@sanantonio.mx` / `demo1234` para entrar directo al panel admin.
- Contraseñas `fail` o `error` muestran un error elegante (para demostrar el manejo de errores).
- Los botones de Google / Apple también "loguean" (con loading) como usuario.
- También puedes saltarte el login y usar el **switcher 🎬** para entrar a cualquier modo.

## Datos demo

Generados de forma **determinista** (PRNG con semilla) en `src/lib/demo-data/`, con tipos estrictos:
50 empleados, 200 incidencias, 30 contratos, 12 meses de histórico para gráficas, vacaciones,
notificaciones y bitácora de auditoría. Nombres latinos, ciudades de México y montos en MXN realistas.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Estructura

```
src/
  app/
    (public)/          # Modo Público (landing + marketing)
    app/               # Modo Usuario (portal del guardia)
    admin/             # Modo Admin (panel RRHH/Director)
    sign-in, sign-up/  # Login fake con UX premium
    manifest.ts, robots.ts, sitemap.ts, opengraph-image.tsx, icons/[size]/
  components/
    ui/                # Primitivos shadcn-style (button, card, badge, input, sheet, tabs…)
    public/            # Hero, features, stats, testimonials, CTA, nav, footer
    dashboard/         # Shell (sidebar/topbar/drawer), data-table, KPIs, notificaciones
    brand/             # Logo (escudo SVG), gradient mesh
  lib/
    demo-data/         # Dataset determinista + tipos + contenido de marketing
    design-tokens.ts   # Paleta/escala migrada de Stitch
    store.ts           # Zustand: modo demo + auth fake
```

## Lighthouse

> Correr `npx lighthouse <preview-url> --view` sobre el deploy de Vercel.
> Objetivos del prompt maestro: **≥95 Performance · 100 SEO/A11y/Best Practices**.
> (App estática/SSG, fuentes self-hosted vía `next/font`, imágenes lazy, sin errores en consola.)

| Métrica | Objetivo | Resultado |
|---------|----------|-----------|
| Performance | ≥ 95 | _pendiente de medir en el preview_ |
| Accessibility | 100 | _pendiente_ |
| Best Practices | 100 | _pendiente_ |
| SEO | 100 | _pendiente_ |

## Liga del preview

**Producción (pública):** https://human-capital-flax.vercel.app
