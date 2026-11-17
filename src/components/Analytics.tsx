"use client";

import { useEffect } from "react";
import Script from "next/script";
import { site } from "@/config/site";
import { track } from "@/lib/track";

// Google Analytics 4 solo se carga si existe NEXT_PUBLIC_GA_ID (ver .env.example).
// Sin esa variable no se carga ningún script externo ni se guarda ninguna cookie.
const rawId = process.env.NEXT_PUBLIC_GA_ID ?? "";
const GA_ID = /^G-[A-Z0-9]+$/.test(rawId) ? rawId : "";

const socialHosts = Object.entries(site.social)
  .filter(([, url]) => url)
  .map(([red, url]) => ({ red, host: new URL(url).hostname.replace(/^www\./, "") }));

// Sección desde donde se hizo clic: el data-origen más cercano o, si no hay, el id de la sección.
function origenDe(el: Element) {
  return (
    el.closest("[data-origen]")?.getAttribute("data-origen") ??
    el.closest("section[id]")?.id ??
    "otro"
  );
}

export default function Analytics() {
  // Un solo escucha para toda la página: cualquier enlace nuevo a WhatsApp, al correo, a la app
  // de marca o a redes queda medido sin tener que tocar cada botón.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!(a instanceof HTMLAnchorElement)) return;

      const origen = origenDe(a);
      const href = a.href;

      if (href.startsWith("mailto:")) {
        track("correo_click", { origen });
        return;
      }

      let url: URL;
      try {
        url = new URL(href);
      } catch {
        return;
      }
      const host = url.hostname.replace(/^www\./, "");

      if (host === "wa.me") {
        track("whatsapp_click", { origen, texto: (a.textContent ?? "").trim().slice(0, 60) });
      } else if (href.startsWith(site.marcaUrl)) {
        track("marca_click", { origen, modo: url.searchParams.get("modo") ?? "inicio" });
      } else {
        const social = socialHosts.find((s) => s.host === host);
        if (social) track("red_social_click", { origen, red: social.red });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
