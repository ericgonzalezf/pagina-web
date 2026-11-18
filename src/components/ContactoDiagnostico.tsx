"use client";

import { useId, useState, type FormEvent } from "react";
import { Q_START } from "@/config/diagnostic";
import { datosDeVisita, track } from "@/lib/track";

// Formulario al final del diagnóstico: la persona deja su correo para recibir su resultado.
// Lo procesa /api/contacto (guarda el contacto, le manda su diagnóstico, avisa a Eric y, si
// aceptó, la da de alta en MailerLite).

type Estado = "listo" | "enviando" | "enviado" | "error";

const campo =
  "min-h-12 w-full rounded-[12px] border border-border-strong bg-surface-deep px-4 text-base text-foreground outline-none placeholder:text-dim focus:border-accent";

export default function ContactoDiagnostico({ ruta, respuestas }: { ruta: number; respuestas: (number | undefined)[] }) {
  const [estado, setEstado] = useState<Estado>("listo");
  const [mensaje, setMensaje] = useState("");
  const id = useId();

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando") return;
    const f = new FormData(e.currentTarget);
    const acepta = f.get("acepta") === "on";
    setEstado("enviando");
    setMensaje("");
    try {
      const r = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: f.get("nombre"),
          correo: f.get("correo"),
          whatsapp: f.get("whatsapp"),
          acepta_correos: acepta,
          sitio_web: f.get("sitio_web"),
          ruta,
          respuestas,
          ...datosDeVisita(),
        }),
      });
      const data = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!r.ok || !data.ok) {
        setEstado("error");
        setMensaje(
          data.error === "correo"
            ? "Revisa tu correo: parece que le falta algo."
            : data.error === "demasiados"
              ? "Hubo muchos intentos seguidos. Espera un minuto y vuelve a intentarlo."
              : "No se pudo enviar. Intenta de nuevo en un momento o escríbeme por WhatsApp.",
        );
        return;
      }
      track("contacto_enviado", { ruta: Q_START.options[ruta], acepta });
      setEstado("enviado");
    } catch {
      setEstado("error");
      setMensaje("No se pudo enviar. Revisa tu conexión e intenta de nuevo.");
    }
  }

  if (estado === "enviado") {
    return (
      <div role="status" className="msg rounded-2xl border border-accent/50 bg-accent/[0.08] px-5 py-4 text-base leading-[1.6] text-foreground">
        Listo. Tu diagnóstico va en camino a tu correo; si no lo ves en unos minutos, revisa la carpeta
        de spam o promociones.
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-3.5 rounded-2xl border border-border bg-surface-deep/60 p-5" noValidate>
      <div className="flex flex-col gap-1">
        <div className="text-lg font-semibold text-foreground">¿Prefieres recibirlo por correo?</div>
        <div className="text-[15px] leading-[1.5] text-muted">
          Te mando tu diagnóstico con tus respuestas y el siguiente paso, para que lo tengas a la mano.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm text-muted" htmlFor={`${id}-nombre`}>
          Tu nombre
          <input id={`${id}-nombre`} name="nombre" autoComplete="given-name" maxLength={60} className={campo} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-muted" htmlFor={`${id}-correo`}>
          Tu correo
          <input
            id={`${id}-correo`}
            name="correo"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            className={campo}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-muted sm:col-span-2" htmlFor={`${id}-whatsapp`}>
          Tu WhatsApp (opcional)
          <input
            id={`${id}-whatsapp`}
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            placeholder="10 dígitos"
            className={campo}
          />
        </label>
      </div>

      {/* Campo trampa para robots: las personas no lo ven ni lo llenan. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Sitio web
          <input name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-[15px] leading-[1.5] text-muted">
        <input name="acepta" type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]" />
        <span>
          También quiero recibir por correo consejos prácticos de IA y novedades de Eric. Puedo darme de baja
          cuando quiera.
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="btn btn-outline min-h-[50px] cursor-pointer rounded-full px-6 text-base disabled:opacity-60"
        >
          {estado === "enviando" ? "Enviando…" : "Mandármelo por correo"}
        </button>
        <span className="text-[13px] text-dim">
          Usamos tus datos según el{" "}
          <a href="/privacidad" className="underline underline-offset-2">
            aviso de privacidad
          </a>
          .
        </span>
      </div>

      {estado === "error" && (
        <div role="alert" className="text-[15px] text-foreground">
          {mensaje}
        </div>
      )}
    </form>
  );
}
