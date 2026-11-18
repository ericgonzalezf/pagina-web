// Textos de los dos correos que salen cuando alguien deja sus datos en el diagnóstico:
// 1) a la persona, con su resultado (lo pidió ella: es un correo transaccional), y
// 2) a Eric, con el aviso del contacto nuevo.
// Voz de marca: de tú, sin tecnicismos, sin prometer respuesta personal ni hacer preguntas que
// esperen respuesta. Cierre: "Caminemos juntos."
import { site, WHATSAPP_CON_ASISTENTE } from "@/config/site";

// Invitación a WhatsApp: solo menciona al asistente cuando ese número ya lo tiene conectado.
const INVITACION_WHATSAPP = WHATSAPP_CON_ASISTENTE
  ? "Si quieres ver cómo funcionaría en tu caso, escríbeme por WhatsApp; ahí te atiende mi asistente con IA y, si lo pides, hablamos tú y yo"
  : "Si quieres ver cómo funcionaría en tu caso, escríbeme por WhatsApp y lo vemos con tu negocio en particular";

export type DatosCorreo = {
  nombre: string | null;
  correo: string;
  whatsapp: string | null;
  ruta: string;
  respuestas: { pregunta: string; respuesta: string }[];
  recomendacion: string;
  recomendacionDesc: string;
  notaExtra: string;
  horasTexto: string | null; // p. ej. "Hoy se te van aproximadamente 12 horas a la semana contestando WhatsApp a mano."
  waHref: string;
  prioridad: "alta" | "normal";
  canal: string;
  aceptaCorreos: boolean;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const NARANJA = "#FF8A1F";
const TEXTO = "#1A0E03";
const SUAVE = "#5E4B3B";

function boton(href: string, texto: string) {
  return `<a href="${esc(href)}" style="display:inline-block;background:${NARANJA};color:${TEXTO};text-decoration:none;font-weight:700;padding:14px 22px;border-radius:999px">${esc(texto)}</a>`;
}

function marco(contenido: string, pie: string) {
  return `<!doctype html><html lang="es"><body style="margin:0;background:#F2E9DD;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:${TEXTO}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;padding:28px">
<tr><td style="font-size:16px;line-height:1.6">${contenido}</td></tr>
</table>
<p style="max-width:560px;font-size:12px;line-height:1.5;color:${SUAVE};margin:16px auto 0">${pie}</p>
</td></tr></table></body></html>`;
}

// Correo para la persona: su diagnóstico y el siguiente paso.
export function correoResultado(d: DatosCorreo) {
  const saludo = d.nombre ? `Hola ${d.nombre},` : "Hola,";
  const asunto = `Tu diagnóstico de IA: ${d.recomendacion}`;

  const lineas = [
    saludo,
    "",
    "Aquí está el resultado del diagnóstico que hiciste en mi página.",
    ...(d.horasTexto ? ["", d.horasTexto] : []),
    "",
    "Por dónde te conviene empezar:",
    d.recomendacion,
    d.recomendacionDesc,
    ...(d.notaExtra ? ["", d.notaExtra] : []),
    "",
    "Tus respuestas:",
    ...d.respuestas.map((r) => `- ${r.pregunta} ${r.respuesta}`),
    "",
    `${INVITACION_WHATSAPP}:`,
    d.waHref,
    "",
    "— Eric",
    "Caminemos juntos.",
    "",
    `${site.brand} · ${site.domain}`,
    "Recibes este correo porque pediste tu diagnóstico en ericgonzalezf.com.",
  ];

  const html = marco(
    `<p style="margin:0 0 12px">${esc(saludo)}</p>
<p style="margin:0 0 16px">Aquí está el resultado del diagnóstico que hiciste en mi página.</p>
${d.horasTexto ? `<p style="margin:0 0 16px;font-size:18px;font-weight:700">${esc(d.horasTexto)}</p>` : ""}
<p style="margin:0 0 4px;color:${SUAVE};font-size:13px;text-transform:uppercase;letter-spacing:.06em">Por dónde te conviene empezar</p>
<p style="margin:0 0 6px;font-size:20px;font-weight:700">${esc(d.recomendacion)}</p>
<p style="margin:0 0 16px">${esc(d.recomendacionDesc)}</p>
${d.notaExtra ? `<p style="margin:0 0 16px">${esc(d.notaExtra)}</p>` : ""}
<p style="margin:0 0 6px;color:${SUAVE};font-size:13px;text-transform:uppercase;letter-spacing:.06em">Tus respuestas</p>
<ul style="margin:0 0 20px;padding-left:18px">${d.respuestas
      .map((r) => `<li style="margin:0 0 4px">${esc(r.pregunta)} <strong>${esc(r.respuesta)}</strong></li>`)
      .join("")}</ul>
<p style="margin:0 0 16px">${esc(INVITACION_WHATSAPP)}.</p>
<p style="margin:0 0 24px">${boton(d.waHref, "Escríbeme por WhatsApp")}</p>
<p style="margin:0">— Eric<br>Caminemos juntos.</p>`,
    `${esc(site.brand)} · <a href="${esc(site.url)}" style="color:${SUAVE}">${esc(site.domain)}</a><br>Recibes este correo porque pediste tu diagnóstico en ericgonzalezf.com.`,
  );

  return { asunto, texto: lineas.join("\n"), html };
}

// Correo para Eric: aviso del contacto nuevo, con lo necesario para escribirle.
export function correoAviso(d: DatosCorreo) {
  const quien = d.nombre ?? d.correo;
  const asunto = `${d.prioridad === "alta" ? "Prioridad alta · " : ""}Nuevo contacto del diagnóstico: ${quien} (${d.ruta})`;
  const waDirecto = d.whatsapp ? `https://wa.me/${d.whatsapp}` : null;

  const filas: [string, string][] = [
    ["Nombre", d.nombre ?? "—"],
    ["Correo", d.correo],
    ["WhatsApp", d.whatsapp ? `+${d.whatsapp}` : "—"],
    ["Ruta", d.ruta],
    ["Recomendación", d.recomendacion],
    ...(d.horasTexto ? ([["Estimado", d.horasTexto]] as [string, string][]) : []),
    ["Canal de llegada", d.canal],
    ["Aceptó correos", d.aceptaCorreos ? "Sí (ya está en MailerLite, grupo Diagnóstico web)" : "No (solo recibió su resultado)"],
    ["Prioridad", d.prioridad],
    ...d.respuestas.map((r) => [r.pregunta, r.respuesta] as [string, string]),
  ];

  const texto = [
    `Nuevo contacto desde el diagnóstico de ${site.domain}.`,
    "",
    ...filas.map(([k, v]) => `${k}: ${v}`),
    "",
    ...(waDirecto ? [`Escribirle por WhatsApp: ${waDirecto}`] : []),
    `Responder por correo: mailto:${d.correo}`,
  ].join("\n");

  const html = marco(
    `<p style="margin:0 0 16px;font-size:18px;font-weight:700">${d.prioridad === "alta" ? "Prioridad alta · " : ""}Nuevo contacto del diagnóstico</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 20px">${filas
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 8px 6px 0;color:${SUAVE};font-size:14px;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;font-size:14px">${esc(v)}</td></tr>`,
      )
      .join("")}</table>
<p style="margin:0">${waDirecto ? boton(waDirecto, "Escribirle por WhatsApp") + "&nbsp; " : ""}<a href="mailto:${esc(d.correo)}" style="color:${TEXTO}">Responder por correo</a></p>`,
    `Aviso automático de ${esc(site.domain)}. El contacto también quedó guardado en la base de Cloudflare.`,
  );

  return { asunto, texto, html };
}
