import { about } from "@/config/site";

export default function About() {
  return (
    <section id="sobre-mi" className="relative border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <span className="font-mono text-sm text-accent-2">01 · {about.heading}</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Nunca es tarde para empezar.
        </h2>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
