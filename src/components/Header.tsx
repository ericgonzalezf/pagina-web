"use client";

import { useState } from "react";
import { nav } from "@/config/site";
import Container from "@/components/Container";

function Logo() {
  return (
    <a
      href="#inicio"
      className="flex min-h-11 items-center gap-2.5 font-mono text-lg font-semibold !text-foreground"
    >
      <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
      <span>
        eric<span className="text-accent">gonzalezf</span>.com
      </span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/[0.82] backdrop-blur-[14px]">
      <Container className="flex items-center justify-between gap-4 py-3 lg:py-[18px]">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="!text-muted hover:!text-foreground">
              {item.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="btn inline-flex min-h-11 items-center rounded-full border border-accent/55 px-5 font-medium !text-foreground shadow-[0_0_16px_rgba(255,138,31,0.15)] hover:border-accent"
          >
            Contáctame
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong lg:hidden"
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
      </Container>

      {open && (
        <nav
          id="menu-movil"
          aria-label="Principal"
          className="flex flex-col gap-1 border-t border-border px-6 py-3 lg:hidden"
        >
          {[...nav, { label: "Contáctame", href: "#contacto" }].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center rounded-lg px-2 text-[15px] !text-muted hover:bg-surface hover:!text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
