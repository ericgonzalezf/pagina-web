import { featuredServices, services, site } from "@/config/site";
import { icons } from "@/components/icons";
import Reveal from "@/components/Reveal";
import Container from "@/components/Container";

function whatsappLink(serviceTitle: string) {
  const message = `Hola Eric, vi tu página y me interesa: "${serviceTitle}". ¿Podemos platicar?`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default function Services() {
  return (
    <section id="servicios" className="relative border-t border-border py-24">
      <Container>
        <Reveal>
          <span className="font-mono text-sm text-accent">02 · Servicios</span>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            En qué puedo ayudarte
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Un catálogo completo para llevar tu negocio o tu marca personal a la era de la IA —
            de la idea a la implementación.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featuredServices.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <Reveal key={service.title} delay={i * 100} className="h-full">
                <div className="tech-card group flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border text-accent-2 transition-colors group-hover:border-accent group-hover:text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold leading-snug lg:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{service.description}</p>
                  <a
                    href={whatsappLink(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-fit items-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-transform hover:scale-105 hover:bg-accent-hover lg:mt-auto lg:self-start"
                  >
                    Me interesa
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16">
          <span className="font-mono text-sm text-muted">Más servicios</span>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <Reveal key={service.title} delay={(i % 3) * 100}>
                <div className="tech-card group h-full rounded-2xl border border-border bg-surface/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-accent-2 transition-colors group-hover:border-accent group-hover:text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-medium">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
