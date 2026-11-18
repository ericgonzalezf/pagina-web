-- Eventos de medición del sitio (ver src/lib/track.ts y src/app/api/evento/route.ts).
-- Sin cookies ni datos personales: no se guarda IP, navegador completo, nombre ni texto que
-- escriba la persona. "sesion" es un identificador al azar que vive solo mientras la pestaña
-- está abierta (sessionStorage) y sirve para unir los pasos de una misma visita.
CREATE TABLE eventos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  creado TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  evento TEXT NOT NULL,      -- visita, whatsapp_click, diagnostico_inicio, ...
  sesion TEXT,               -- id temporal de la visita
  pagina TEXT,               -- ruta, p. ej. "/" o "/guias/videos-animados"
  origen TEXT,               -- sección de la página donde se hizo clic
  detalle TEXT,              -- JSON corto con datos extra del evento
  referente TEXT,            -- solo el dominio de donde llegó (instagram.com, google.com...)
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  pais TEXT,                 -- código de país de Cloudflare (MX, US...)
  dispositivo TEXT           -- movil, tableta o escritorio
);

CREATE INDEX idx_eventos_creado ON eventos (creado);
CREATE INDEX idx_eventos_evento ON eventos (evento, creado);
CREATE INDEX idx_eventos_sesion ON eventos (sesion);
