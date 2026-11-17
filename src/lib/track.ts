// Medición de eventos del sitio. Todo pasa por track(): si mañana cambia la herramienta
// (Google Analytics, Cloudflare, una tabla propia), solo se cambia este archivo.
//
// Eventos que se registran hoy:
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

export type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  const data = { pagina: window.location.pathname, ...params };
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, data);
  window.gtag?.("event", event, data);
}
