import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignForm } from "@/components/auth/sign-form";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Crea tu cuenta de San Antonio HCM y digitaliza a tu personal de seguridad.",
};

export default function SignUpPage() {
  return (
    <AuthShell
      title="Crea tu cuenta"
      subtitle="Empieza tu prueba gratuita de 14 días"
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/sign-in" className="font-semibold text-secondary-container hover:underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <SignForm mode="up" />
    </AuthShell>
  );
}
