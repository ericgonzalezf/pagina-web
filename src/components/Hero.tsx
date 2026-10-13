import Image from "next/image";
import { site } from "@/config/site";
import { waLink, WA_SALUDO } from "@/lib/whatsapp";
import { IconWhatsApp } from "@/components/icons";
import Container from "@/components/Container";
import HeroLight from "@/components/HeroLight";

const corner =
  "absolute h-11 w-11 border-accent-highlight [filter:drop-shadow(0_0_6px_rgba(255,138,31,0.9))]";

const floatLabel =
  "absolute flex items-center gap-2 rounded-full border border-accent/55 bg-surface/90 px-3.5 py-2 font-mono text-[13px] text-foreground shadow-[0_0_14px_rgba(255,138,31,0.22)]";

function Dot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`rounded-full bg-accent shadow-[0_0_6px_var(--accent)] ${className}`}
    />
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="sec-hero relative overflow-hidden">
      <HeroLight />

      <Container className="relative flex flex-wrap items-center gap-x-16 gap-y-14 pb-20 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-7">
          <div className="flex items-center gap-2.5 self-start rounded-full border border-accent/40 bg-surface/80 px-4 py-2 font-mono text-[13px] text-foreground shadow-[0_0_18px_rgba(255,138,31,0.12)]">
            <Dot className="h-[7px] w-[7px] shadow-[0_0_8px_var(--accent),0_0_0_4px_rgba(255,138,31,0.18)]" />
            Disponible para nuevos proyectos
          </div>

          <h1 className="m-0 text-[clamp(48px,7vw,88px)] font-bold leading-none tracking-[-0.04em] text-foreground">
            IA aplicada
            <br />
            <span className="text-brand">sin tecnicismos.</span>
          </h1>

          <p className="m-0 max-w-[520px] text-lg leading-[1.55] text-muted sm:text-xl">
            Te enseño a usar inteligencia artificial y la pongo a trabajar en tu negocio, en tu
            trabajo y en tu vida diaria.{" "}
            <span className="text-foreground">{site.subtagline}</span>
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={waLink(WA_SALUDO)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-[26px] text-base"
            >
              <IconWhatsApp className="h-5 w-5" />
              Escríbeme por WhatsApp
            </a>
            <a
              href="#diagnostico"
              className="btn btn-ghost inline-flex min-h-[52px] items-center rounded-full px-[26px] text-base"
            >
              Haz tu diagnóstico gratis
            </a>
          </div>

          <div className="flex items-center gap-3.5 pt-2 font-mono text-[13px] text-muted">
            <span className="h-px w-8 shrink-0 bg-accent shadow-[0_0_6px_var(--accent)]" />
            {site.trayectoria}
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_340px] justify-center">
          <div className="relative aspect-square w-[360px] max-w-full">
            <div className={`${corner} left-0 top-0 rounded-tl-[14px] border-l-2 border-t-2`} />
            <div className={`${corner} right-0 top-0 rounded-tr-[14px] border-r-2 border-t-2`} />
            <div className={`${corner} bottom-0 left-0 rounded-bl-[14px] border-b-2 border-l-2`} />
            <div className={`${corner} bottom-0 right-0 rounded-br-[14px] border-b-2 border-r-2`} />

            <div className="absolute inset-[8%] overflow-hidden rounded-full border-2 border-accent bg-surface shadow-[0_0_0_1px_rgba(255,178,36,0.35),0_0_22px_rgba(255,138,31,0.55),0_0_70px_rgba(255,138,31,0.22),0_30px_70px_rgba(0,0,0,0.6)] max-sm:shadow-[0_0_0_1px_rgba(255,178,36,0.3),0_0_16px_rgba(255,138,31,0.4),0_0_44px_rgba(255,138,31,0.16),0_24px_50px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/foto-eric.webp"
                alt="Eric González"
                fill
                priority
                sizes="(min-width: 640px) 360px, 90vw"
                className="scale-[1.06] object-cover"
              />
            </div>

            <div className={`${floatLabel} right-0 top-[14%] sm:-right-[6%]`}>
              <Dot className="h-1.5 w-1.5" />
              IA
            </div>
            <div className={`${floatLabel} left-0 top-1/2 sm:-left-[10%]`}>
              <Dot className="h-1.5 w-1.5" />
              WhatsApp
            </div>
            <div className={`${floatLabel} bottom-[10%] right-0 sm:-right-[4%]`}>
              <Dot className="h-1.5 w-1.5" />
              Automatización
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
