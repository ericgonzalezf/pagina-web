import Container from "@/components/Container";

const pasos = [
  {
    title: "Platicamos",
    desc: "Me cuentas tu negocio y qué te quita más tiempo. Sin compromiso y sin palabras raras.",
  },
  {
    title: "Te propongo un plan",
    desc: "Qué conviene hacer primero, cuánto cuesta y qué resultado esperar.",
  },
  {
    title: "Lo hacemos juntos",
    desc: "Lo implemento, te enseño a usarlo y te acompaño hasta que funcione solo.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="sec-proceso border-y border-border">
      <Container className="flex flex-col gap-14 py-20 md:py-28">
        <div className="flex max-w-[720px] flex-col gap-[18px]">
          <div className="font-mono text-sm text-accent">05 · Cómo trabajo</div>
          <h2 className="m-0 text-[clamp(38px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground">
            Simple, claro y a tu ritmo.
          </h2>
        </div>

        <ol className="m-0 grid list-none grid-cols-1 gap-10 p-0 md:grid-cols-3">
          {pasos.map((p, i) => (
            <li
              key={p.title}
              className={`flex flex-col gap-3.5 border-t-2 pt-6 ${
                i === 0
                  ? "border-accent shadow-[0_-10px_18px_-14px_rgba(255,138,31,0.9)]"
                  : "border-border-strong"
              }`}
            >
              <div className={`font-mono text-[15px] ${i === 0 ? "text-accent" : "text-muted"}`}>
                {`0${i + 1}`}
              </div>
              <h3 className="m-0 text-2xl font-semibold text-foreground">{p.title}</h3>
              <p className="m-0 text-[17px] leading-[1.6] text-muted">{p.desc}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
