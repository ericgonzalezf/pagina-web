"use client";

import { useState } from "react";
import { nav, site } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center gap-2 font-mono text-lg font-semibold tracking-tight">
          <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent-2" />
          eric<span className="text-gradient">gonzalez.ia</span>
        </a>

        <nav className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-accent to-accent-2 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${site.email}`}
          className="hidden rounded-full border border-border px-4 py-2 font-mono text-sm transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_20px_-8px_var(--accent)] md:inline-block"
        >
          Contáctame
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-4 bg-foreground transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-4 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-3 h-px w-4 bg-foreground transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-sm text-muted hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
