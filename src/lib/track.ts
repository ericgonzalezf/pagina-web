// Medición de eventos del sitio. Todo pasa por track(): cada evento se manda a /api/evento,
// que lo guarda en la base de datos D1 de Cloudflare (tabla `eventos`). Si algún día se suma
// otra herramienta (por ejemplo Google Analytics), solo se cambia este archivo.
//
// Eventos que se registran hoy:
//   visita                { }                     abrió una página del sitio
//   whatsapp_click        { origen, texto }       clic en cualquier botón o enlace a WhatsApp
//   correo_click          { origen }              clic en el correo
//   marca_click           { origen, modo }        clic hacia la app de marca personal
//   red_social_click      { origen, red }         clic hacia Instagram, YouTube, etc.
//   diagnostico_inicio    { ruta }                eligió negocio / trabajo / vida diaria
//   diagnostico_completo  { ruta, recomendacion } llegó al resultado
//   chat_abierto                                  abrió el asistente
//   chat_mensaje          { numero }              envió un mensaje (nunca se registra el texto)
//
// "origen" es la sección de la página desde donde se hizo clic (inicio, servicios, marca,
// diagnostico, contacto, chat…). Nunca se envían datos personales ni el contenido de los mensajes.
// No se usan cookies: la "sesión" es un identificador al azar en sessionStorage, que el
// navegador borra al cerrar la pestaña. Si sessionStorage no está disponible, se manda sin él.

export type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const ENDPOINT = "/api/evento";
const KEY_SESION = "egf_sesion";
const KEY_LLEGADA = "egf_llegada";

type Llegada = { referente: string; utm: { source?: string; medium?: string; campaign?: string } };

function leer(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function guardar(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // sin sessionStorage (modo privado estricto): se mide igual, sin unir los pasos
  }
}

function sesion() {
  let id = leer(KEY_SESION);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    guardar(KEY_SESION, id);
  }
  return id;
}

// De dónde llegó la persona (red social, buscador, campaña): se toma al entrar al sitio y se
// repite en cada evento, para saber qué canal trae a quien escribe por WhatsApp. Si en la misma
// pestaña vuelve a entrar desde otra campaña o desde otro sitio, esa nueva llegada reemplaza a
// la anterior; la navegación dentro del sitio no la cambia.
function llegada(): Llegada {
  const q = new URLSearchParams(window.location.search);
  const utm = {
    source: q.get("utm_source") ?? undefined,
    medium: q.get("utm_medium") ?? undefined,
    campaign: q.get("utm_campaign") ?? undefined,
  };
  let externo = false;
  try {
    externo = !!document.referrer && new URL(document.referrer).host !== window.location.host;
  } catch {
    externo = false;
  }
  const nueva = Boolean(utm.source || utm.medium || utm.campaign) || externo;

  const previa = leer(KEY_LLEGADA);
  if (previa && !nueva) {
    try {
      return JSON.parse(previa) as Llegada;
    } catch {
      // se recalcula abajo
    }
  }
  const datos: Llegada = { referente: externo ? document.referrer : "", utm };
  guardar(KEY_LLEGADA, JSON.stringify(datos));
  return datos;
}

function enviar(payload: unknown) {
  const body = JSON.stringify(payload);
  try {
    // sendBeacon sigue enviando aunque la persona se vaya a WhatsApp en ese instante.
    if (navigator.sendBeacon?.(ENDPOINT, body)) return;
  } catch {
    // se intenta con fetch
  }
  fetch(ENDPOINT, { method: "POST", body, keepalive: true }).catch(() => {});
}

export function track(event: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  const data = { pagina: window.location.pathname, ...params };
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, data);
  window.gtag?.("event", event, data);

  const { referente, utm } = llegada();
  enviar({ evento: event, params: data, sesion: sesion(), referente, utm });
}
