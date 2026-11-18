// Reporte de medición del sitio: lee la tabla `eventos` de la base D1 en Cloudflare y resume
// visitas, canales, dispositivos y el embudo hasta WhatsApp.
//
// Uso (necesita haber iniciado sesión con `npx cf auth login`):
//   node scripts/reporte-metricas.mjs          → últimos 7 días
//   node scripts/reporte-metricas.mjs 30       → últimos 30 días
//
// Una "visita" aquí es una sesión: una pestaña abierta en el sitio, con todos sus pasos.
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";

// Se llama al CLI de Cloudflare con el mismo Node, sin pasar por la terminal: así la consulta
// SQL llega completa también en Windows.
const require = createRequire(import.meta.url);
const CF = path.join(path.dirname(require.resolve("cf/package.json")), "bin", "cf");

const DB = "baac9a9b-8a89-49f7-bb0c-7679d588eff2";
const dias = Math.max(1, Math.min(365, Number(process.argv[2]) || 7));
const desde = `strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-${dias} days')`;

function consulta(sql) {
  const out = execFileSync(process.execPath, [CF, "d1", "query", DB, "--sql", sql.replace(/\s+/g, " ").trim()], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  const json = JSON.parse(out.slice(out.indexOf("[")));
  const primero = Array.isArray(json) ? json[0] : json;
  return primero?.results ?? (Array.isArray(json) ? json : []);
}

const n = (v) => Number(v ?? 0).toLocaleString("es-MX");
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "—");

function tabla(titulo, filas, cols) {
  console.log(`\n${titulo}`);
  if (!filas.length) {
    console.log("  (sin datos)");
    return;
  }
  for (const f of filas) console.log("  " + cols.map((c) => String(f[c] ?? "—")).join("  ·  "));
}

console.log(`Reporte de ericgonzalezf.com · últimos ${dias} días`);

const [t] = consulta(`
  SELECT COUNT(DISTINCT sesion) AS visitas,
         SUM(evento = 'visita') AS paginas,
         SUM(evento = 'whatsapp_click') AS whatsapp,
         SUM(evento = 'diagnostico_completo') AS diagnosticos,
         SUM(evento = 'chat_mensaje') AS mensajes_chat,
         SUM(evento = 'marca_click') AS marca
  FROM eventos WHERE creado >= ${desde}`);

console.log(`\nVisitas: ${n(t?.visitas)}   ·   Páginas vistas: ${n(t?.paginas)}`);
console.log(
  `Clics a WhatsApp: ${n(t?.whatsapp)}   ·   Diagnósticos completos: ${n(t?.diagnosticos)}   ·   Mensajes al chat: ${n(t?.mensajes_chat)}   ·   Clics a la app de marca: ${n(t?.marca)}`,
);

const [e] = consulta(`
  WITH s AS (
    SELECT sesion,
           MAX(evento = 'visita') AS v,
           MAX(evento = 'diagnostico_inicio') AS di,
           MAX(evento = 'diagnostico_completo') AS dc,
           MAX(evento = 'whatsapp_click') AS w
    FROM eventos WHERE creado >= ${desde} AND sesion IS NOT NULL GROUP BY sesion)
  SELECT SUM(v) AS visitas, SUM(di) AS inicio, SUM(dc) AS completo, SUM(w) AS whatsapp FROM s`);

console.log("\nEmbudo (visitas que llegaron a cada paso)");
console.log(`  Entraron al sitio ............ ${n(e?.visitas)}`);
console.log(`  Empezaron el diagnóstico ..... ${n(e?.inicio)}  (${pct(e?.inicio, e?.visitas)})`);
console.log(`  Terminaron el diagnóstico .... ${n(e?.completo)}  (${pct(e?.completo, e?.visitas)})`);
console.log(`  Dieron clic a WhatsApp ....... ${n(e?.whatsapp)}  (${pct(e?.whatsapp, e?.visitas)})`);

tabla(
  "De dónde llegan (visitas · clics a WhatsApp)",
  consulta(`
    WITH s AS (
      SELECT sesion,
             COALESCE(MAX(utm_source), MAX(referente), 'directo') AS canal,
             MAX(evento = 'whatsapp_click') AS w
      FROM eventos WHERE creado >= ${desde} AND sesion IS NOT NULL GROUP BY sesion)
    SELECT canal, COUNT(*) AS visitas, SUM(w) AS whatsapp FROM s GROUP BY canal ORDER BY visitas DESC LIMIT 10`),
  ["canal", "visitas", "whatsapp"],
);

tabla(
  "Desde qué sección le dan clic a WhatsApp",
  consulta(`
    SELECT COALESCE(origen, '—') AS seccion, COUNT(*) AS clics FROM eventos
    WHERE creado >= ${desde} AND evento = 'whatsapp_click' GROUP BY seccion ORDER BY clics DESC`),
  ["seccion", "clics"],
);

tabla(
  "Qué recomienda el diagnóstico",
  consulta(`
    SELECT json_extract(detalle, '$.recomendacion') AS recomendacion, COUNT(*) AS veces FROM eventos
    WHERE creado >= ${desde} AND evento = 'diagnostico_completo' GROUP BY recomendacion ORDER BY veces DESC`),
  ["recomendacion", "veces"],
);

tabla(
  "Dispositivo (visitas)",
  consulta(`
    SELECT dispositivo, COUNT(DISTINCT sesion) AS visitas FROM eventos
    WHERE creado >= ${desde} GROUP BY dispositivo ORDER BY visitas DESC`),
  ["dispositivo", "visitas"],
);

tabla(
  "País (visitas)",
  consulta(`
    SELECT COALESCE(pais, '—') AS pais, COUNT(DISTINCT sesion) AS visitas FROM eventos
    WHERE creado >= ${desde} GROUP BY pais ORDER BY visitas DESC LIMIT 8`),
  ["pais", "visitas"],
);

tabla(
  "Visitas por día",
  consulta(`
    SELECT substr(creado, 1, 10) AS dia, COUNT(DISTINCT sesion) AS visitas,
           SUM(evento = 'whatsapp_click') AS whatsapp
    FROM eventos WHERE creado >= ${desde} GROUP BY dia ORDER BY dia`),
  ["dia", "visitas", "whatsapp"],
);
