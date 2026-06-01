"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          classNames: {
            toast:
              "!bg-surface !border !border-outline-variant !text-on-surface !rounded-xl !shadow-lg",
            description: "!text-on-surface-variant",
          },
        }}
      />
    </ThemeProvider>
  );
}
