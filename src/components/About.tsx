import Container from "@/components/Container";
import Terminal from "@/components/Terminal";

export default function About() {
  return (
    <section id="sobre-mi" className="sec-about border-b border-border">
      <Container className="flex flex-wrap items-center gap-x-16 gap-y-12 py-20 md:py-28">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-[22px]">
          <div className="font-mono text-sm text-accent">01 · Sobre mí</div>
          <h2 className="m-0 text-[clamp(38px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground">
            Nunca es tarde
            <br />
            para empezar.
          </h2>
          <p className="m-0 text-lg leading-[1.65] text-muted">
            Soy Eric González. Empecé con la inteligencia artificial después de los 40, con 25 años
            de emprendedor encima. Sé lo que se siente pensar que la IA no es para ti.
          </p>
          <p className="m-0 text-lg leading-[1.65] text-muted">
            Por eso enseño IA sin tecnicismos y la aplico en negocios reales: para que trabajes
            menos, vendas más y{" "}
            <span className="text-foreground">te sientas parte del cambio, no víctima de él.</span>
          </p>
        </div>

        <Terminal />
      </Container>
    </section>
  );
}
