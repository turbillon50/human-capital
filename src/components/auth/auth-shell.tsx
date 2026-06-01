import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthParticles } from "@/components/auth/particles";
import { ShieldMark } from "@/components/brand/logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-primary-container p-4">
      <AuthParticles />
      <Link
        href="/"
        className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-primary-fixed-dim transition-colors hover:bg-white/10 hover:text-on-primary"
      >
        <ArrowLeft className="size-4" /> Volver al inicio
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-7 flex flex-col items-center text-center">
          <ShieldMark className="size-16 drop-shadow-[0_0_20px_rgba(128,171,254,0.4)]" />
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-on-primary">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-primary-fixed-dim">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-primary/40 p-7 shadow-2xl backdrop-blur-xl">
          {children}
        </div>

        <div className="mt-6 text-center text-sm text-primary-fixed-dim">{footer}</div>
      </div>
    </div>
  );
}
