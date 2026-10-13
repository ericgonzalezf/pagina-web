"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  NEGOCIO_CARDS,
  NEGOCIO_FEATURED,
  SVC_CARDS,
  SVC_CONTEXT,
  SVC_TABS,
  TAMBIEN_TE_AYUDO,
} from "@/config/services";
import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { IconAprende, IconArrow, IconCheck, IconDiagnostico, IconYouTube } from "@/components/icons";
import ChatDemo from "@/components/ChatDemo";

const eyebrow = "font-mono text-sm text-accent";
const h3Card = "m-0 text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground";
const pCard = "m-0 text-[17px] leading-[1.6] text-muted";
const btnOutline =
  "btn btn-outline mt-auto inline-flex min-h-[46px] items-center gap-2 self-start rounded-full px-[22px] text-[15px]";

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-accent/50 bg-background text-accent shadow-[0_0_16px_rgba(255,138,31,0.18)]">
      {children}
    </div>
  );
}

function NegocioPanel() {
  const f = NEGOCIO_FEATURED;
  return (
    <div className="flex flex-col gap-14">
      <div className="card card-featured flex flex-col overflow-hidden rounded-3xl lg:flex-row">
        <div className="flex flex-col gap-[22px] p-7 sm:p-12 lg:flex-1">
          <div className="self-start rounded-full bg-accent px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-on-accent shadow-[0_0_16px_rgba(255,138,31,0.5)]">
            {f.badge}
          </div>
          <h3 className="m-0 text-[clamp(30px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground">
            {f.title}
          </h3>
          <p className="m-0 text-lg leading-[1.6] text-muted">{f.desc}</p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0 text-base text-foreground">
            {f.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <IconCheck className="h-5 w-5 shrink-0 text-accent" strokeWidth={2.4} />
                {b}
              </li>
            ))}
          </ul>
          <a
            href={waLink(`Hola Eric, me interesa: ${f.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex min-h-[50px] items-center gap-2 self-start rounded-full px-[26px] text-base"
          >
            Me interesa
          </a>
        </div>

        <div className="flex items-center justify-center border-t border-border bg-[radial-gradient(circle_at_50%_45%,rgba(255,138,31,0.14),rgba(0,0,0,0)_62%)] p-6 sm:p-10 lg:w-[420px] lg:border-l lg:border-t-0">
          <ChatDemo />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {NEGOCIO_CARDS.map((c) => (
          <div key={c.title} className="card flex flex-col gap-[18px] rounded-[22px] p-8 sm:p-10">
            <IconBox>
              {c.icon === "diagnostico" ? (
                <IconDiagnostico className="h-[26px] w-[26px]" />
              ) : (
                <IconAprende className="h-[26px] w-[26px]" />
              )}
            </IconBox>
            <h3 className={h3Card}>{c.title}</h3>
            <p className={pCard}>{c.desc}</p>
            <a
              href={waLink(`Hola Eric, me interesa: ${c.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className={btnOutline}
            >
              Me interesa
              <IconArrow className="h-4 w-4" strokeWidth={2.4} />
            </a>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <div className="font-mono text-sm text-muted">También te ayudo con</div>
        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {TAMBIEN_TE_AYUDO.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3.5 rounded-[14px] border border-border bg-surface-deep px-5 py-[18px] text-base text-foreground"
            >
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OtroPanel({ svc }: { svc: number }) {
  const cards = SVC_CARDS[svc];
  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => {
          const href = waLink(`Hola Eric, vi tu página y me interesa: ${c.title} (${SVC_CONTEXT[svc]}).`);
          const num = `0${i + 1}`;
          return c.featured ? (
            <div key={c.title} className="card card-featured flex flex-col gap-[18px] rounded-[22px] p-8 sm:p-10">
              <div className="flex items-center justify-between gap-3">
                <span className={eyebrow}>{num}</span>
                <span className="rounded-full bg-accent px-3 py-[5px] font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-on-accent shadow-[0_0_14px_rgba(255,138,31,0.5)]">
                  {c.badge}
                </span>
              </div>
              <h3 className={h3Card}>{c.title}</h3>
              <p className={pCard}>{c.desc}</p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-auto inline-flex min-h-12 items-center self-start rounded-full px-6 text-[15px]"
              >
                Me interesa
              </a>
            </div>
          ) : (
            <div key={c.title} className="card flex flex-col gap-[18px] rounded-[22px] p-8 sm:p-10">
              <span className={eyebrow}>{num}</span>
              <h3 className={h3Card}>{c.title}</h3>
              <p className={pCard}>{c.desc}</p>
              <a href={href} target="_blank" rel="noopener noreferrer" className={btnOutline}>
                Me interesa
                <IconArrow className="h-4 w-4" strokeWidth={2.4} />
              </a>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3.5 rounded-2xl border border-dashed border-border-strong px-6 py-5 text-base leading-normal text-muted">
        <IconYouTube className="h-[22px] w-[22px] shrink-0 text-accent" />
        <span>
          ¿Prefieres empezar gratis? En{" "}
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-[3px]"
          >
            YouTube
          </a>{" "}
          e{" "}
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-[3px]"
          >
            Instagram
          </a>{" "}
          comparto tutoriales prácticos para usar IA sin tecnicismos.
        </span>
      </div>
    </div>
  );
}

export default function ServicesTabs() {
  const [svc, setSvc] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setSvc(i);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = SVC_TABS.length - 1;
    if (e.key === "ArrowRight") select(i === last ? 0 : i + 1);
    else if (e.key === "ArrowLeft") select(i === 0 ? last : i - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(last);
    else return;
    e.preventDefault();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label="¿Qué buscas?"
        className="flex w-full max-w-full flex-col gap-2.5 self-start rounded-[28px] border border-border bg-surface-deep p-1.5 sm:w-auto sm:flex-row sm:flex-wrap sm:rounded-full"
      >
        {SVC_TABS.map((label, i) => {
          const active = i === svc;
          return (
            <button
              key={label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${i}`}
              aria-selected={active}
              aria-controls={`panel-${i}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSvc(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={
                active
                  ? "min-h-[46px] cursor-pointer rounded-full border border-accent bg-accent px-[22px] text-[15px] font-semibold text-on-accent shadow-[0_0_18px_rgba(255,138,31,0.45)]"
                  : "opt min-h-[46px] cursor-pointer rounded-full border border-transparent bg-transparent px-[22px] text-[15px] font-medium text-foreground"
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {SVC_TABS.map((label, i) => (
        <div
          key={label}
          role="tabpanel"
          id={`panel-${i}`}
          aria-labelledby={`tab-${i}`}
          hidden={i !== svc}
          className="msg"
        >
          {i === 0 ? <NegocioPanel /> : <OtroPanel svc={i} />}
        </div>
      ))}
    </>
  );
}
