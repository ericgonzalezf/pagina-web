import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import Footer from "@/components/Footer";
import CopyBlock from "@/components/CopyBlock";

// Guía gratis que se entrega por DM (automatización VIDEO de ManyChat en Instagram y TikTok).
// Es la versión web del PDF public/guias/videos-animados-con-claude.pdf: si cambias el texto
// aquí, cámbialo también en el PDF para que digan lo mismo.

const title = "Cómo hacer videos animados con Claude";
const description =
  "Guía gratis paso a paso: sin grabarte, sin saber animar y sin programar. Le pides el video con un mensaje y te entrega el MP4.";

export const metadata: Metadata = {
  title: `${title} | Guía gratis de ${site.name}`,
  description,
  alternates: { canonical: "/guias/videos-animados" },
  openGraph: {
    title,
    description,
    url: "/guias/videos-animados",
    siteName: site.name,
    locale: "es_ES",
    type: "article",
  },
  twitter: { card: "summary_large_image", title, description },
};

const primerMensaje = `Quiero hacer un video animado con Remotion en esta carpeta.
No sé programar: instala lo que haga falta y explícame en palabras simples.

Video: [Reel vertical de 30 segundos]
Tema: [3 consejos para ahorrar en el súper]
Para quién: [mamás que trabajan]
Estilo: [fondo oscuro, letras grandes, movimientos suaves]
Cierre: [Sígueme para más consejos]

Antes de animar, muéstrame el guion escena por escena para aprobarlo.
Al final, entrégame el video en MP4.`;

const necesitas = [
  ["Plan de pago de Claude", "Pro o Max (también Team o Enterprise). El plan gratis no incluye Claude Code."],
  ["Computadora", "Windows o Mac. Desde el celular solo revisas el resultado."],
  ["App de Claude para escritorio", "Ahí está la pestaña Code: es Claude Code sin usar terminal."],
  [
    "Remotion",
    "Gratis para personas, organizaciones sin fines de lucro y empresas de hasta 3 empleados; las más grandes pagan licencia.",
  ],
  ["30 minutos", "La primera vez. Los siguientes videos salen más rápido."],
];

const errores = [
  ["Mucho texto en pantalla", "Una idea por escena, máximo 7 palabras."],
  ["Pedir “hazlo bonito”", "Describe colores, ritmo y un ejemplo de lo que te gusta."],
  ["Datos inventados", "Dale tú las cifras reales y pídele que no invente ninguna."],
  ["No revisar en el celular", "Mira la vista previa en tamaño celular antes de exportar."],
];

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border py-10 sm:py-12">
      <div className="font-mono text-sm text-accent">{n}</div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

function Note({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-accent/35 bg-accent/[0.07] px-5 py-4 text-[16px] leading-relaxed">
      <span className="font-semibold text-accent">{label}</span> {children}
    </div>
  );
}

function Pairs({ head, rows }: { head: [string, string]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 bg-surface px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted">
        <span>{head[0]}</span>
        <span>{head[1]}</span>
      </div>
      {rows.map(([a, b]) => (
        <div
          key={a}
          className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 border-t border-border px-4 py-3.5 text-[15px] leading-snug"
        >
          <span className="font-semibold text-foreground">{a}</span>
          <span className="text-muted">{b}</span>
        </div>
      ))}
    </div>
  );
}

export default function GuiaVideosAnimados() {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-[760px] items-center px-5 py-3">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-2.5 font-mono text-base font-semibold !text-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            <span>
              eric<span className="text-accent">gonzalezf</span>.com
            </span>
          </Link>
        </div>
      </header>

      <main className="sec-hero">
        <article className="mx-auto w-full max-w-[760px] px-5">
          {/* Portada */}
          <div className="pb-10 pt-12 sm:pt-16">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span className="text-accent">●</span> Guía gratis
            </div>
            <h1 className="mt-4 text-[40px] font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              Cómo hacer <span className="text-brand">videos animados</span> con Claude
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
              Sin grabarte, sin saber animar y sin programar. Le pides el video con un mensaje y te entrega el MP4.
            </p>
            <p className="mt-6 text-sm text-dim">
              Por <span className="text-foreground">{site.name}</span> · {site.tagline}
            </p>
          </div>

          <Section n="01" title="Qué vas a lograr">
            <p>
              Vas a pedirle a Claude un video animado con un mensaje y recibir un archivo MP4 listo para Reels, anuncios o
              presentaciones.
            </p>
            <p>
              No es una IA que inventa video. Claude escribe el código que dibuja cada cuadro: textos, formas, gráficas,
              íconos y movimiento. Por eso puedes cambiar una frase o un color sin rehacer todo, y el resultado se ve limpio
              y con tu marca.
            </p>
            <p>
              La herramienta que lo convierte en video se llama <strong>Remotion</strong>. No necesitas saber programar:
              Claude la instala y la usa por ti.
            </p>
            <Note label="Dato:">el video donde viste esta guía se hizo exactamente con este método.</Note>
          </Section>

          <Section n="02" title="Lo que necesitas">
            <Pairs head={["Qué", "Detalle"]} rows={necesitas} />
          </Section>

          <Section n="03" title="Paso 1 · Prepara tu espacio">
            <ol className="list-decimal space-y-2 pl-6 marker:text-accent">
              <li>
                Descarga la app de Claude para escritorio desde <strong>claude.com/download</strong> e inicia sesión con tu
                cuenta de pago.
              </li>
              <li>
                Crea una carpeta vacía en tu computadora, por ejemplo <strong>Mis videos</strong>.
              </li>
              <li>
                En la app, entra a la pestaña <strong>Code</strong> y elige esa carpeta como lugar de trabajo.
              </li>
              <li>Todo lo que Claude cree (código, escenas y videos) quedará dentro de esa carpeta.</li>
            </ol>
            <p>
              Cuando Claude quiera instalar algo o crear archivos, te pedirá permiso. Léelo y acepta solo lo que tenga que
              ver con tu video.
            </p>
          </Section>

          <Section n="04" title="Paso 2 · Tu primer mensaje">
            <p>
              Copia este mensaje, cambia lo que está entre corchetes y mándalo en la pestaña <strong>Code</strong>:
            </p>
            <CopyBlock text={primerMensaje} />
            <p>
              Claude te mostrará el guion primero. Corrígelo ahí mismo con tus palabras; cuando te guste, escribe{" "}
              <strong>“adelante”</strong>.
            </p>
          </Section>

          <Section n="05" title="Paso 3 · Revisa y pide cambios">
            <p>
              Claude puede abrirte una vista previa para ver el video antes de exportarlo. Míralo completo y pide cambios
              como si hablaras con un editor:
            </p>
            <ul className="space-y-2 border-l-2 border-accent/50 pl-4 italic text-muted">
              <li>“La escena 2 va muy rápido, dale un segundo más.”</li>
              <li>“Cambia el título a: Ahorra sin dejar de comer rico.”</li>
              <li>“Las letras se ven chicas en el celular, hazlas más grandes.”</li>
              <li>“Quita la gráfica y pon tres íconos.”</li>
            </ul>
            <p>
              Solo cambia lo que pediste; el resto se queda igual. Cuando esté listo, escribe{" "}
              <strong>“exporta el MP4”</strong> y el archivo aparece en tu carpeta.
            </p>
          </Section>

          <Section n="06" title="Paso 4 · Ponle tu marca y tu voz">
            <ul className="space-y-3">
              <li>
                <strong className="text-accent">Tus colores:</strong> dale los códigos de color de tu marca (por ejemplo
                #FF8A1F) o una captura de tu logo, y pídele que los use en todas las escenas.
              </li>
              <li>
                <strong className="text-accent">Tu letra:</strong> dile el nombre de tu tipografía; si es de Google Fonts,
                Claude la agrega sola.
              </li>
              <li>
                <strong className="text-accent">Tu logo:</strong> guárdalo en la carpeta (PNG o SVG) y pídele que aparezca
                al inicio o al cierre.
              </li>
              <li>
                <strong className="text-accent">Tu voz:</strong> graba el guion en audio, frase por frase y con una pausa
                entre cada una. Guárdalo en la carpeta y pídele que sincronice las escenas con tu voz y ponga subtítulos
                palabra por palabra.
              </li>
            </ul>
            <Note label="Truco:">
              cuando un video te guste, dile “guarda este estilo como plantilla”. El siguiente lo pides en un solo mensaje.
            </Note>
          </Section>

          <Section n="07" title="4 errores que arruinan el video">
            <Pairs head={["Error", "Mejor así"]} rows={errores} />
          </Section>

          <Section n="08" title="Ideas para tu primer video">
            <ul className="space-y-3">
              <li>
                <strong className="text-accent">Anuncio de tu negocio:</strong> una promoción de 20 segundos con tu precio
                y “Escríbeme por WhatsApp”.
              </li>
              <li>
                <strong className="text-accent">Explicativo de tu servicio:</strong> qué haces, para quién y cómo
                contratarte, en 45 segundos.
              </li>
              <li>
                <strong className="text-accent">Reel educativo:</strong> 3 consejos de tu tema, sin salir a cámara.
              </li>
            </ul>
            <Note label="Empieza poco a poco:">
              tu primer video de 15 segundos. No busques que salga perfecto; busca que salga, y luego pídele cambios.
            </Note>
          </Section>

          {/* Cierre */}
          <section className="border-t border-border pb-16 pt-12 text-center">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span className="text-accent">●</span> Tu siguiente paso
            </div>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              <span className="text-brand">Nunca es tarde</span>
              <br />
              para empezar.
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed text-muted">
              Cuando domines lo básico se puede ir mucho más lejos: plantillas con tu marca, videos con tu voz y cortes de
              cámara, y un sistema para sacar varios videos por semana.
            </p>
            <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed text-muted">
              Si quieres que te ayude a hacerlo en tu negocio, escríbeme.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={site.social.instagram}
                className="btn btn-primary inline-flex min-h-12 w-full items-center justify-center rounded-full px-7 sm:w-auto"
              >
                Sígueme en Instagram
              </a>
              <a
                href={site.social.tiktok}
                className="btn btn-ghost inline-flex min-h-12 w-full items-center justify-center rounded-full px-7 sm:w-auto"
              >
                Sígueme en TikTok
              </a>
            </div>
            <p className="mt-6 text-sm text-dim">
              <Link href="/">{site.domain}</Link> · {site.handle}
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
