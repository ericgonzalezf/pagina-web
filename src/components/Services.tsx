import { services } from "@/config/site";
import { icons } from "@/components/icons";

export default function Services() {
  return (
    <section id="servicios" className="relative border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <span className="font-mono text-sm text-accent-2">02 · Servicios</span>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          En qué puedo ayudarte
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-border bg-surface/60 p-8 transition-colors hover:border-accent/60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-accent-2 transition-colors group-hover:border-accent group-hover:text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-medium">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
