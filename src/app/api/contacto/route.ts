import { env } from "cloudflare:workers";
import { FLOWS, Q_START, computeResult } from "@/config/diagnostic";
import { correoAviso, correoResultado, type DatosCorreo } from "@/lib/contacto-correos";

// Recibe los datos que deja una persona al terminar el diagnóstico:
// 1) los guarda en D1 (tabla `contactos`, copia de respaldo en Cloudflare),
// 2) le manda por correo su resultado (Resend),
// 3) si aceptó recibir correos, la da de alta en MailerLite (grupo "Diagnóstico web"), y
// 4) avisa a Eric por correo.
// El resultado se vuelve a calcular aquí con las respuestas: nunca se manda por correo un texto
// que venga del navegador (solo el nombre, limpio y corto), para que nadie use el formulario
// para mandar spam con nuestro dominio.
//
// Documentación usada: MailerLite API "Create/upsert subscriber" y "Getting started" (límite de
// 120 peticiones/min, códigos 422/429); Resend "Send email" (POST /emails, User-Agent obligatorio,
// Idempotency-Key); Cloudflare "Rate Limiting binding" y D1 Worker API.

type D1 = {
  prepare(sql: string): {
    bind(...values: unknown[]): {
      run(): Promise<{ meta?: { last_row_id?: number } }>;
    };
  };
};
type RateLimit = { limit(opts: { key: string }): Promise<{ success: boolean }> };
type Env = {
  CONTACTOS?: D1;
  MAILERLITE_API_TOKEN?: string;
  RESEND_API_KEY?: string;
  AVISO_CORREO?: string;
  MAILERLITE_GRUPO?: string;
  LIMITE_CONTACTO?: RateLimit;
};

const REMITENTE = "Eric González IA <contacto@ericgonzalezf.com>";
const REMITENTE_AVISOS = "Avisos del sitio <avisos@ericgonzalezf.com>";
const RESPONDER_A = "contacto@ericgonzalezf.com";
const USER_AGENT = "ericgonzalezf-web/1.0";

const json = (data: unknown, status = 200) => Response.json(data, { status });

const texto = (v: unknown, max: number) =>
  typeof v === "string" && v.trim() ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : null;

function correoValido(v: unknown) {
  const c = texto(v, 254)?.toLowerCase() ?? null;
  return c && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c) ? c : null;
}

// Nombre: corto, sin enlaces ni símbolos raros (va dentro de los correos).
function nombreLimpio(v: unknown) {
  const n = texto(v, 60);
  if (!n || /:\/\/|www\.|@|[<>{}[\]]/i.test(n)) return null;
  return n;
}

// WhatsApp: solo dígitos; un número de 10 dígitos se toma como de México (+52).
function whatsappLimpio(v: unknown) {
  const d = typeof v === "string" ? v.replace(/\D/g, "") : "";
  if (d.length === 10) return `52${d}`;
  return d.length >= 11 && d.length <= 15 ? d : null;
}

function dispositivo(ua: string) {
  if (/ipad|tablet|kindle|silk/i.test(ua)) return "tableta";
  if (/mobi|iphone|android/i.test(ua)) return "movil";
  return "escritorio";
}

function canalDe(utm: Record<string, unknown>, referente: unknown) {
  const fuente = texto(utm.source, 100);
  if (fuente) return fuente;
  const r = texto(referente, 500);
  if (!r) return "directo";
  try {
    return new URL(r).hostname.replace(/^www\./, "").slice(0, 100);
  } catch {
    return "directo";
  }
}

async function enviarResend(e: Env, para: string, c: { asunto: string; texto: string; html: string }, de: string, clave: string) {
  if (!e.RESEND_API_KEY) return "sin_clave";
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${e.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      "Idempotency-Key": clave,
    },
    body: JSON.stringify({ from: de, to: [para], reply_to: RESPONDER_A, subject: c.asunto, text: c.texto, html: c.html }),
  });
  if (!r.ok) {
    console.error("contacto: Resend respondió", r.status, (await r.text()).slice(0, 300));
    return "error";
  }
  return "enviado";
}

async function altaMailerLite(e: Env, d: DatosCorreo, horas: number | null) {
  if (!d.aceptaCorreos) return "omitido";
  if (!e.MAILERLITE_API_TOKEN || !e.MAILERLITE_GRUPO) return "sin_clave";
  const ahora = new Date().toISOString().slice(0, 19).replace("T", " ");
  const r = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${e.MAILERLITE_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: d.correo,
      fields: {
        ...(d.nombre ? { name: d.nombre } : {}),
        ...(d.whatsapp ? { phone: `+${d.whatsapp}` } : {}),
        diagnostico_ruta: d.ruta,
        diagnostico_recomendacion: d.recomendacion,
        diagnostico_respuestas: d.respuestas.map((x) => x.respuesta).join(" · ").slice(0, 250),
        ...(horas != null ? { diagnostico_horas: horas } : {}),
        canal_de_llegada: d.canal,
      },
      groups: [e.MAILERLITE_GRUPO],
      opted_in_at: ahora,
    }),
  });
  // 422 sin "status": la persona se había dado de baja antes. No se reactiva sin su permiso
  // explícito (MailerLite pide `resubscribe` para eso); se respeta la baja.
  if (r.status === 422) {
    console.warn("contacto: MailerLite 422", (await r.text()).slice(0, 300));
    return "dado_de_baja";
  }
  if (!r.ok) {
    console.error("contacto: MailerLite respondió", r.status, (await r.text()).slice(0, 300));
    return "error";
  }
  return "ok";
}

export async function POST(req: Request) {
  const e = env as Env;

  // Freno contra abuso: 5 envíos por minuto por IP (la IP no se guarda).
  const ip = req.headers.get("cf-connecting-ip") ?? "local";
  if (e.LIMITE_CONTACTO) {
    const { success } = await e.LIMITE_CONTACTO.limit({ key: `contacto:${ip}` });
    if (!success) return json({ ok: false, error: "demasiados" }, 429);
  }

  const raw = await req.text().catch(() => "");
  if (!raw || raw.length > 6000) return json({ ok: false, error: "invalido" }, 400);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalido" }, 400);
  }

  // Campo trampa: invisible para personas; si viene lleno, es un robot. Se responde "ok" sin hacer nada.
  if (texto(body.sitio_web, 200)) return json({ ok: true });

  const correo = correoValido(body.correo);
  if (!correo) return json({ ok: false, error: "correo" }, 400);
  const nombre = nombreLimpio(body.nombre);
  const whatsapp = whatsappLimpio(body.whatsapp);
  const aceptaCorreos = body.acepta_correos === true;

  // Respuestas del diagnóstico: solo índices válidos de las preguntas reales.
  const ruta = Number(body.ruta);
  const flujo = FLOWS[ruta];
  const resp = Array.isArray(body.respuestas) ? body.respuestas : [];
  if (!flujo || resp.length !== flujo.length) return json({ ok: false, error: "diagnostico" }, 400);
  const indices = resp.map((v, i) =>
    Number.isInteger(v) && (v as number) >= 0 && (v as number) < flujo[i].options.length ? (v as number) : NaN,
  );
  if (indices.some(Number.isNaN)) return json({ ok: false, error: "diagnostico" }, 400);

  const resultado = computeResult(ruta, indices);
  const horas = resultado.hasHours ? Number.parseInt(resultado.hoursLabel, 10) || null : null;
  const prioridad: "alta" | "normal" = ruta === 0 && (indices[1] ?? 0) >= 2 ? "alta" : "normal";
  const utm = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;
  const canal = canalDe(utm, body.referente);

  const datos: DatosCorreo = {
    nombre,
    correo,
    whatsapp,
    ruta: Q_START.options[ruta],
    respuestas: flujo.map((q, i) => ({ pregunta: q.title, respuesta: q.options[indices[i]] })),
    recomendacion: resultado.recTitle,
    recomendacionDesc: resultado.recDesc,
    notaExtra: resultado.extraNote,
    horasTexto: resultado.hasHours
      ? `${resultado.resultIntro} ${resultado.hoursLabel} ${resultado.resultSuffix}`
      : null,
    waHref: resultado.waHref,
    prioridad,
    canal,
    aceptaCorreos,
  };

  // Sin base de datos (vistas previas y desarrollo sin configurar) no se guarda ni se envía nada.
  if (!e.CONTACTOS) return json({ ok: true, prueba: true });

  const ua = req.headers.get("user-agent") ?? "";
  const insert = await e.CONTACTOS.prepare(
    `INSERT INTO contactos (correo, nombre, whatsapp, ruta, respuestas, recomendacion, horas, prioridad, acepta_correos, sesion, canal, utm_medium, utm_campaign, pais, dispositivo)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      correo,
      nombre,
      whatsapp,
      datos.ruta,
      JSON.stringify(datos.respuestas.map((r) => r.respuesta)),
      datos.recomendacion,
      horas,
      prioridad,
      aceptaCorreos ? 1 : 0,
      texto(body.sesion, 40),
      canal,
      texto(utm.medium, 100),
      texto(utm.campaign, 100),
      texto(req.headers.get("cf-ipcountry"), 2),
      dispositivo(ua),
    )
    .run();
  const id = insert.meta?.last_row_id ?? Date.now();

  // Los tres envíos van en paralelo; si alguno falla, el contacto ya quedó guardado.
  const [resResultado, resMailerLite, resAviso] = await Promise.allSettled([
    enviarResend(e, correo, correoResultado(datos), REMITENTE, `diagnostico-resultado/${id}`),
    altaMailerLite(e, datos, horas),
    enviarResend(e, e.AVISO_CORREO ?? RESPONDER_A, correoAviso(datos), REMITENTE_AVISOS, `diagnostico-aviso/${id}`),
  ]);
  const estado = (r: PromiseSettledResult<string>) => (r.status === "fulfilled" ? r.value : "error");

  await e.CONTACTOS.prepare(
    "UPDATE contactos SET estado_resultado = ?, estado_mailerlite = ?, estado_aviso = ? WHERE id = ?",
  )
    .bind(estado(resResultado), estado(resMailerLite), estado(resAviso), id)
    .run()
    .catch((err) => console.error("contacto: no se pudo guardar el estado", err));

  return json({ ok: true, correoEnviado: estado(resResultado) === "enviado" });
}
