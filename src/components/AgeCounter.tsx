"use client";

import { useState } from "react";
import { IconCheck } from "@/components/icons";
import Container from "@/components/Container";
import { createTimers, useStartOnView } from "@/lib/useStartOnView";

const AGES = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

// null = estado final estático (70, todas las edades encendidas y el remate completo)
type Anim = { idx: number } | null;

export default function AgeCounter() {
  const [anim, setAnim] = useState<Anim>(null);

  const ref = useStartOnView<HTMLElement>(() => {
    const t = createTimers();
    let i = 0;
    setAnim({ idx: 0 });

    const step = () => {
      if (i < AGES.length - 1) {
        i++;
        setAnim({ idx: i });
        t.later(step, i === 4 ? 1100 : 520); // pausa más larga en 40
      } else {
        t.later(() => setAnim(null), 350);
      }
    };
    t.later(step, 600);
    return () => t.clear();
  });

  const idx = anim ? anim.idx : AGES.length - 1;
  const done = !anim;

  return (
    <section ref={ref} aria-label="Nunca es tarde" className="sec-age border-b border-border">
      <Container className="flex flex-wrap items-center gap-x-[72px] gap-y-12 py-[72px] md:py-[88px]">
        <div aria-hidden="true" className="flex min-w-[260px] flex-col gap-3.5">
          <div className="font-mono text-[13px] text-muted">¿empezar con IA a los…?</div>
          <div className="flex items-center gap-5">
            <div className="text-brand text-[clamp(80px,9vw,120px)] font-bold leading-[0.9] tracking-[-0.05em] tabular-nums [--tg-alpha:0.45] [--tg-blur:24px] [background-image:linear-gradient(180deg,var(--accent-highlight),var(--accent)_55%,var(--accent-deep))]">
              {AGES[idx]}
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-accent shadow-[0_0_0_1px_rgba(255,178,36,0.4),0_0_22px_rgba(255,138,31,0.6)]">
                <IconCheck className="h-[26px] w-[26px] text-accent-highlight" strokeWidth={2.8} />
              </div>
              <div className="font-mono text-xs text-accent">a tiempo</div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-[22px]">
          <div aria-hidden="true" className="flex flex-wrap gap-2.5">
            {AGES.map((age, ai) =>
              ai <= idx ? (
                <div
                  key={`${age}-lit`}
                  className="msg flex items-center gap-1.5 rounded-full border border-accent bg-accent/[0.12] px-3 py-2 font-mono text-sm text-foreground shadow-[0_0_14px_rgba(255,138,31,0.35)]"
                >
                  {age}
                  <IconCheck className="h-3.5 w-3.5 text-accent-highlight" strokeWidth={3} />
                </div>
              ) : (
                <div
                  key={`${age}-dim`}
                  className="rounded-full border border-border px-3 py-2 font-mono text-sm text-dim"
                >
                  {age}
                </div>
              ),
            )}
          </div>

          <div
            aria-live="off"
            className="text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground"
          >
            {done ? "A cualquier edad." : "Está bien."}
            {done && <span className="msg text-brand [--tg-alpha:0.45] [--tg-blur:20px]"> Nunca es tarde.</span>}
          </div>

          <div className="text-[17px] leading-[1.6] text-muted">
            Yo empecé después de los 40, con 25 años de emprendedor encima.
          </div>
        </div>
      </Container>
    </section>
  );
}
