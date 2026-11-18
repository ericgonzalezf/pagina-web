# ericgonzalez.ia — Página web personal

Sitio personal de Eric González: IA aplicada sin tecnicismos.

Construido con [Next.js](https://nextjs.org) y Tailwind CSS.

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Editar contenido

El texto del sitio (nombre, tagline, servicios, redes, email) vive en un solo archivo:
[`src/config/site.ts`](src/config/site.ts). Edítalo ahí y los cambios se reflejan en todo el sitio.

## Despliegue

El sitio corre en **Cloudflare Workers** (Worker `ericgonzalezf-web`) con
[vinext](https://github.com/cloudflare/vinext). La configuración está en
[`cloudflare.config.ts`](cloudflare.config.ts) y [`vite.config.ts`](vite.config.ts).

**Publicación automática (Workers Builds, conectado a GitHub):**

- Cada push a `main` compila y publica en producción (`npx cf deploy`).
- Cada push a otra rama crea una vista previa en
  `https://<rama>-ericgonzalezf-web.eric-8a4.workers.dev` sin tocar el sitio real.
  Cloudflare deja el enlace en el pull request de GitHub.
- Flujo recomendado: trabaja en una rama, revisa la vista previa y luego pásala a `main`.
- El estado de cada compilación está en Cloudflare → Workers y Pages → ericgonzalezf-web →
  Implementaciones. Si una compilación falla, el sitio sigue con la versión anterior.

Publicar a mano (solo si hace falta; en PowerShell usa `npx.cmd` en lugar de `npx`):

```bash
npx cf auth login
npx cf deploy
```

Para probar localmente la versión de Cloudflare: `npm run build:vinext` y luego `npm run start:vinext`.
El chat necesita un archivo `.dev.vars` (no se sube a GitHub) con `ANTHROPIC_API_KEY=...`.

- **Secreto en producción:** `ANTHROPIC_API_KEY` se carga en el panel de Cloudflare
  (Worker → Configuración → Variables y secretos). Si falta, el despliegue se detiene.
  Las vistas previas no heredan secretos: ahí el chat muestra que está en configuración.
- **Dominio:** el DNS de `ericgonzalezf.com` está en Cloudflare (el dominio sigue registrado en
  Porkbun). `www` y el dominio sin www están conectados al Worker como dominios propios; una
  regla de Cloudflare ("Redirecciones") manda el dominio sin www a www conservando los parámetros.
- **Correo:** los registros de Google, MailerLite y Resend están en la zona de Cloudflare.
  No los borres al tocar el DNS.
