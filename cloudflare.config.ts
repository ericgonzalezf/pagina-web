import { bindings, defineConfig, defineWorker } from "cf/config";

// Se publica solo desde GitHub con Workers Builds:
// - Cada push a `main` publica en producción (`npx cf deploy`).
// - Cada push a otra rama crea una vista previa (`npx cf previews deploy`) en workers.dev,
//   sin tocar el sitio real.
export default defineConfig(({ isPreview }) => ({
  // ID de la cuenta de Cloudflare (no es secreto): así la compilación en Cloudflare
  // no depende de adivinar la cuenta.
  accountId: "8a408de446771c15adb1e50bb1d063ac",
  worker: defineWorker({
    name: "ericgonzalezf-web",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-17",
    // Dominios propios (solo producción). El sitio se sirve en www; el dominio sin www
    // llega a este Worker y una regla de Cloudflare lo redirige a www.
    domains: ["www.ericgonzalezf.com", "ericgonzalezf.com"],
    // Producción solo vive en los dominios propios, no en workers.dev. Las vistas previas
    // sí usan workers.dev (*-ericgonzalezf-web.eric-8a4.workers.dev); sin previewUrls: true,
    // cada publicación las volvería a apagar.
    workersDev: false,
    previewUrls: true,
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
      // En producción es obligatoria: Cloudflare se niega a publicar si falta, así el
      // sitio nunca queda arriba con el chat apagado por un descuido. Las vistas previas
      // no heredan los secretos de producción, así que ahí no se exige (el chat de la
      // vista previa avisa que está en configuración).
      ...(isPreview
        ? {}
        : {
            ANTHROPIC_API_KEY: bindings.secret(),
            // Base de datos D1 con la medición de visitas y clics (tabla `eventos`, ver
            // migrations/). Solo en producción, para que las vistas previas no ensucien los
            // datos: ahí /api/evento no guarda nada.
            DB: bindings.d1({ id: "baac9a9b-8a89-49f7-bb0c-7679d588eff2", name: "ericgonzalezf-web" }),
          }),
    },
  }),
}));
