"use client";

import { useRef, useState } from "react";

// Bloque de texto con botón "Copiar". Si el navegador no deja usar el portapapeles
// (pasa en algunos navegadores dentro de apps), selecciona el texto para copiarlo a mano.
export default function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = preRef.current;
      if (!el) return;
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-surface-deep shadow-[0_0_24px_rgba(255,138,31,0.12)]">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Tu mensaje</span>
        <button
          type="button"
          onClick={copy}
          className="btn btn-primary inline-flex min-h-10 items-center rounded-full px-4 text-sm"
        >
          {copied ? "¡Copiado!" : "Copiar"}
        </button>
      </div>
      <pre
        ref={preRef}
        className="whitespace-pre-wrap break-words px-4 py-4 font-mono text-[14px] leading-relaxed text-foreground"
      >
        {text}
      </pre>
    </div>
  );
}
