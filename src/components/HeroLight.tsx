"use client";

import { useEffect, useRef } from "react";

// Luz que sigue al cursor. Solo con puntero fino (mouse) y sin reduced-motion;
// en pantallas táctiles se queda fija en su posición por defecto (CSS).
export default function HeroLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      x = Math.round(e.clientX - r.left);
      y = Math.round(e.clientY - r.top);
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--lx", `${x}px`);
        el.style.setProperty("--ly", `${y}px`);
      });
    };

    section.addEventListener("pointermove", onMove);
    return () => {
      section.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="herolight pointer-events-none absolute inset-0" />;
}
