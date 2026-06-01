"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Lock, Mail, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useDemoStore, modeHome } from "@/lib/store";
import { delay } from "@/lib/utils";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.6 5.1C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-.8 2.1-2.2 3.9-4 5.2l6.3 5.3C41.4 36.2 44 30.6 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-white" aria-hidden="true">
      <path d="M16.36 12.78c.02 2.5 2.2 3.33 2.22 3.34-.02.06-.35 1.2-1.15 2.38-.69 1.02-1.4 2.03-2.53 2.05-1.1.02-1.46-.65-2.72-.65-1.26 0-1.66.63-2.7.67-1.08.04-1.9-1.1-2.6-2.12-1.42-2.07-2.51-5.85-1.05-8.4.72-1.27 2.02-2.07 3.42-2.09 1.07-.02 2.08.72 2.73.72.65 0 1.88-.89 3.17-.76.54.02 2.05.22 3.02 1.64-.08.05-1.8 1.05-1.78 3.13zM14.3 5.39c.58-.7.97-1.67.86-2.64-.83.03-1.85.55-2.45 1.25-.54.62-1.01 1.61-.88 2.56.93.07 1.88-.47 2.47-1.17z" />
    </svg>
  );
}

export function SignForm({ mode }: { mode: "in" | "up" }) {
  const router = useRouter();
  const signIn = useDemoStore((s) => s.signIn);
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState<"" | "form" | "google" | "apple">("");

  async function authenticate(email: string, source: "form" | "google" | "apple") {
    setLoading(source);
    await delay(800);
    const targetMode = signIn(email);
    setLoading("");
    toast.success(mode === "in" ? "Sesión iniciada" : "Cuenta creada", {
      description:
        targetMode === "admin"
          ? "Bienvenida, Sofía. Entrando al panel administrativo."
          : "Bienvenido, Mateo. Entrando a tu portal.",
    });
    router.push(modeHome[targetMode]);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Correo inválido", { description: "Revisa el formato de tu correo." });
      return;
    }
    if (password.length < 4) {
      toast.error("Contraseña muy corta", {
        description: "Debe tener al menos 4 caracteres.",
      });
      return;
    }
    if (password === "fail" || password === "error") {
      setLoading("form");
      await delay(800);
      setLoading("");
      toast.error("Credenciales incorrectas", {
        description: "El usuario o la contraseña no coinciden. Inténtalo de nuevo.",
      });
      return;
    }
    await authenticate(email, "form");
  }

  return (
    <div className="space-y-5">
      <form onSubmit={onSubmit} className="space-y-4">
        {mode === "up" && (
          <div className="space-y-1.5">
            <Label htmlFor="nombre" className="text-primary-fixed-dim">
              Nombre completo
            </Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Sofía Hernández"
              className="border-white/15 bg-primary-container/60 text-on-primary placeholder:text-primary-fixed-dim/40 focus-visible:border-secondary-container"
            />
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-primary-fixed-dim">
            Correo electrónico
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary-fixed-dim/60" strokeWidth={1.75} />
            <Input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={mode === "in" ? "admin@sanantonio.mx" : ""}
              placeholder="usuario@empresa.com"
              className="border-white/15 bg-primary-container/60 pl-10 text-on-primary placeholder:text-primary-fixed-dim/40 focus-visible:border-secondary-container"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-primary-fixed-dim">
            Contraseña
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary-fixed-dim/60" strokeWidth={1.75} />
            <Input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              required
              defaultValue={mode === "in" ? "demo1234" : ""}
              placeholder="••••••••"
              className="border-white/15 bg-primary-container/60 px-10 text-on-primary placeholder:text-primary-fixed-dim/40 focus-visible:border-secondary-container"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-fixed-dim/60 hover:text-on-primary"
              aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {mode === "in" && (
          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-primary-fixed-dim">
              <input type="checkbox" className="size-4 rounded border-white/20 bg-primary-container/60 accent-secondary-container" />
              Recordarme
            </label>
            <button type="button" className="text-secondary-container hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={loading !== ""}>
          {loading === "form" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              {mode === "in" ? "Ingresando…" : "Creando cuenta…"}
            </>
          ) : (
            <>
              {mode === "in" ? "Ingresar" : "Crear cuenta"}
              {mode === "in" ? <LogIn className="size-4" /> : <UserPlus className="size-4" />}
            </>
          )}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-primary-fixed-dim">o continúa con</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="glass"
          onClick={() => authenticate("usuario@sanantonio.mx", "google")}
          disabled={loading !== ""}
        >
          {loading === "google" ? (
            <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <GoogleMark />
          )}
          Google
        </Button>
        <Button
          variant="glass"
          onClick={() => authenticate("usuario@sanantonio.mx", "apple")}
          disabled={loading !== ""}
        >
          {loading === "apple" ? (
            <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <AppleMark />
          )}
          Apple
        </Button>
      </div>

      <p className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-center text-xs leading-relaxed text-primary-fixed-dim">
        <strong className="text-on-primary">Demo:</strong> usa cualquier correo + contraseña (4+
        caracteres). Un correo <code className="text-secondary-container">admin@…</code> o{" "}
        <code className="text-secondary-container">@demo.com</code> entra como administrador; el
        resto como usuario.
      </p>
    </div>
  );
}
