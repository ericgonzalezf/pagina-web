import { about } from "@/config/site";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="sobre-mi" className="relative border-t border-border py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <Reveal>
          <span className="font-mono text-sm text-accent">01 · {about.heading}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Nunca es tarde para empezar.
          </h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface/70 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 font-mono text-xs text-muted">~/eric</span>
            </div>

            <div className="space-y-3 p-6 font-mono text-sm leading-relaxed">
              <p className="text-muted">
                <span className="text-accent">$</span> quien-soy
              </p>
              <p className="pl-4 text-foreground">
                Eric — 25 años emprendiendo, IA después de los 40
              </p>

              <p className="pt-2 text-muted">
                <span className="text-accent">$</span> que-hago
              </p>
              <p className="pl-4 text-foreground">
                Te enseño IA y la aplico en tu negocio
              </p>

              <p className="pt-2 text-muted">
                <span className="text-accent">$</span> mision
              </p>
              <p className="pl-4 text-foreground">
                &ldquo;Nunca es tarde. IA para todos — caminemos juntos.&rdquo;
              </p>

              <p className="pt-2 text-muted">
                <span className="text-accent">$</span>
                <span className="cursor-blink" />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
