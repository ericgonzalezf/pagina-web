import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "ericgonzalezf-web",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-17",
    // Dominios propios. El sitio se sirve en www; el dominio sin www también llega a
    // este Worker y next.config.ts lo redirige a www.
    domains: ["www.ericgonzalezf.com", "ericgonzalezf.com"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      // Llave de Anthropic para el asistente del sitio (src/app/api/chat/route.ts).
      // El valor nunca va en el código: en producción es un secreto del Worker y en
      // local se lee del archivo .dev.vars (que no se sube a GitHub).
      // Al declararlo aquí, Cloudflare se niega a publicar si el secreto falta, así el
      // sitio nunca queda arriba con el chat apagado por un descuido.
      ANTHROPIC_API_KEY: bindings.secret(),
    },
  }),
});
