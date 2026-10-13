"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "¡Hola! Soy el asistente de Eric. Pregúntame sobre sus servicios de IA, chatbots, automatización o marca personal, y te oriento.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (res.status === 503) {
        setNotConfigured(true);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Este asistente todavía está en configuración. Mientras tanto, escríbeme directo a ${site.email} y te respondo yo mismo.`,
          },
        ]);
        return;
      }

      if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Vamos con calma — hiciste muchas preguntas seguidas. Intenta de nuevo en un rato.",
          },
        ]);
        return;
      }

      if (!res.ok || !res.body) {
        throw new Error("chat request failed");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Algo falló de mi lado. Intenta de nuevo, o escríbeme a " + site.email + ".",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent-2" />
            <span className="font-mono text-sm">Asistente de {site.name.split(" ")[0]}</span>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-accent text-white"
                    : "bg-background/60 text-foreground border border-border"
                }`}
              >
                {m.content || (loading && i === messages.length - 1 ? "…" : "")}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || notConfigured}
              placeholder={notConfigured ? "Asistente no disponible" : "Escribe tu pregunta…"}
              className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2 text-sm outline-none placeholder:text-muted focus:border-accent disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || notConfigured || !input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform enabled:hover:scale-105 disabled:opacity-40"
              aria-label="Enviar"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_30px_-6px_var(--accent)] transition-transform hover:scale-105"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <path d="M4 5h16v11H8l-4 4V5Z" strokeLinejoin="round" />
            <path d="M8 10h8M8 13h5" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
