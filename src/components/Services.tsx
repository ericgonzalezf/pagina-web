import Container from "@/components/Container";
import ServicesTabs from "@/components/ServicesTabs";

export default function Services() {
  return (
    <section id="servicios">
      <Container className="flex flex-col gap-14 py-20 md:py-28">
        <div className="flex max-w-[720px] flex-col gap-[18px]">
          <div className="font-mono text-sm text-accent">02 · Servicios</div>
          <h2 className="m-0 text-[clamp(38px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground">
            En qué puedo ayudarte
          </h2>
          <p className="m-0 text-lg leading-[1.6] text-muted">
            Elige qué buscas hoy y te muestro por dónde empezar.
          </p>
        </div>

        <ServicesTabs />
      </Container>
    </section>
  );
}
