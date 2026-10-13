"use client";

import { useState } from "react";
import { createTimers, useStartOnView } from "@/lib/useStartOnView";

const TERM = [
  { cmd: "quien-soy", out: "Eric — 25 años emprendiendo, IA después de los 40" },
  { cmd: "que-hago", out: "Te enseño IA y la aplico en tu negocio" },
  { cmd: "mision", out: "\"Nunca es tarde. IA para todos — caminemos juntos.\"" },
];

// null = estado final estático (todo escrito + cursor parpadeando)
type Anim = { line: number; chars: number; out: number } | null;

export default function Terminal() {
  const [anim, setAnim] = useState<Anim>(null);

  const ref = useStartOnView<HTMLDivElement>(() => {
    const t = createTimers();
    let li = 0;
    let ch = 0;
    setAnim({ line: 0, chars: 0, out: -1 });

    const tick = () => {
      if (li >= TERM.length) {
        setAnim(null);
        return;
      }
      const cmd = TERM[li].cmd;
      if (ch < cmd.length) {
        ch++;
        setAnim({ line: li, chars: ch, out: li - 1 });
        t.later(tick, 75);
      } else {
        setAnim({ line: li, chars: cmd.length, out: li });
        li++;
        ch = 0;
        t.later(tick, li >= TERM.length ? 300 : 700);
      }
    };
    t.later(tick, 400);
    return () => t.clear();
  });

  const lines = TERM.flatMap((l, i) => {
    if (anim && i > anim.line) return [];
    const typing = !!anim && i === anim.line && anim.out < i;
    return [
      {
        cmd: typing ? l.cmd.slice(0, anim.chars) : l.cmd,
        out: l.out,
        showOut: !anim || anim.out >= i,
        cursor: typing,
      },
    ];
  });

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Terminal de presentación"
      className="min-w-0 flex-[1_1_440px] overflow-hidden rounded-[18px] border border-accent/45 bg-background shadow-[0_0_0_1px_rgba(255,138,31,0.08),0_0_40px_rgba(255,138,31,0.16),0_40px_80px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-[18px] py-3.5">
        <span className="h-[11px] w-[11px] rounded-full bg-border-strong" />
        <span className="h-[11px] w-[11px] rounded-full bg-border-strong" />
        <span className="h-[11px] w-[11px] rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
        <span className="ml-2.5 font-mono text-[13px] text-muted">~/eric</span>
      </div>

      <div
        aria-live="off"
        className="box-border flex min-h-[236px] flex-col gap-3.5 overflow-x-auto px-5 pb-7 pt-6 font-mono text-[15px] leading-normal sm:px-[26px] sm:pb-[30px] sm:pt-[26px]"
      >
        {lines.map((line) => (
          <div key={line.cmd + line.out} className="flex flex-col gap-3.5">
            <div>
              <span className="text-accent">$</span>{" "}
              <span className="text-muted">{line.cmd}</span>
              {line.cursor && <span className="term-cursor ml-0.5" />}
            </div>
            {line.showOut && <div className="msg pl-[18px] text-foreground">{line.out}</div>}
          </div>
        ))}
        {!anim && (
          <div>
            <span className="text-accent">$</span> <span className="term-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
