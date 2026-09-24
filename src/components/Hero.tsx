import Image from "next/image";
import { site } from "@/config/site";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="glow left-1/2 top-24 h-72 w-72 -translate-x-1/2 bg-accent md:h-96 md:w-96" />
      <div className="glow bottom-0 right-0 h-72 w-72 bg-accent-2" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 font-mono text-sm text-accent-2">{site.handle}</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-gradient">{site.tagline}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{site.subtagline}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
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

        <div className="mx-auto">
          <div className="relative h-64 w-64 sm:h-80 sm:w-80">
            <div className="glow inset-0 h-full w-full bg-accent" />
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-border shadow-2xl">
              <Image
                src="/images/eric.webp"
                alt="Eric González"
                fill
                priority
                sizes="(min-width: 640px) 320px, 256px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
