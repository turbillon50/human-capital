"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DemoUser } from "./demo-data/types";
import { demoUsers } from "./demo-data/marketing";

export type DemoMode = "publico" | "usuario" | "admin";

interface DemoState {
  mode: DemoMode;
  user: DemoUser | null;
  setMode: (mode: DemoMode) => void;
  /** Fake login: pick the demo identity based on the email entered. */
  signIn: (email: string) => DemoMode;
  signOut: () => void;
}

/** Landing route for each mode — used by the global DemoModeSwitcher. */
export const modeHome: Record<DemoMode, string> = {
  publico: "/",
  usuario: "/app",
  admin: "/admin",
};

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      mode: "publico",
      user: null,
      setMode: (mode) => set({ mode }),
      signIn: (email) => {
        const isAdmin =
          email.toLowerCase().startsWith("admin@") ||
          email.toLowerCase().endsWith("@demo.com");
        const mode: DemoMode = isAdmin ? "admin" : "usuario";
        set({ mode, user: isAdmin ? demoUsers.admin : demoUsers.usuario });
        return mode;
      },
      signOut: () => set({ mode: "publico", user: null }),
    }),
    {
      name: "san-antonio-demo",
      partialize: (s) => ({ mode: s.mode, user: s.user }),
    },
  ),
);
