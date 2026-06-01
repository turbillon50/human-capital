import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignForm } from "@/components/auth/sign-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Accede a tu panel de gestión operativa de San Antonio HCM.",
};

export default function SignInPage() {
  return (
    <AuthShell
      title="Iniciar sesión"
      subtitle="Accede a tu panel de gestión operativa"
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link href="/sign-up" className="font-semibold text-secondary-container hover:underline">
            Solicita una demo
          </Link>
        </>
      }
    >
      <SignForm mode="in" />
    </AuthShell>
  );
}
