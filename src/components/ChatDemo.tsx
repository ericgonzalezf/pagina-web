"use client";

import { useState } from "react";
import { createTimers, useStartOnView } from "@/lib/useStartOnView";

const CHAT = [
  { bot: false, text: "Hola, ¿tienen mesa para 4 hoy a las 8?" },
  { bot: true, text: "¡Claro! Te aparto mesa para 4 a las 8:00 pm. ¿A nombre de quién?" },
  { bot: false, text: "A nombre de Laura, gracias" },
  { bot: true, text: "Listo, Laura. Reservación confirmada. Te esperamos." },
];

// null = estado estático con la conversación completa (sin JS o con reduced-motion)
type Anim = { shown: number; typing: boolean; badge: boolean } | null;

export default function ChatDemo() {
  const [anim, setAnim] = useState<Anim>(null);

  const ref = useStartOnView<HTMLDivElement>(() => {
    const t = createTimers();
    let i = 0;

    const next = () => {
      if (i >= CHAT.length) {
        t.later(() => setAnim({ shown: CHAT.length, typing: false, badge: true }), 400);
        t.later(() => {
          i = 0;
          setAnim({ shown: 0, typing: false, badge: false });
          t.later(next, 900);
        }, 6000);
        return;
      }
      if (CHAT[i].bot) {
        setAnim({ shown: i, typing: true, badge: false });
        t.later(() => {
          i++;
          setAnim({ shown: i, typing: false, badge: false });
          t.later(next, 1000);
        }, 1500);
      } else {
        t.later(() => {
          i++;
          setAnim({ shown: i, typing: false, badge: false });
          t.later(next, 600);
        }, 500);
      }
    };

    setAnim({ shown: 0, typing: false, badge: false });
    t.later(next, 500);
    return () => t.clear();
  });

  const shown = anim ? anim.shown : CHAT.length;
  const typing = anim ? anim.typing : false;
  const badge = anim ? anim.badge : true;

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Ejemplo de conversación de WhatsApp atendida por IA"
      className="w-[320px] max-w-full overflow-hidden rounded-[26px] border border-accent/50 bg-background shadow-[0_0_30px_rgba(255,138,31,0.2),0_30px_60px_rgba(0,0,0,0.55)]"
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-on-accent shadow-[0_0_12px_rgba(255,138,31,0.6)]">
          TN
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[15px] font-semibold text-foreground">Tu negocio</div>
          <div className="text-xs text-accent">
            {typing ? "escribiendo…" : "en línea · responde al instante"}
          </div>
        </div>
      </div>

      <div
        aria-live="off"
        className="box-border flex min-h-[300px] flex-col gap-2.5 p-4 text-sm leading-[1.45]"
      >
        {CHAT.slice(0, shown).map((m, i) =>
          m.bot ? (
            <div
              key={i}
              className="msg max-w-[85%] self-start rounded-[14px_14px_14px_4px] border border-accent/35 bg-surface px-[13px] py-2.5 text-foreground"
            >
              {m.text}
            </div>
          ) : (
            <div
              key={i}
              className="msg max-w-[80%] self-end rounded-[14px_14px_4px_14px] bg-border px-[13px] py-2.5 text-foreground"
            >
              {m.text}
            </div>
          ),
        )}
        {typing && (
          <div
            aria-label="Escribiendo"
            className="msg flex gap-[5px] self-start rounded-[14px_14px_14px_4px] border border-accent/35 bg-surface px-[15px] py-[13px]"
          >
            <span className="dot" />
            <span className="dot dot2" />
            <span className="dot dot3" />
          </div>
        )}
        {badge && (
          <div className="msg mt-1 self-center rounded-full border border-accent/40 px-3 py-[5px] font-mono text-[11px] text-accent">
            respondido por IA · 2:14 am
          </div>
        )}
      </div>
    </div>
  );
}
