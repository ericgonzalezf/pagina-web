import { env } from "cloudflare:workers";

// Recibe los eventos de medición que manda src/lib/track.ts y los guarda en D1 (tabla
// `eventos`, ver migrations/0001_eventos.sql). Sin cookies ni datos personales: no se guarda
// la IP ni el navegador completo; el país sale del encabezado que pone Cloudflare.

// Solo se aceptan estos eventos; cualquier otro se ignora.
const EVENTOS = new Set([
  "visita",
  "whatsapp_click",
  "correo_click",
  "marca_click",
  "red_social_click",
  "diagnostico_inicio",
  "diagnostico_completo",
  "chat_abierto",
  "chat_mensaje",
]);

const MAX_BODY = 4096;
const BOTS = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|lighthouse|headless|curl|wget|python|node-fetch/i;

type D1 = {
  prepare(sql: string): { bind(...values: unknown[]): { run(): Promise<unknown> } };
};

const texto = (v: unknown, max: number) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

function dispositivo(ua: string) {
  if (/ipad|tablet|kindle|silk/i.test(ua)) return "tableta";
  if (/mobi|iphone|android/i.test(ua)) return "movil";
  return "escritorio";
}

// Solo el dominio del sitio de donde llegó la persona; nunca la dirección completa.
function dominio(ref: unknown) {
  const r = texto(ref, 500);
  if (!r) return null;
  try {
    const host = new URL(r).hostname.replace(/^www\./, "");
    return host.endsWith("ericgonzalezf.com") ? null : host.slice(0, 100);
  } catch {
    return null;
  }
}

// La respuesta siempre es 204: la medición nunca debe romper la página ni dar pistas.
const listo = () => new Response(null, { status: 204 });

export async function POST(req: Request) {
  const db = (env as { DB?: D1 }).DB;
  if (!db) return listo(); // vistas previas y desarrollo local sin base de datos

  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOTS.test(ua)) return listo();

  const raw = await req.text().catch(() => "");
  if (!raw || raw.length > MAX_BODY) return listo();

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return listo();
  }

  const evento = texto(body.evento, 40);
  if (!evento || !EVENTOS.has(evento)) return listo();

  const params = (body.params && typeof body.params === "object" ? body.params : {}) as Record<
    string,
    unknown
  >;
  const { pagina, origen, ...resto } = params;
  // Datos extra del evento: solo valores cortos de texto, número o sí/no.
  const detalle = Object.fromEntries(
    Object.entries(resto)
      .filter(([, v]) => ["string", "number", "boolean"].includes(typeof v))
      .slice(0, 8)
      .map(([k, v]) => [k.slice(0, 30), typeof v === "string" ? v.slice(0, 120) : v]),
  );

  const utm = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;

  try {
    await db
      .prepare(
        `INSERT INTO eventos (evento, sesion, pagina, origen, detalle, referente, utm_source, utm_medium, utm_campaign, pais, dispositivo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        evento,
        texto(body.sesion, 40),
        texto(pagina, 200),
        texto(origen, 40),
        Object.keys(detalle).length ? JSON.stringify(detalle) : null,
        dominio(body.referente),
        texto(utm.source, 100),
        texto(utm.medium, 100),
        texto(utm.campaign, 100),
        texto(req.headers.get("cf-ipcountry"), 2),
        dispositivo(ua),
      )
      .run();
  } catch (err) {
    console.error("evento: no se pudo guardar", err);
  }
  return listo();
}
