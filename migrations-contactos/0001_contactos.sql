-- Contactos que dejan sus datos al terminar el diagnóstico (ver src/app/api/contacto/route.ts).
-- Es la copia de respaldo en Cloudflare: el contacto también se manda a MailerLite (si aceptó
-- recibir correos) y se avisa a Eric por correo. Base separada de la de eventos para que el
-- crecimiento de la medición nunca impida guardar un contacto.
CREATE TABLE contactos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  creado TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  correo TEXT NOT NULL,
  nombre TEXT,
  whatsapp TEXT,
  ruta TEXT,                    -- En mi negocio / En mi trabajo / En mi vida diaria
  respuestas TEXT,              -- JSON con las respuestas del diagnóstico (texto de cada opción)
  recomendacion TEXT,           -- servicio que recomendó el diagnóstico
  horas INTEGER,                -- horas por semana estimadas (si aplica)
  prioridad TEXT,               -- alta / normal
  acepta_correos INTEGER NOT NULL DEFAULT 0,  -- 1 si marcó la casilla de correos de Eric
  sesion TEXT,                  -- une el contacto con sus eventos de medición
  canal TEXT,                   -- de dónde llegó (utm_source o dominio de origen)
  utm_medium TEXT,
  utm_campaign TEXT,
  pais TEXT,
  dispositivo TEXT,
  estado_resultado TEXT,        -- envío del correo con su diagnóstico: enviado / error
  estado_mailerlite TEXT,       -- alta en MailerLite: ok / error / omitido
  estado_aviso TEXT             -- aviso a Eric: enviado / error
);

CREATE INDEX idx_contactos_creado ON contactos (creado);
CREATE INDEX idx_contactos_correo ON contactos (correo);
