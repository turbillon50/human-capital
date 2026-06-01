import Link from "next/link";
import { WifiOff } from "lucide-react";
import { ShieldMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Sin conexión" };

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-container p-6 text-center">
      <ShieldMark className="size-16 opacity-90" />
      <span className="mt-6 grid size-12 place-items-center rounded-full bg-white/10 text-primary-fixed-dim">
        <WifiOff className="size-6" strokeWidth={1.5} />
      </span>
      <h1 className="mt-4 font-display text-2xl font-bold text-on-primary">Sin conexión</h1>
      <p className="mt-2 max-w-sm text-sm text-primary-fixed-dim">
        No hay internet en este momento. Tus reportes de campo se guardarán y se
        sincronizarán automáticamente cuando recuperes la señal.
      </p>
      <Button asChild variant="secondary" className="mt-6">
        <Link href="/">Reintentar</Link>
      </Button>
    </div>
  );
}
