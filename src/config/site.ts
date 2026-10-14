export const site = {
  name: "Eric González",
  handle: "@ericgonzalez.ia",
  domain: "ericgonzalezf.com",
  url: "https://www.ericgonzalezf.com/", // URL canónica (el dominio sin www redirige aquí)
  title: "Eric González | IA aplicada sin tecnicismos",
  description:
    "Te enseño a usar inteligencia artificial y la pongo a trabajar en tu negocio, en tu trabajo y en tu vida diaria. IA aplicada sin tecnicismos — nunca es tarde para empezar.",
  tagline: "IA aplicada sin tecnicismos.",
  subtagline: "Nunca es tarde. IA para todos — caminemos juntos.",
  trayectoria: "25 años emprendiendo · IA después de los 40",
  email: "contacto@ericgonzalezf.com",
  whatsapp: "525610738845",
  marcaUrl: "https://marca.ericgonzalezf.com/", // app de marca personal (ver MARCA_GRATIS_EN_APP)
  social: {
    instagram: "https://www.instagram.com/ericgonzalez.ia",
    threads: "https://www.threads.net/@ericgonzalez.ia",
    tiktok: "https://www.tiktok.com/@ericgonzalez.ia",
    youtube: "https://www.youtube.com/@EricGonzalezIA",
  },
};

// URL de la app de marca personal. Mientras no tenga versión gratuita, los botones "gratis"
// de la sección Marca abren WhatsApp. Cuando la app esté lista, cambia esto a `true` y
// vuelven a abrir la app (site.marcaUrl) con sus textos originales.
export const MARCA_GRATIS_EN_APP = false;

// Precio de la "Estrategia completa": se edita solo aquí.
export const PRECIO_ESTRATEGIA = "$497 MXN";

export const nav = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Marca personal", href: "#marca" },
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Cómo trabajo", href: "#proceso" },
];

export const stripServices = [
  "WhatsApp con IA",
  "Automatización",
  "Diagnóstico de IA",
  "Capacitación",
  "Marca personal",
  "Páginas web",
];
