import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { DemoModeSwitcher } from "@/components/demo-mode-switcher";
import { PwaRegister } from "@/components/pwa-register";
import { brand } from "@/lib/design-tokens";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["600", "700", "800"],
});

const SITE_URL = brand.url;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "San Antonio HCM — Sistema operativo para tu fuerza de seguridad",
    template: "%s · San Antonio HCM",
  },
  description:
    "Plataforma de capital humano para empresas de seguridad privada: expediente digital, control de incidencias, firma digital, vacaciones y reportes ejecutivos. Todo tu personal de campo en un solo panel.",
  keywords: [
    "software seguridad privada",
    "gestión de guardias",
    "expediente digital",
    "RRHH seguridad",
    "control de incidencias",
    "HCM México",
  ],
  authors: [{ name: brand.legalName }],
  applicationName: brand.name,
  icons: {
    icon: [
      { url: "/icons/192", sizes: "192x192", type: "image/png" },
      { url: "/icons/512", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/192", sizes: "192x192", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: brand.name,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: brand.name,
    title: "San Antonio HCM — El sistema operativo de tu fuerza de seguridad",
    description:
      "Expediente digital, incidencias, firma digital y reportes ejecutivos para empresas de seguridad privada.",
  },
  twitter: {
    card: "summary_large_image",
    title: "San Antonio HCM",
    description:
      "El sistema operativo de tu fuerza de seguridad privada. Demo interactiva.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: brand.themeColor },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e14" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.legalName,
  url: SITE_URL,
  description:
    "Plataforma HCM para empresas de seguridad privada: expediente digital, incidencias, firma digital y reportes.",
  address: { "@type": "PostalAddress", addressCountry: "MX", addressLocality: "Ciudad de México" },
  sameAs: [SITE_URL],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <Providers>
          {children}
          <DemoModeSwitcher />
          <PwaRegister />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
