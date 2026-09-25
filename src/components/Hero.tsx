import Image from "next/image";
import { site } from "@/config/site";
import Marquee from "@/components/Marquee";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-24">
      <div className="glow left-1/2 top-24 h-72 w-72 -translate-x-1/2 bg-accent md:h-96 md:w-96" />
      <div className="glow bottom-0 right-0 h-72 w-72 bg-accent-2" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-muted">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent-2" />
            Disponible para nuevos proyectos
          </div>

          <p className="mb-4 font-mono text-sm text-accent-2">{site.handle}</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-gradient">{site.tagline}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{site.subtagline}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_-6px_var(--accent)] transition-transform hover:scale-105"
            >
              Hablemos de tu proyecto
            </a>
            <a
              href="#servicios"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Ver servicios
            </a>
          </div>
        </div>

        <div className="relative mx-auto">
          <div className="glow inset-0 h-full w-full bg-accent" />

          <div className="relative h-64 w-64 sm:h-80 sm:w-80">
            {/* HUD corner brackets */}
            <span className="absolute -left-3 -top-3 h-8 w-8 rounded-tl-2xl border-l-2 border-t-2 border-accent-2" />
            <span className="absolute -right-3 -top-3 h-8 w-8 rounded-tr-2xl border-r-2 border-t-2 border-accent-2" />
            <span className="absolute -bottom-3 -left-3 h-8 w-8 rounded-bl-2xl border-b-2 border-l-2 border-accent-2" />
            <span className="absolute -bottom-3 -right-3 h-8 w-8 rounded-br-2xl border-b-2 border-r-2 border-accent-2" />

            <div className="relative h-full w-full overflow-hidden rounded-full border border-border shadow-2xl">
              <Image
                src="/images/eric.webp"
                alt="Eric González"
                fill
                priority
                sizes="(min-width: 640px) 320px, 256px"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </div>

            <span className="absolute -right-6 top-6 flex items-center gap-1.5 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-xs shadow-lg backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> IA
            </span>
            <span className="absolute -left-8 bottom-16 flex items-center gap-1.5 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-xs shadow-lg backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" /> Web
            </span>
            <span className="absolute -right-4 bottom-2 flex items-center gap-1.5 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-xs shadow-lg backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Chatbots
            </span>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
