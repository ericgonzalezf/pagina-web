"use client";

import { useEffect, useRef } from "react";

// Ejecuta `onStart` UNA sola vez cuando el elemento entra en pantalla.
// No hace nada con prefers-reduced-motion o sin IntersectionObserver: en esos casos el
// componente se queda en su estado final estático (el contenido siempre es visible).
// `onStart` puede devolver una función de limpieza (para cancelar temporizadores).
export function useStartOnView<T extends HTMLElement>(onStart: () => void | (() => void)) {
  const ref = useRef<T>(null);
  const startRef = useRef(onStart);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let cleanup: void | (() => void);
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        io.disconnect();
        cleanup = startRef.current();
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  return ref;
}

export function createTimers() {
  const ids: number[] = [];
  return {
    later(fn: () => void, ms: number) {
      ids.push(window.setTimeout(fn, ms));
    },
    clear() {
      ids.forEach((id) => window.clearTimeout(id));
      ids.length = 0;
    },
  };
}
