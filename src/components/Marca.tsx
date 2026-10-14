import { MARCA_GRATIS_EN_APP, PRECIO_ESTRATEGIA, site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { IconArrow } from "@/components/icons";
import Container from "@/components/Container";

const pasos = [
  "Responde unas preguntas sobre ti",
  "La IA analiza tu perfil",
  "Recibe el resumen de tu marca en tu correo",
];

const tonos = ["Cercano", "Experto", "Inspirador"];

const ideas = [
  "3 tareas que la IA te puede quitar esta semana",
  "Empecé con IA después de los 40: lo que aprendí",
  "Antes y después: un negocio atendiendo WhatsApp con IA",
];

// Mientras la app no tenga versión gratuita, "gratis" se pide por WhatsApp.
const gratisHref = MARCA_GRATIS_EN_APP
  ? site.marcaUrl
  : waLink("Hola Eric, quiero mi resumen de marca personal gratis.");
const gratisLabel = MARCA_GRATIS_EN_APP ? "Descubre tu marca gratis" : "Quiero mi resumen gratis";

const tierTitle = "m-0 text-[22px] font-bold text-foreground";
const tierLabel = "font-mono text-[15px] text-accent";
const tierDesc = "m-0 text-base leading-[1.55] text-muted";
const tierBtn = "btn mt-auto inline-flex min-h-[46px] items-center gap-2 self-start rounded-full px-[22px] text-[15px]";

export default function Marca() {
  return (
    <section id="marca" className="sec-marca overflow-hidden border-y border-border">
      <Container className="flex flex-col gap-16 py-20 md:py-28">
        <div className="flex flex-wrap items-center gap-x-14 gap-y-12">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-[22px]">
            <div className="font-mono text-sm text-accent">03 · Herramienta</div>
            <h2 className="m-0 text-[clamp(38px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground">
              Descubre tu marca personal <span className="text-brand [--tg-blur:20px]">con IA.</span>
            </h2>
            <p className="m-0 text-lg leading-[1.65] text-muted">
              Mi creador de marca personal te hace unas preguntas sobre ti y, al momento, te entrega
              el resumen de tu marca:{" "}
              <span className="text-foreground">
                tu propuesta de valor, tu tono y tus primeras ideas de contenido.
              </span>
            </p>

            <ol className="m-0 flex list-none flex-col gap-3.5 p-0 py-1.5">
              {pasos.map((paso, i) => (
                <li key={paso} className="flex items-center gap-3.5 text-base text-foreground">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/60 font-mono text-[13px] text-accent shadow-[0_0_12px_rgba(255,138,31,0.2)]">
                    {i + 1}
                  </span>
                  {paso}
                </li>
              ))}
            </ol>

            <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2">
              <a
                href={gratisHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex min-h-[54px] items-center gap-2.5 rounded-full px-7 text-base"
              >
                {gratisLabel}
                <IconArrow className="h-[18px] w-[18px]" strokeWidth={2.4} />
              </a>
              <a
                href={site.marcaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-[15px] text-foreground underline decoration-accent/60 underline-offset-4"
              >
                ¿Ya tienes tu código? Entra aquí
              </a>
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_400px] justify-center">
            <div className="relative w-[420px] max-w-full">
              <div
                aria-hidden="true"
                className="absolute inset-[24px_-4px_-12px_24px] rotate-3 rounded-[20px] border border-border bg-surface sm:inset-[24px_-16px_-16px_24px]"
              />
              <div className="relative flex flex-col gap-5 rounded-[20px] border border-accent/50 bg-[linear-gradient(180deg,#17110b,#0f0b08)] p-6 max-md:shadow-[0_0_20px_rgba(255,138,31,0.14),0_20px_40px_rgba(0,0,0,0.45)] shadow-[0_0_40px_rgba(255,138,31,0.18),0_40px_80px_rgba(0,0,0,0.5)] sm:p-[30px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                      Resumen de marca
                    </div>
                    <div className="text-xl font-bold text-foreground">Eric González</div>
                  </div>
                  <div className="rounded-full border border-border-strong px-2.5 py-[5px] font-mono text-[11px] text-muted">
                    ejemplo
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="flex flex-col gap-2">
                  <div className="font-mono text-xs text-muted">Propuesta de valor</div>
                  <div className="text-base leading-normal text-foreground">
                    &quot;Ayudo a personas y negocios que sienten que la IA no es para ellos a usarla
                    sin tecnicismos.&quot;
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="font-mono text-xs text-muted">Tu tono</div>
                  <div className="flex flex-wrap gap-2">
                    {tonos.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-accent/55 px-3 py-1.5 text-[13px] text-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="font-mono text-xs text-muted">Ideas de contenido</div>
                  {ideas.map((idea, i) => (
                    <div
                      key={idea}
                      className="flex items-start gap-2.5 text-sm leading-[1.45] text-foreground"
                    >
                      <span className="font-mono text-accent">{`0${i + 1}`}</span>
                      {idea}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="card flex flex-col gap-3.5 rounded-[20px] bg-surface-deep p-8">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className={tierTitle}>Descubre tu marca</h3>
              <span className={tierLabel}>Gratis</span>
            </div>
            <p className={tierDesc}>
              Cuestionario corto y resumen de tu marca: propuesta de valor, tono y 3 ideas de
              contenido.
            </p>
            <a href={gratisHref} target="_blank" rel="noopener noreferrer" className={`${tierBtn} btn-outline`}>
              Empezar gratis
            </a>
          </div>

          <div className="card card-featured flex flex-col gap-3.5 rounded-[20px] p-8">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className={tierTitle}>Estrategia completa</h3>
              <span className={tierLabel}>{PRECIO_ESTRATEGIA}</span>
            </div>
            <p className={tierDesc}>
              El cuestionario completo y tu estrategia de marca personal detallada, lista para
              aplicar. Recibes tu código de acceso.
            </p>
            <a
              href={waLink("Hola Eric, quiero mi código para la Estrategia de Marca Personal completa.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`${tierBtn} btn-primary`}
            >
              Quiero mi código
            </a>
          </div>

          <div className="card flex flex-col gap-3.5 rounded-[20px] bg-surface-deep p-8 md:col-span-2 lg:col-span-1">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className={tierTitle}>Tu marca conmigo</h3>
              <span className={tierLabel}>1 a 1</span>
            </div>
            <p className={tierDesc}>
              Implementamos juntos tu estrategia: perfil, contenido y presencia en redes, paso a
              paso.
            </p>
            <a
              href={waLink("Hola Eric, me interesa: Tu marca conmigo (1 a 1).")}
              target="_blank"
              rel="noopener noreferrer"
              className={`${tierBtn} btn-outline`}
            >
              Me interesa
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
