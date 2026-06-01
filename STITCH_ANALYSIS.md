# Análisis del input de Google Stitch

> Documento generado en el Paso 1 del flujo de ejecución. Resume lo detectado en los
> archivos crudos exportados de Google Stitch (`/human capital/stitch_san_antonio_human_capital_management/`).

## Vertical de negocio detectado

**Human Capital Management (HCM) / RRHH operativo para empresas de seguridad privada.**

El cliente es **"San Antonio Seguridad Privada"**, una empresa que administra personal de
seguridad (guardias, supervisores) en campo. El producto es un *sistema operativo digital*
para recursos humanos de alta densidad: control de expedientes, contratos, incidencias,
incapacidades, vacaciones, actas administrativas y firma digital de documentos laborales.

Esto define los **3 modos** de la demo:

| Modo | Quién lo usa | Qué resuelve |
|------|--------------|--------------|
| **Público** | Prospecto / visitante | Landing que vende la plataforma HCM de seguridad |
| **Usuario** | El guardia / empleado de seguridad | App donde checa turnos, solicita vacaciones, reporta incidencias, firma documentos, ve su expediente |
| **Admin** | Director / RRHH de la empresa de seguridad | Panel ejecutivo para controlar toda la fuerza laboral |

## Paleta de colores (hex exactos extraídos del `tailwind.config` de Stitch)

Sistema **Material 3** ("San Antonio Operational Standard"):

| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#00030c` | Casi-negro azulado, anclas |
| `primary-container` | `#101d33` | **Navy corporativo** — sidebar, headers de autoridad |
| `on-primary-container` | `#7985a0` | Texto sobre navy |
| `primary-fixed-dim` | `#bac7e4` | Texto/links sobre fondos oscuros |
| `secondary` | `#2d5dab` | **Security Blue** — acciones primarias, links, foco |
| `secondary-container` | `#80abfe` | Estados activos de navegación |
| `on-secondary-container` | `#003d85` | Texto sobre secondary-container |
| `background` / `surface` | `#f7f9fb` | Off-white institucional |
| `surface-container-lowest` | `#ffffff` | Cards |
| `surface-container-low` | `#f2f4f6` | Filas alternadas / hovers |
| `on-surface` | `#191c1e` | Texto principal |
| `on-surface-variant` | `#45474d` | Texto secundario |
| `outline-variant` | `#c5c6cd` | Bordes 1px de cards/tablas |
| `error` | `#ba1a1a` | Estados Falta / Expirado |
| `error-container` | `#ffdad6` | Fondo de chips de error |

Acentos funcionales (status chips): **verde** (Activo), **ámbar** (Pendiente/Retardo), **rojo** (Inactivo/Falta).

## Tipografía

**Inter** (única familia). Jerarquía por peso y color, no por tamaño excesivo (filosofía ERP).
Type scale de Stitch:

- `display-lg` 32px / 700 / -0.02em
- `headline-md` 24px / 600 / -0.01em
- `title-lg` 20px / 600
- `body-md` 16px / 400
- `body-sm` 14px / 400
- `label-md` 12px / 600 / +0.05em **UPPERCASE** (capa de metadatos)
- `label-sm` 11px / 500

> Decisión de diseño: mantenemos Inter (next/font) y **añadimos un display font con personalidad
> (Manrope)** sólo para titulares de marketing del Modo Público, para subir el "wow" sin
> traicionar el tono institucional del producto.

## Tono visual

**Corporate Modern / ERP institucional.** Autoridad, fiabilidad, excelencia operativa.
Alta densidad de información. Elevación por *tonal layering* y bordes de bajo contraste,
no por sombras pesadas. Radios suaves (4–8px). Sidebar navy oscuro como capa "más profunda".

## Componentes ya armados en Stitch (6 pantallas)

1. **Iniciar Sesión** — card glassmorphism sobre gradiente navy `#00030c → #101d33`, canvas de
   partículas animadas, logo de escudo metálico, toggle de password, spinner en submit.
2. **Dashboard Principal (Executive)** — sidebar 260px navy, top app bar sticky, 4 KPIs
   (Empleados Activos 128, Incapacidades, Vacaciones, Incidencias), bento grid (contratos por
   vencer, incidencias recientes con dots glow, cumpleaños del mes), mapa de distribución por zona.
   Bottom-nav móvil + FAB "Nuevo Reporte".
3. **Expediente Digital** — header de empleado con foto, status chip ACTIVO, metadatos
   (ID, ingreso, antigüedad, supervisor), tabs de documentos.
4. **Vacaciones e Incidencias** — panel operativo con toggle "Mis Solicitudes / Calendario",
   lista de solicitudes.
5. **Perfil del Empleado** — datos personales y laborales.
6. **Firma Digital** — flujo de firma de documentos laborales.

### Navegación implícita del producto (sidebar)

`Dashboard · Empleados · Expedientes · Contratos · Incidencias · Incapacidades · Vacaciones ·
Actas Administrativas · Configuración`

## Cómo se traduce a la demo de 3 modos

- **Público:** héroe cinematográfico, features (expediente digital, control de incidencias,
  firma digital, geolocalización de personal), precios por tamaño de plantilla, casos de éxito
  con métricas de seguridad privada, contacto.
- **Usuario (el guardia):** dashboard personal (próximo turno, días de vacaciones, mi expediente),
  solicitar vacaciones, reportar incidencia, firmar documentos, historial, notificaciones.
- **Admin (RRHH/Director):** dashboard ejecutivo con KPIs, gestión de empleados (CRUD),
  gestión de incidencias, gestión de contratos, reportes con export CSV, configuración por tabs,
  equipo/roles.

La paleta navy/security-blue, Inter, los status chips y el sidebar 260px se migran 1:1 al
design system de la demo (`/lib/design-tokens.ts` + Tailwind v4 theme en `globals.css`).
