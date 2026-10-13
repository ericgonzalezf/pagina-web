"use client";

import { useEffect, useRef, useState } from "react";
import { FLOWS, Q_START, computeResult } from "@/config/diagnostic";
import { IconWhatsApp } from "@/components/icons";
import Container from "@/components/Container";

export default function Diagnostic() {
  const [q, setQ] = useState(0);
  const [path, setPath] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);

  const headRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);

  const totalQ = 1 + (path != null ? FLOWS[path].length : 4);
  const qi = Math.min(q, totalQ);
  const asking = qi < totalQ;
  const cur = qi === 0 || path == null ? Q_START : asking ? FLOWS[path][qi - 1] : Q_START;
  const res = !asking && path != null ? computeResult(path, answers) : null;

  // Tras cada paso (no en la carga inicial), el foco pasa a la nueva pregunta o al resultado.
  useEffect(() => {
    if (!interacted.current) return;
    (asking ? headRef.current : resultRef.current)?.focus();
  }, [qi, asking, path]);

  const pick = (oi: number) => {
    interacted.current = true;
    if (qi === 0) {
      setPath(oi);
      setAnswers([]);
      setQ(1);
      return;
    }
    const next = answers.slice(0, qi - 1);
    next[qi - 1] = oi;
    setAnswers(next);
    setQ(qi + 1);
  };

  const goBack = () => {
    interacted.current = true;
    setQ(Math.max(0, qi - 1));
  };

  const reset = () => {
    interacted.current = true;
    setQ(0);
    setPath(null);
    setAnswers([]);
  };

  const pct = asking ? Math.round((qi / totalQ) * 100) : 100;

  return (
    <section id="diagnostico" className="sec-diag border-t border-border">
      <Container className="flex flex-wrap items-start gap-x-14 gap-y-10 py-20 md:py-28">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-[18px] lg:max-w-[420px]">
          <div className="font-mono text-sm text-accent">04 · Diagnóstico gratis</div>
          <h2 className="m-0 text-[clamp(38px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground">
            ¿Cuánto puede ayudarte la IA?
          </h2>
          <p className="m-0 text-lg leading-[1.6] text-muted">
            En tu negocio, en tu trabajo o en tu vida diaria. Menos de un minuto, y al final te
            digo por dónde te conviene empezar.
          </p>
        </div>

        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7 rounded-3xl border border-accent/55 bg-[linear-gradient(180deg,#17110b,#0f0b08)] p-6 shadow-[0_0_0_1px_rgba(255,138,31,0.12),0_0_44px_rgba(255,138,31,0.16),inset_0_1px_0_rgba(255,200,140,0.1)] sm:p-10">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between font-mono text-[13px] text-muted">
              <span>{asking ? `pregunta ${qi + 1} de ${totalQ}` : "listo"}</span>
              <span>diagnóstico</span>
            </div>
            <div
              role="progressbar"
              aria-label="Progreso del diagnóstico"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              className="h-1 overflow-hidden rounded-sm bg-border"
            >
              <div
                className="h-full bg-[linear-gradient(90deg,var(--accent-highlight),var(--accent)_60%,var(--accent-deep))] shadow-[0_0_10px_rgba(255,138,31,0.8)] transition-[width] duration-[350ms] ease-out motion-reduce:transition-none"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div aria-live="polite">
            {asking ? (
              <div className="flex flex-col gap-[22px]">
                <h3
                  ref={headRef}
                  tabIndex={-1}
                  className="m-0 text-[clamp(24px,2.6vw,30px)] font-semibold leading-[1.2] tracking-[-0.02em] text-foreground outline-none"
                >
                  {cur.title}
                </h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
                  {cur.options.map((label, oi) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => pick(oi)}
                      className="opt min-h-[60px] cursor-pointer rounded-[14px] border border-border-strong bg-surface-deep px-[18px] py-4 text-left text-base text-foreground"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {qi > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="min-h-11 cursor-pointer self-start border-none bg-transparent px-1 font-mono text-sm text-muted hover:text-foreground"
                  >
                    ← Atrás
                  </button>
                )}
              </div>
            ) : (
              res && (
                <div ref={resultRef} tabIndex={-1} className="msg flex flex-col gap-[22px] outline-none">
                  {res.hasHours ? (
                    <>
                      <div className="flex flex-col gap-2">
                        <div className="text-base text-muted">{res.resultIntro}</div>
                        <div className="text-brand text-[clamp(44px,5vw,64px)] font-bold leading-none tracking-[-0.04em]">
                          {res.hoursLabel}
                        </div>
                        <div className="text-lg text-foreground">{res.resultSuffix}</div>
                        <div className="font-mono text-xs text-muted">{res.calcNote}</div>
                      </div>
                      <div className="h-px bg-border" />
                    </>
                  ) : (
                    <>
                      <div className="text-brand text-[clamp(30px,3.4vw,40px)] font-bold leading-[1.1] tracking-[-0.03em]">
                        La IA puede hacerte la vida más fácil.
                      </div>
                      <div className="h-px bg-border" />
                    </>
                  )}

                  <div className="flex flex-col gap-2.5">
                    <div className="font-mono text-[13px] text-accent">Por dónde te conviene empezar</div>
                    <div className="text-2xl font-bold tracking-[-0.02em] text-foreground">{res.recTitle}</div>
                    <div className="text-[17px] leading-[1.6] text-muted">{res.recDesc}</div>
                    {res.extraNote && (
                      <div className="text-base leading-[1.6] text-foreground">{res.extraNote}</div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href={res.waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-6 text-base"
                    >
                      <IconWhatsApp className="h-5 w-5" />
                      Envíame mi diagnóstico por WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="btn btn-ghost min-h-[52px] cursor-pointer rounded-full bg-transparent px-6 text-base"
                    >
                      Volver a empezar
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
